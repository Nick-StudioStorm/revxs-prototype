"use client";

import Link from "next/link";
import type React from "react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  AlertTriangle,
  Bell,
  BookOpen,
  Bot,
  Building2,
  CalendarClock,
  Check,
  Clock3,
  Database,
  FileText,
  Gauge,
  Inbox,
  LayoutList,
  MailCheck,
  MessageSquareReply,
  Pause,
  Play,
  Radar,
  Send,
  Settings,
  ShieldCheck,
  SkipForward,
  Sparkles,
  Target,
  UserRound,
  Users,
  X
} from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { campaigns, inboundSignals, navItems, opportunities as initialOpportunities, replies, supportingRecords } from "@/lib/mock/data";
import type { Campaign, Opportunity, Section } from "@/lib/types";

type MetricKey = "all" | "needsAction" | "approval" | "followUps" | "replies" | "booked" | "leaks" | "outbound" | "automation";
type Icon = React.ComponentType<{ className?: string }>;

const icons: Record<Section, Icon> = {
  queue: LayoutList,
  inbound: Inbox,
  outbound: Radar,
  opportunities: Target,
  accounts: Building2,
  contacts: Users,
  "revenue-plays": Gauge,
  artefacts: FileText,
  knowledge: BookOpen,
  brand: Sparkles,
  rules: ShieldCheck,
  settings: Settings
};

const labels: Record<Section, string> = {
  queue: "Revenue Queue",
  inbound: "Inbound",
  outbound: "Outbound",
  opportunities: "Opportunities",
  accounts: "Accounts",
  contacts: "Contacts",
  "revenue-plays": "Revenue Plays",
  artefacts: "Artefacts",
  knowledge: "Knowledge",
  brand: "Brand",
  rules: "Rules",
  settings: "Settings"
};

const stageRequirement: Record<Opportunity["stage"], string> = {
  "Draft Ready": "Needs approval",
  Sent: "Waiting on prospect",
  Replied: "Needs response",
  "Call Booked": "Needs preparation",
  "Proposal Sent": "Needs follow-up",
  Nurture: "No immediate action"
};

export default function RevxsApp({ initialSection }: { initialSection: Section }) {
  const [section, setSection] = useState<Section>(initialSection);
  const [items, setItems] = useState<Opportunity[]>(initialOpportunities);
  const [selectedId, setSelectedId] = useState(initialOpportunities[0].id);
  const [tabs, setTabs] = useState<string[]>([initialOpportunities[0].id]);
  const [filter, setFilter] = useState<MetricKey>("needsAction");
  const [editing, setEditing] = useState(false);
  const [guide, setGuide] = useState(0);
  const [status, setStatus] = useState("System synced 3m ago");
  const [campaignState, setCampaignState] = useState<Campaign[]>(campaigns);

  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const metrics = useMemo(() => getMetrics(items), [items]);
  const visible = useMemo(() => filterItems(items, filter), [items, filter]);

  function openOpportunity(id: string) {
    setSelectedId(id);
    setTabs((current) => (current.includes(id) ? current : [...current, id]));
    setSection("queue");
    setEditing(false);
    if (guide === 2) setGuide(3);
  }

  function patchSelected(update: Partial<Opportunity>, note: string) {
    setItems((current) => current.map((item) => (item.id === selected.id ? { ...item, ...update } : item)));
    setStatus(note);
  }

  return (
    <main className="flex min-h-screen bg-ink text-slate-100">
      <Sidebar active={section} onNavigate={setSection} />
      <section className="flex min-w-0 flex-1 flex-col">
        <SystemBar
          metrics={metrics}
          active={filter}
          status={status}
          highlighted={guide === 0}
          onSelect={(key) => {
            setFilter(key);
            setSection("queue");
            if (guide === 0) setGuide(1);
          }}
        />
        {section === "queue" ? (
          <div className="relative flex min-h-0 flex-1 flex-col">
            {guide < 3 && <Guide step={guide} onNext={() => setGuide((step) => Math.min(step + 1, 3))} onSkip={() => setGuide(3)} />}
            <TabStrip tabs={tabs} selected={selected} items={items} onSelect={setSelectedId} onClose={(id) => setTabs((current) => current.filter((tab) => tab !== id).length ? current.filter((tab) => tab !== id) : [selected.id])} />
            <PanelGroup direction="horizontal" className="min-h-0 flex-1">
              <Panel defaultSize={40} minSize={30}>
                <QueuePanel items={visible} selected={selected} filter={filter} highlighted={guide === 2} onOpen={openOpportunity} />
              </Panel>
              <PanelResizeHandle className="w-1 bg-line transition hover:bg-emerald-400" />
              <Panel minSize={42}>
                <Workspace
                  opportunity={selected}
                  editing={editing}
                  onEdit={() => setEditing(true)}
                  onCancelEdit={() => setEditing(false)}
                  onDraft={(field, value) => patchSelected({ [field]: value } as Partial<Opportunity>, "Draft edited locally")}
                  onApprove={() => patchSelected({ stage: "Sent", status: "Waiting on prospect", waitingOn: "Prospect", leak: false, lastTouched: "Just now" }, "Approved and marked sent")}
                  onSchedule={() => patchSelected({ status: "Scheduled", nextFollowUp: "Tomorrow 09:30" }, "Follow-up scheduled")}
                  onBooked={() => patchSelected({ stage: "Call Booked", status: "Needs preparation", waitingOn: "You" }, "Meeting marked booked")}
                  onSkip={() => patchSelected({ status: "Skipped", leak: false, priority: "Low" }, "Opportunity skipped")}
                />
              </Panel>
            </PanelGroup>
          </div>
        ) : section === "inbound" ? (
          <InboundView onOpen={openOpportunity} />
        ) : section === "outbound" ? (
          <OutboundView campaigns={campaignState} setCampaigns={setCampaignState} onOpen={openOpportunity} onStatus={setStatus} />
        ) : (
          <SupportingView section={section} />
        )}
      </section>
    </main>
  );
}

