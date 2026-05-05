# RevXS — Revenue Execution System

## Codex One-Shot Build Prompt — Signal-Driven System Edition

## Mission

You are a senior full-stack product engineer and UX prototyper.

Build a clickable front-end prototype for **RevXS** in one implementation pass.

RevXS is an AI-native **Revenue Execution System** for agencies.

It acts as a **SIGNAL → ACTION** engine that:

- detects revenue signals
- converts them into structured opportunities
- assigns ownership
- enforces execution stages
- generates next actions
- drafts communication
- tracks outcomes

The product must feel like:

> A system that continuously detects revenue signals and drives them to execution.

---

## Core Product Shift

This is NOT:

> AI drafts emails and outreach

This IS:

> A signal-driven system that turns revenue intent into executed outcomes

Everything must reflect:

- signals
- action
- ownership
- progression
- system flow

---

## Non-Negotiables

- Build a working front-end prototype
- Use mocked data only
- No authentication
- No real backend APIs
- No integrations, only placeholders
- Do not ask questions; make decisions and proceed
- Prioritize interaction quality over completeness

---

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn-style components or local equivalents
- lucide-react
- react-resizable-panels

---

## System Layer

### 1. Revenue System Bar

Persistent top system bar displaying:

- Total Opportunities
- Needs Action
- Waiting Approval
- Follow-ups Due
- Replies Waiting
- Booked Meetings
- Revenue Leaks
- Outbound Active
- Automation Status

Interactions:

- clicking a metric filters the Revenue Queue

---

### 2. Signal Layer

Every opportunity must originate from a signal.

Fields:

- signalType: Pricing Request, Missed Reply, Referral, Outbound Trigger, Expansion Signal
- signalStrength: High, Medium, Low
- signalSource: Gmail, CRM, Outbound, Manual, Campaign

UI must display:

- signal type
- signal strength
- signal source

---

### 3. Ownership Model

Each opportunity includes:

- owner: You, Team, Unassigned
- waitingOn: You, Prospect

UI must clearly show responsibility.

---

### 4. Stage-Driven Execution

Stages enforce action:

- Draft Ready → Needs approval
- Sent → Waiting on prospect
- Replied → Needs response
- Call Booked → Needs preparation
- Proposal Sent → Needs follow-up
- Nurture → No action

---

### 5. Persistent Revenue Leaks

Revenue leaks:

- live in system bar
- appear in queue
- are filterable
- update when resolved

---

### 6. Play → Outcome Loop

Each opportunity shows:

- originating Revenue Play
- mock performance signals

Example:

```txt
Play: Outbound Website Conversion
→ 12 replies
→ 4 meetings
```

---

### 7. Outbound = Engine

Outbound must feel like a running system:

- campaign state
- automation state
- sequence progress
- reply rate, mocked
- meetings booked, mocked

---

## Simulated Reality Layer

The MVP simulates a fully connected system without real integrations.

Data must:

- feel real
- include timestamps
- include delays
- include imperfect states
- include mixed outcomes

Data sources:

- Gmail simulated
- CRM simulated
- Outbound
- Manual

Timeline realism:

- show delays
- show missed follow-ups
- show inactivity gaps

Thread realism:

- messy conversations
- vague requests
- ghosting
- referrals

Reply realism:

- interest
- objections
- confusion
- rejection
- ambiguity

System behavior:

- UI must imply continuous syncing
- UI must imply system activity
- UI must imply automation running

Important:

We are testing:

- trust
- clarity
- usefulness
- workflow adoption

We are NOT testing integrations.

---

## First-Run Experience

The MVP must include lightweight onboarding that guides the user to first value within 60 seconds.

This is not a full onboarding system.

Goal:

Help the user immediately understand:

- what RevXS does
- what they are looking at
- what they should do first
- how value is generated

Entry state:

- On first load, show the Revenue Queue pre-populated with realistic data.
- Do NOT show empty states.

Guided intro:

- Highlight Revenue System Bar:
  - “This is your revenue system — it shows what needs attention.”
- Highlight a high-priority opportunity:
  - “We detected a high-value signal — this needs action.”
- Encourage click:
  - “Open this to see what to do next.”

First value moment:

When user opens an opportunity, they must see:

- signal detected
- why it matters
- suggested action
- ready-to-send draft

Next action prompt:

> Review the draft and approve or edit to take action.

Rules:

- No setup required
- No integrations required
- Must be skippable
- Must not block interaction

Success criteria:

Within 60 seconds, the user understands:

- what a signal is
- what an opportunity is
- what action to take
- how the system helps

---

## Routes

Create these routes:

