export type Section =
  | "queue"
  | "inbound"
  | "outbound"
  | "opportunities"
  | "accounts"
  | "contacts"
  | "revenue-plays"
  | "artefacts"
  | "knowledge"
  | "brand"
  | "rules"
  | "settings";

export type SignalType = "Pricing Request" | "Missed Reply" | "Referral" | "Outbound Trigger" | "Expansion Signal";
export type SignalStrength = "High" | "Medium" | "Low";
export type SignalSource = "Gmail" | "CRM" | "Outbound" | "Manual" | "Campaign";
export type Owner = "You" | "Team" | "Unassigned";
export type WaitingOn = "You" | "Prospect";
export type Stage = "Draft Ready" | "Sent" | "Replied" | "Call Booked" | "Proposal Sent" | "Nurture";
export type AutomationState =
  | "Manual"
  | "Campaign Approved"
  | "Auto-Sending"
  | "Paused on Reply"
  | "Needs Review"
  | "Stopped"
  | "Suppressed";
export type Motion = "Inbound" | "Outbound" | "Expansion" | "Referral" | "Reactivation";
export type Priority = "Critical" | "High" | "Medium" | "Low";
export type ReplyCategory =
  | "Interested"
  | "Question"
  | "Pricing"
  | "Objection"
  | "Not Now"
  | "Referral"
  | "Negative"
  | "Unsubscribe"
  | "Needs Review";

export interface TimelineItem {
  at: string;
  label: string;
  detail: string;
}

export interface ThreadMessage {
  from: string;
  at: string;
  body: string;
}

export interface Opportunity {
  id: string;
  name: string;
  contact: string;
  role: string;
  company: string;
  motion: Motion;
  type: string;
  priority: Priority;
  stage: Stage;
  status: string;
  owner: Owner;
  waitingOn: WaitingOn;
  signalType: SignalType;
  signalStrength: SignalStrength;
  signalSource: SignalSource;
  reason: string;
  suggestedAction: string;
  fitScore: number;
  urgencyScore: number;
  confidence: number;
  valueEstimate: string;
  lastTouched: string;
  nextFollowUp: string;
  playSource: string;
  playOutcome: string;
  automationState: AutomationState;
  warnings: string[];
  section: string;
  leak: boolean;
  leadIntel: string[];
  pitchIntel: string[];
  objections: string[];
  artefacts: string[];
  draftSubject: string;
  draftMessage: string;
  timeline: TimelineItem[];
  thread: ThreadMessage[];
}

export interface InboundSignal {
  id: string;
  category: string;
  source: SignalSource;
  contact: string;
  company: string;
  summary: string;
  age: string;
  action: string;
  fit: string;
}

export interface Campaign {
  id: string;
  name: string;
  state: AutomationState;
  sequenceProgress: string;
  replies: number;
  meetings: number;
  replyRate: string;
  dailyLimit: number;
  weeklyLimit: number;
  sendingWindow: string;
  warnings: string[];
  targets: string[];
}

export interface ReplyItem {
  id: string;
  category: ReplyCategory;
  from: string;
  company: string;
  campaign: string;
  received: string;
  summary: string;
  suggestedAction: string;
}

export interface RecordCard {
  title: string;
  eyebrow: string;
  body: string;
  meta: string;
}