function Sidebar({ active, onNavigate }: { active: Section; onNavigate: (section: Section) => void }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-line bg-[#080c12] lg:block">
      <div className="border-b border-line px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-emerald-400/30 bg-emerald-400/10"><Bot className="h-5 w-5 text-emerald-300" /></div>
          <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">RevXS</p><p className="text-xs text-slate-500">Revenue Execution</p></div>
        </div>
      </div>
      <nav className="space-y-1 p-3">
        {navItems.map((item) => {
          const IconComponent = icons[item.section];
          return (
            <Link key={item.section} href={item.section === "queue" ? "/" : `/${item.section}`} onClick={() => onNavigate(item.section)} className={clsx("flex h-10 items-center gap-3 rounded-md px-3 text-sm text-slate-400 transition hover:bg-panelSoft hover:text-slate-100", active === item.section && "bg-panelSoft text-emerald-200 shadow-glow")}>
              <IconComponent className="h-4 w-4" />{item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function SystemBar({ metrics, active, status, highlighted, onSelect }: { metrics: Record<MetricKey, number | string>; active: MetricKey; status: string; highlighted: boolean; onSelect: (key: MetricKey) => void }) {
  const barItems: { key: MetricKey; label: string; icon: Icon }[] = [
    { key: "all", label: "Total Opportunities", icon: Database },
    { key: "needsAction", label: "Needs Action", icon: Bell },
    { key: "approval", label: "Waiting Approval", icon: Check },
    { key: "followUps", label: "Follow-ups Due", icon: CalendarClock },
    { key: "replies", label: "Replies Waiting", icon: MessageSquareReply },
    { key: "booked", label: "Booked Meetings", icon: MailCheck },
    { key: "leaks", label: "Revenue Leaks", icon: AlertTriangle },
    { key: "outbound", label: "Outbound Active", icon: Send },
    { key: "automation", label: "Automation Status", icon: Bot }
  ];

  return (
    <header className={clsx("border-b border-line bg-[#070b11] px-4 py-3", highlighted && "ring-2 ring-emerald-300/70")}>
      <div className="mb-3 flex items-center justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.16em] text-slate-500">Signal {"->"} Action System</p><h1 className="text-lg font-semibold">Revenue System Bar</h1></div><div className="flex items-center gap-2 text-xs text-slate-400"><span className="h-2 w-2 rounded-full bg-emerald-300" />{status}</div></div>
      <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-9">
        {barItems.map((item) => {
          const IconComponent = item.icon;
          return <button key={item.key} type="button" title={`Filter queue by ${item.label}`} onClick={() => onSelect(item.key)} className={clsx("min-h-20 rounded-md border border-line bg-panel px-3 py-2 text-left transition hover:border-emerald-300/50 hover:bg-panelSoft", active === item.key && "border-emerald-300/60 bg-emerald-400/10")}><div className="flex items-center justify-between gap-2"><IconComponent className="h-4 w-4 text-emerald-300" /><span className="text-lg font-semibold">{metrics[item.key]}</span></div><p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">{item.label}</p></button>;
        })}
      </div>
    </header>
  );
}

function TabStrip({ tabs, selected, items, onSelect, onClose }: { tabs: string[]; selected: Opportunity; items: Opportunity[]; onSelect: (id: string) => void; onClose: (id: string) => void }) {
  return <div className="flex h-12 shrink-0 items-center gap-2 overflow-x-auto border-b border-line bg-[#080c12] px-3">{tabs.map((id) => { const item = items.find((opportunity) => opportunity.id === id) ?? selected; return <button key={id} type="button" onClick={() => onSelect(id)} className={clsx("flex h-8 items-center gap-2 rounded-md border border-line px-3 text-xs text-slate-400", selected.id === id && "border-emerald-300/50 bg-panelSoft text-slate-100")}><span className="max-w-44 truncate">{item.company}</span><X className="h-3.5 w-3.5" onClick={(event) => { event.stopPropagation(); onClose(id); }} /></button>; })}</div>;
}

function QueuePanel({ items, selected, filter, highlighted, onOpen }: { items: Opportunity[]; selected: Opportunity; filter: MetricKey; highlighted: boolean; onOpen: (id: string) => void }) {
  const groups = ["Needs Action Now", "Waiting on You", "Waiting on Prospect", "Inbound", "Outbound", "Reply Queue", "Follow-ups Due", "Revenue Leaks", "Recently Sent"];
  return <div className="flex h-full flex-col overflow-hidden border-r border-line"><div className={clsx("border-b border-line p-4", highlighted && "ring-2 ring-emerald-300/70")}><h2 className="text-base font-semibold">Revenue Queue</h2><p className="text-xs text-slate-500">{filterLabel(filter)} / {items.length} visible</p></div><div className="min-h-0 flex-1 overflow-y-auto p-3">{groups.map((group) => { const grouped = items.filter((item) => item.section === group || (group === "Revenue Leaks" && item.leak)); if (!grouped.length) return null; return <section key={group} className="mb-4"><div className="mb-2 flex items-center justify-between"><h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{group}</h3><span className="text-xs text-slate-600">{grouped.length}</span></div><div className="space-y-2">{grouped.map((item) => <OpportunityCard key={`${group}-${item.id}`} opportunity={item} active={selected.id === item.id} onOpen={onOpen} />)}</div></section>; })}</div></div>;
}

function OpportunityCard({ opportunity, active, onOpen }: { opportunity: Opportunity; active: boolean; onOpen: (id: string) => void }) {
  return <button type="button" onClick={() => onOpen(opportunity.id)} className={clsx("w-full rounded-md border border-line bg-panel p-3 text-left transition hover:border-emerald-300/50 hover:bg-panelSoft", active && "border-emerald-300/60 bg-panelSoft")}><div className="mb-2 flex items-start justify-between gap-3"><div className="min-w-0"><h4 className="truncate text-sm font-semibold">{opportunity.name}</h4><p className="text-xs text-slate-500">{opportunity.contact} / {opportunity.company}</p></div><Pill label={opportunity.priority} tone={opportunity.priority === "Low" ? "Low" : "High"} /></div><p className="line-clamp-2 text-xs leading-5 text-slate-400">{opportunity.reason}</p><div className="mt-3 grid grid-cols-3 gap-2"><Pill label={opportunity.signalType} tone={opportunity.signalStrength} /><Pill label={opportunity.owner} tone="Medium" /><Pill label={opportunity.waitingOn} tone={opportunity.waitingOn === "You" ? "High" : "Low"} /></div><div className="mt-3 flex items-center justify-between text-xs text-slate-500"><span>{opportunity.stage} / {opportunity.status}</span><span>{opportunity.valueEstimate}</span></div></button>;
}

function Workspace({ opportunity, editing, onEdit, onCancelEdit, onDraft, onApprove, onSchedule, onBooked, onSkip }: { opportunity: Opportunity; editing: boolean; onEdit: () => void; onCancelEdit: () => void; onDraft: (field: "draftSubject" | "draftMessage", value: string) => void; onApprove: () => void; onSchedule: () => void; onBooked: () => void; onSkip: () => void }) {
  return <div className="h-full overflow-y-auto bg-[#070b11]"><div className="border-b border-line p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.16em] text-emerald-300">{opportunity.motion} / {opportunity.type}</p><h2 className="mt-1 text-2xl font-semibold">{opportunity.company}</h2><p className="mt-1 text-sm text-slate-400">{opportunity.contact}, {opportunity.role}</p></div><div className="grid grid-cols-3 gap-2"><Score label="Fit" value={opportunity.fitScore} /><Score label="Urgency" value={opportunity.urgencyScore} /><Score label="Confidence" value={opportunity.confidence} /></div></div><div className="mt-4 rounded-md border border-emerald-300/30 bg-emerald-400/10 p-3"><p className="text-sm font-semibold text-emerald-100">Signal: {opportunity.signalType} {"->"} Action: {opportunity.suggestedAction}</p><div className="mt-2 grid gap-2 text-xs text-slate-300 md:grid-cols-4"><span>Source: {opportunity.signalSource}</span><span>Owner: {opportunity.owner}</span><span>Waiting on: {opportunity.waitingOn}</span><span>Stage: {stageRequirement[opportunity.stage]}</span></div></div></div><div className="grid gap-4 p-5 xl:grid-cols-[1fr_0.95fr]"><div className="space-y-4"><Block title="CRM Memory" icon={Database}><p className="text-sm leading-6 text-slate-300">{opportunity.reason}</p><p className="mt-2 text-xs text-slate-500">Play: {opportunity.playSource} / {opportunity.playOutcome}</p></Block><Block title="Lead Intel" icon={UserRound}><Bullets items={opportunity.leadIntel} /></Block><Block title="Pitch Intel" icon={Target}><Bullets items={opportunity.pitchIntel} /><div className="mt-3 rounded-md border border-line bg-[#080c12] p-3"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Likely objections</p><Bullets items={opportunity.objections} compact /></div></Block><Block title="Thread" icon={MessageSquareReply}>{opportunity.thread.map((message) => <div key={`${message.from}-${message.at}`} className="mb-3 rounded-md border border-line bg-panel p-3"><div className="mb-1 flex justify-between text-xs text-slate-500"><span>{message.from}</span><span>{message.at}</span></div><p className="text-sm leading-6 text-slate-300">{message.body}</p></div>)}</Block></div><div className="space-y-4"><Draft opportunity={opportunity} editing={editing} onEdit={onEdit} onCancelEdit={onCancelEdit} onDraft={onDraft} onApprove={onApprove} onSchedule={onSchedule} /><Block title="Artefacts" icon={FileText}>{opportunity.artefacts.map((item) => <div key={item} className="mb-2 rounded-md border border-line bg-panel px-3 py-2 text-sm">{item}</div>)}</Block><Block title="Timeline" icon={Clock3}>{opportunity.timeline.map((item) => <div key={`${item.at}-${item.label}`} className="mb-3 border-l border-emerald-300/30 pl-3"><p className="text-xs text-slate-500">{item.at}</p><p className="text-sm font-medium">{item.label}</p><p className="text-sm text-slate-400">{item.detail}</p></div>)}</Block><Block title="Next Action" icon={Target}><p className="text-sm leading-6 text-slate-300">{opportunity.suggestedAction}</p><div className="mt-3 flex flex-wrap gap-2"><Action icon={Send} label="Approve & Send" onClick={onApprove} /><Action icon={CalendarClock} label="Schedule" onClick={onSchedule} muted /><Action icon={MailCheck} label="Mark Booked" onClick={onBooked} muted /><Action icon={SkipForward} label="Skip" onClick={onSkip} muted /></div></Block></div></div></div>;
}

function Draft({ opportunity, editing, onEdit, onCancelEdit, onDraft, onApprove, onSchedule }: { opportunity: Opportunity; editing: boolean; onEdit: () => void; onCancelEdit: () => void; onDraft: (field: "draftSubject" | "draftMessage", value: string) => void; onApprove: () => void; onSchedule: () => void }) {
  return <Block title="Draft Panel" icon={MailCheck}><div className="mb-3 grid grid-cols-3 gap-2"><Pill label="Specificity: Strong" tone="High" /><Pill label="Brand aligned" tone="Medium" /><Pill label={`${opportunity.confidence}% confidence`} tone="Medium" /></div>{editing ? <div className="space-y-3"><input value={opportunity.draftSubject} onChange={(event) => onDraft("draftSubject", event.target.value)} className="w-full rounded-md border border-line bg-[#080c12] px-3 py-2 text-sm" aria-label="Draft subject" /><textarea value={opportunity.draftMessage} onChange={(event) => onDraft("draftMessage", event.target.value)} className="min-h-56 w-full resize-y rounded-md border border-line bg-[#080c12] px-3 py-2 text-sm leading-6" aria-label="Draft message" /><div className="grid gap-2 md:grid-cols-3"><select className="rounded-md border border-line bg-[#080c12] px-3 py-2 text-xs" aria-label="Tone"><option>Direct</option><option>Warm</option></select><select className="rounded-md border border-line bg-[#080c12] px-3 py-2 text-xs" aria-label="CTA"><option>Fit call</option><option>Send teardown</option></select><select className="rounded-md border border-line bg-[#080c12] px-3 py-2 text-xs" aria-label="Schedule"><option>Send now</option><option>Tomorrow morning</option></select></div><div className="flex gap-2"><Action icon={Check} label="Save Draft" onClick={onCancelEdit} /><Action icon={Send} label="Send Now" onClick={onApprove} /></div></div> : <><div className="rounded-md border border-line bg-[#080c12] p-3"><p className="mb-3 text-sm font-semibold">{opportunity.draftSubject}</p><p className="whitespace-pre-line text-sm leading-6 text-slate-300">{opportunity.draftMessage}</p></div><p className="mt-3 text-xs text-slate-500">Rationale: Draft uses the detected signal, business context, and one clear next step.</p><div className="mt-3 flex flex-wrap gap-2"><Action icon={Send} label="Approve & Send" onClick={onApprove} /><Action icon={FileText} label="Edit" onClick={onEdit} muted /><Action icon={CalendarClock} label="Schedule" onClick={onSchedule} muted /></div></>}</Block>;
}

function InboundView({ onOpen }: { onOpen: (id: string) => void }) {
  return <Page title="Inbound" subtitle="Inbox triage, missed replies, pricing requests, referrals, stale conversations, and expansion signals."><div className="grid gap-3 xl:grid-cols-2">{inboundSignals.map((signal, index) => <div key={signal.id} className="rounded-md border border-line bg-panel p-4"><div className="mb-3 flex justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.14em] text-emerald-300">{signal.category} / {signal.source}</p><h3 className="mt-1 text-base font-semibold">{signal.company}</h3><p className="text-sm text-slate-500">{signal.contact} / {signal.age}</p></div><Pill label={signal.fit} tone={signal.fit.includes("High") ? "High" : "Medium"} /></div><p className="text-sm leading-6 text-slate-300">{signal.summary}</p><div className="mt-4 flex flex-wrap gap-2"><Action icon={Target} label={signal.action} onClick={() => onOpen(initialOpportunities[index]?.id ?? initialOpportunities[0].id)} /><Action icon={FileText} label="Draft Reply" muted /><Action icon={X} label="Mark Not Revenue" muted /></div></div>)}</div></Page>;
}

function OutboundView({ campaigns: activeCampaigns, setCampaigns, onOpen, onStatus }: { campaigns: Campaign[]; setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>; onOpen: (id: string) => void; onStatus: (note: string) => void }) {
  function setState(id: string, state: Campaign["state"]) {
    setCampaigns((current) => current.map((campaign) => campaign.id === id ? { ...campaign, state } : campaign));
    onStatus(`Campaign ${state.toLowerCase()}`);
  }

  return <Page title="Outbound" subtitle="Prospect scanner, campaign controls, sequences, contact finder, reply queue, booked meetings, and warnings."><div className="grid gap-4 xl:grid-cols-[1fr_0.85fr]"><div className="space-y-4"><Block title="Prospect Scanner" icon={Radar}><div className="grid gap-3 md:grid-cols-3">{["brand -> CEO / Founder / Head of Marketing", "website -> Head of Growth / CRO Lead", "ads -> Performance Marketing Manager"].map((rule) => <div key={rule} className="rounded-md border border-line bg-[#080c12] p-3 text-sm text-slate-300">{rule}<p className="mt-2 text-xs text-slate-500">Verified by mocked scanner confidence.</p></div>)}</div></Block>{activeCampaigns.map((campaign) => <Block key={campaign.id} title={campaign.name} icon={Bot}><div className="grid gap-3 md:grid-cols-4"><Score label="Replies" value={campaign.replies} /><Score label="Meetings" value={campaign.meetings} /><div className="rounded-md border border-line bg-[#080c12] p-3"><p className="text-xs text-slate-500">Reply rate</p><p className="mt-1 text-lg font-semibold">{campaign.replyRate}</p></div><div className="rounded-md border border-line bg-[#080c12] p-3"><p className="text-xs text-slate-500">State</p><p className="mt-1 text-sm font-semibold text-emerald-200">{campaign.state}</p></div></div><p className="mt-3 text-sm text-slate-400">{campaign.sequenceProgress} / window {campaign.sendingWindow} / {campaign.dailyLimit} daily max</p><div className="mt-3 flex flex-wrap gap-2"><Action icon={Check} label="Approve Campaign" onClick={() => setState(campaign.id, "Campaign Approved")} /><Action icon={Play} label="Resume" onClick={() => setState(campaign.id, "Auto-Sending")} muted /><Action icon={Pause} label="Pause" onClick={() => setState(campaign.id, "Paused on Reply")} muted /><Action icon={X} label="Stop" onClick={() => setState(campaign.id, "Stopped")} muted /></div></Block>)}</div><div className="space-y-4"><Block title="Reply Queue" icon={MessageSquareReply}>{replies.map((reply) => <div key={reply.id} className="mb-3 rounded-md border border-line bg-panel p-3"><div className="mb-2 flex justify-between gap-3"><div><p className="text-sm font-semibold">{reply.from} / {reply.company}</p><p className="text-xs text-slate-500">{reply.campaign} / {reply.received}</p></div><Pill label={reply.category} tone={reply.category === "Negative" ? "Low" : "High"} /></div><p className="text-sm leading-6 text-slate-300">{reply.summary}</p><p className="mt-2 text-xs text-emerald-200">{reply.suggestedAction}</p><div className="mt-3 flex gap-2"><Action icon={FileText} label="Review" onClick={() => onOpen("opp-brightforge-outbound")} /><Action icon={Send} label="Send" muted /><Action icon={X} label="Do Not Contact" muted /></div></div>)}</Block><Block title="Automation Rules" icon={ShieldCheck}><Bullets items={["Manual mode requires approval for every message.", "Campaign mode can auto-send before a reply.", "Stop on reply and booked meeting is enabled.", "Human replies enter review queue. No auto-replies are sent."]} /></Block></div></div></Page>;
}

function SupportingView({ section }: { section: Exclude<Section, "queue" | "inbound" | "outbound"> }) {
  return <Page title={labels[section]} subtitle="Operational memory and controls for the RevXS prototype."><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{supportingRecords[section].map((record) => <div key={`${section}-${record.title}`} className="rounded-md border border-line bg-panel p-4"><p className="text-xs uppercase tracking-[0.14em] text-emerald-300">{record.eyebrow}</p><h3 className="mt-2 text-base font-semibold">{record.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{record.body}</p><p className="mt-4 text-xs text-slate-500">{record.meta}</p></div>)}</div></Page>;
}

function Page({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <div className="min-h-0 flex-1 overflow-y-auto p-5"><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.16em] text-emerald-300">RevXS module</p><h2 className="mt-1 text-2xl font-semibold">{title}</h2><p className="mt-1 max-w-3xl text-sm text-slate-400">{subtitle}</p></div><div className="rounded-md border border-line bg-panel px-3 py-2 text-xs text-slate-400">Mocked data only / local state</div></div>{children}</div>;
}

function Guide({ step, onNext, onSkip }: { step: number; onNext: () => void; onSkip: () => void }) {
  const copy = [["This is your revenue system.", "The system bar shows what needs attention. Click a metric to filter the queue."], ["Signals become actions.", "Every opportunity shows source, strength, owner, blocker, and the next required move."], ["Open the high-priority opportunity.", "Review the signal, edit the draft if needed, then approve or schedule the action."]][step] ?? ["First value reached.", "The workspace now shows why the signal matters and what to do next."];
  return <div className="pointer-events-none absolute right-5 top-5 z-20 w-80 rounded-md border border-emerald-300/50 bg-[#07110f]/95 p-4 shadow-glow"><p className="text-xs uppercase tracking-[0.16em] text-emerald-300">First-run guide</p><h3 className="mt-2 text-base font-semibold">{copy[0]}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{copy[1]}</p><div className="pointer-events-auto mt-4 flex gap-2"><button type="button" onClick={onNext} className="rounded-md bg-emerald-300 px-3 py-2 text-xs font-semibold text-slate-950">{step >= 2 ? "Got it" : "Next"}</button><button type="button" onClick={onSkip} className="rounded-md border border-line px-3 py-2 text-xs text-slate-300">Skip</button></div></div>;
}

function Block({ title, icon: IconComponent, children }: { title: string; icon: Icon; children: React.ReactNode }) {
  return <section className="rounded-md border border-line bg-panelSoft p-4"><div className="mb-3 flex items-center gap-2"><IconComponent className="h-4 w-4 text-emerald-300" /><h3 className="text-sm font-semibold">{title}</h3></div>{children}</section>;
}

function Score({ label, value }: { label: string; value: number }) {
  return <div className="rounded-md border border-line bg-[#080c12] p-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-lg font-semibold">{value}</p></div>;
}

function Pill({ label, tone }: { label: string; tone: "High" | "Medium" | "Low" }) {
  return <span className={clsx("truncate rounded-md border px-2 py-1 text-[11px] font-medium", tone === "High" && "border-emerald-300/40 bg-emerald-400/10 text-emerald-200", tone === "Medium" && "border-sky-300/30 bg-sky-400/10 text-sky-200", tone === "Low" && "border-amber-300/30 bg-amber-400/10 text-amber-200")}>{label}</span>;
}

function Action({ icon: IconComponent, label, onClick, muted }: { icon: Icon; label: string; onClick?: () => void; muted?: boolean }) {
  return <button type="button" onClick={onClick} className={clsx("inline-flex h-9 items-center gap-2 rounded-md border px-3 text-xs font-semibold transition", muted ? "border-line bg-[#080c12] text-slate-300 hover:border-slate-500" : "border-emerald-300/40 bg-emerald-300 text-slate-950 hover:bg-emerald-200")}><IconComponent className="h-4 w-4" />{label}</button>;
}

function Bullets({ items, compact }: { items: string[]; compact?: boolean }) {
  return <ul className={clsx("space-y-2", compact && "mt-2 space-y-1")}>{items.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" /><span>{item}</span></li>)}</ul>;
}

function getMetrics(opportunities: Opportunity[]): Record<MetricKey, number | string> {
  return { all: opportunities.length, needsAction: opportunities.filter((item) => item.waitingOn === "You").length, approval: opportunities.filter((item) => item.stage === "Draft Ready").length, followUps: opportunities.filter((item) => item.section === "Follow-ups Due" || item.status.includes("Follow-up")).length, replies: opportunities.filter((item) => item.stage === "Replied").length, booked: opportunities.filter((item) => item.stage === "Call Booked").length, leaks: opportunities.filter((item) => item.leak).length, outbound: opportunities.filter((item) => item.motion === "Outbound" && item.automationState !== "Stopped").length, automation: "On" };
}

function filterItems(opportunities: Opportunity[], filter: MetricKey) {
  if (filter === "all" || filter === "automation") return opportunities;
  if (filter === "needsAction") return opportunities.filter((item) => item.waitingOn === "You");
  if (filter === "approval") return opportunities.filter((item) => item.stage === "Draft Ready");
  if (filter === "followUps") return opportunities.filter((item) => item.section === "Follow-ups Due" || item.status.includes("Follow-up"));
  if (filter === "replies") return opportunities.filter((item) => item.stage === "Replied");
  if (filter === "booked") return opportunities.filter((item) => item.stage === "Call Booked");
  if (filter === "leaks") return opportunities.filter((item) => item.leak);
  return opportunities.filter((item) => item.motion === "Outbound");
}

function filterLabel(filter: MetricKey) {
  return { all: "All opportunities", needsAction: "Needs action", approval: "Waiting approval", followUps: "Follow-ups due", replies: "Replies waiting", booked: "Booked meetings", leaks: "Revenue leaks", outbound: "Outbound active", automation: "Automation status" }[filter];
}