```txt
/
 /inbound
 /outbound
 /opportunities
 /accounts
 /contacts
 /revenue-plays
 /artefacts
 /knowledge
 /brand
 /rules
 /settings
```

---

## Sidebar

Persistent sidebar:

1. Revenue Queue
2. Inbound
3. Outbound
4. Opportunities
5. Accounts
6. Contacts
7. Revenue Plays
8. Artefacts
9. Knowledge
10. Brand
11. Rules
12. Settings

---

## Primary Screen — Revenue Queue

Layout:

- Sidebar
- System Bar
- Tabs
- Resizable panels

Queue sections:

- Needs Action Now
- Waiting on You
- Waiting on Prospect
- Inbound
- Outbound
- Reply Queue
- Follow-ups Due
- Revenue Leaks
- Recently Sent

Queue card fields:

- opportunity name
- contact
- company
- motion
- type
- priority
- stage
- status
- owner
- waitingOn
- signalType
- signalStrength
- signalSource
- reason surfaced
- suggested next action
- fit score
- urgency score
- confidence
- value estimate
- last touched
- next follow-up
- play source
- automation state
- warnings

Interactions:

- click card to select opportunity
- open opportunity as tab
- switch tabs
- close tabs
- quick action preview
- enrich
- skip
- send updates state
- metric filters update queue

---

## Revenue Leak Report

Headline:

> We found X revenue leaks in the last 90 days

Examples:

- Pricing request — no reply for 6 days
- Referral intro — never responded
- Proposal sent — no follow-up after 8 days
- Past client mentioned new project — no action taken
- Outbound reply — not followed up

Actions:

- Review Queue
- Create Follow-ups
- Ignore Low-Fit
- Adjust Rules

---

## Opportunity Workspace

Sections:

- Header
- CRM Memory
- System Context Strip
- Lead Intel
- Pitch Intel
- Thread
- Draft Panel
- Artefacts
- Timeline
- Next Action

### System Context Strip

Shows:

- Signal detected
- Suggested action
- Play source
- Owner
- Waiting on
- Stage requirement
- Automation mode

Example:

```txt
Signal: Pricing Request
→ Action: Send proposal follow-up
```

---

### Lead Intel

Includes:

- contact summary
- company summary
- role
- industry
- fit
- urgency
- pain points
- discovery questions
- verification labels

---

### Pitch Intel

Includes:

- likely goals
- likely problems
- positioning gaps
- suggested pitch angle
- likely objections
- suggested responses
- talking points
- recommended artefacts
- confidence level

---

### Draft Panel

Includes:

- subject
- message
- artefacts
- rationale
- brand alignment
- specificity score
- confidence
- warnings

Actions:

- Approve & Send
- Edit
- Schedule
- Save Draft

---

## Compose Mode

Editable:

- subject
- message
- artefacts

Controls:

- tone
- CTA
- schedule
- send now

Specificity score:

- Generic
- Acceptable
- Specific
- Strong

---

## Inbound

Sections:

- Inbox Triage
- Missed Replies
- Pricing Requests
- Referrals
- Stale Conversations
- Past Clients
- Follow-ups
- Expansion Signals
- Low Fit
- Needs Review

Actions:

- Create Opportunity
- Draft Reply
- Ignore
- Mark Not Revenue
- Link Contact

---

## Outbound

Sections:

- Prospect Scanner
- Targets
- Builder
- Contact Finder
- Draft Ready
- Campaign Controls
- Sequences
- Reply Queue
- Booked Meetings
- Warnings

### Contact Finder

Match role to service:

- brand → CEO / Founder / Head of Marketing / Brand Director
- website → Head of Growth / Marketing Director / CRO Lead
- ads → Performance Marketing Manager / Head of Growth
- content → Head of Content / Head of Marketing
- design → Creative Director / Brand Manager / Founder

Include:

- role
- relevance
- rationale
- confidence
- verification status
- alternative contacts

---

## Automation Modes

### Manual

- all messages require approval

### Campaign

- auto-send before reply
- stop on reply
- reply enters queue
- no auto-reply to humans

States:

- Manual
- Campaign Approved
- Auto-Sending
- Paused on Reply
- Needs Review
- Stopped
- Suppressed

Campaign controls:

- approve campaign
- pause campaign
- resume campaign
- stop campaign
- max sends per day
- max sends per week
- sending window
- sequence length
- stop on reply
- stop on booked meeting
- suppress negative replies
- require review for replies

---

## Reply Queue

Categories:

- Interested
- Question
- Pricing
- Objection
- Not Now
- Referral
- Negative
- Unsubscribe
- Needs Review

Actions:

- Review
- Edit
- Send
- Schedule
- Mark Not Interested
- Add to Do Not Contact

---

## Other Pages

### Opportunities

Searchable operational record.

Views:

- List
- Compact Pipeline
- By Motion
- By Stage
- By Owner
- By Next Action

### Accounts

Company memory:

- company name
- website
- industry
- size
- location
- relationship type
- account fit
- expansion potential
- linked contacts
- linked opportunities
- notes
- last interaction
- next action
- activity timeline

### Contacts

Person memory:

- name
- company
- role
- email
- source
- relationship type
- status
- enrichment status
- last interaction
- next action
- linked account
- linked opportunities
- timeline

### Revenue Plays

Include:

1. Inbound Pricing Request
2. Missed Referral Follow-up
3. Stale Proposal Chase
4. Past Client Reactivation
5. Cold Target Account
6. Warm Intro Follow-up
7. Post-Discovery Follow-up
8. Proposal Sent Follow-up
9. Client Expansion Signal
10. Low-Fit Lead Polite Decline
11. Outbound Website Conversion Pitch
12. Outbound Paid Acquisition Pitch
13. Outbound Brand Repositioning Pitch

Each play shows:

- motion
- trigger
- qualification logic
- suggested strategy
- message style
- artefact rules
- approval requirements
- follow-up timing
- stop conditions
- performance signal

### Artefacts

Library:

- PDF
- Deck
- Case Study
- Proposal
- Link
- One-pager
- Testimonial
- Service Overview
- Audit Template
- Pricing Guide
- Landing Page Teardown
- Before/After Example

### Knowledge

Structured inputs:

- ICPs
- Services
- Packages
- Pricing notes
- Proof points
- FAQs
- Objections
- Value propositions
- Case studies
- Qualification criteria
- Disqualification criteria
- Target segments
- Competitor notes
- Common pain points
- Offers
- Past wins

### Brand

BrandOS Lite:

- audience
- positioning
- offers
- differentiators
- tone
- messaging principles
- banned phrases
- proof points
- default CTA style
- preferred words
- avoided words
- formatting preferences
- follow-up style

### Rules

Controls:

- follow-up timing
- re-engagement window
- approval requirements
- auto-send toggle
- max follow-ups
- outbound daily limits
- outbound weekly limits
- quiet hours
- escalation rules
- confidence thresholds
- duplicate detection
- do-not-contact rules
- sensitive-thread handling
- excluded domains
- excluded contacts
- reply pause rules
- meeting booked stop rules

Defaults:

- auto-send disabled globally
- campaign approval available per campaign
- approval required for all outbound unless campaign approved
- max follow-ups: 3
- re-engagement window: 60 days
- follow-up after no response: 3 business days
- outbound daily limit: 20
- outbound weekly limit: 80
- quiet hours on
- duplicate detection on
- stop sequence on reply
- stop sequence on booked meeting
- do-not-contact enforced

### Settings

Sections:

- Workspace
- Team
- Integrations Placeholder
- Trust Controls
- Data Controls
- Notifications

Integration placeholders:

- Gmail / Outlook
- Calendar
- CRM
- Claude Managed Agents
- MCP connectors
- enrichment APIs
- website scraper
- outbound data provider
- artefact storage
- send workflow
- scheduling workflow
- reply detection
- meeting booking

---

## Do Not Add

- dashboards
- forecasting
- attribution
- CRM complexity
- permissions
- real integrations
- backend infrastructure

---

## Acceptance Criteria

The prototype is complete when:

- System bar works
- Signal layer is visible
- Ownership is visible
- Stages enforce actions
- Revenue leaks persist
- Plays show outcomes
- Outbound feels like an engine
- Reply queue works
- Next action is always clear
- First-run experience works
- Mock data feels realistic
- All routes exist
- App runs without errors

---

## Build Order

1. Scaffold
2. Types and mock data
3. Layout
4. System bar
5. Signal layer
6. Queue
7. Workspace
8. Onboarding
9. Inbound
10. Outbound
11. Pages
12. Interactions
13. Polish

---

## Future Integration Placeholders

Add comments where these would connect later:

- Claude Managed Agents
- MCP inbox connector
- MCP calendar connector
- MCP CRM connector
- Gmail/Outlook connector
- enrichment APIs
- website scraper
- outbound data provider
- artefact storage
- approval/send workflow
- scheduling workflow
- reply detection
- meeting booking
- activity sync

Do not implement real integrations.

---

## Final Principle

Every screen must answer:

- What signal was detected?
- What action is required?
- Who is responsible?
- What is blocked?

If that is clear, the system works.
