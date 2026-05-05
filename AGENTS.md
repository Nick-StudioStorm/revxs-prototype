# AGENTS.md — RevXS (Revenue Execution System)

## Overview

This repository contains the front-end prototype for **RevXS**, an AI-native Revenue Execution System.

RevXS is a **signal → action system** that detects revenue signals and drives execution through structured workflows.

This is a **clickable MVP prototype**, not a production system.

---

## Primary Goal

Build a high-quality, interactive front-end that demonstrates:

- Signal detection
- Opportunity management
- Execution workflows
- Outbound automation system
- Reply handling
- Revenue system visibility

The product must feel like:

> A system that continuously drives revenue forward

---

## Key Principles

### 1. Action-first, not dashboard-first

- Every screen should answer: “What should I do next?”
- Avoid passive analytics views

### 2. Signal → Action model

- Every opportunity originates from a signal
- Every signal must lead to a suggested action

### 3. System clarity over feature volume

- Prioritize clarity, flow, and usability
- Avoid adding extra features beyond spec

### 4. Simulated reality

- All data must feel real and believable
- Use timestamps, delays, imperfect states
- Avoid placeholder or fake-looking content

### 5. No infrastructure complexity

This is a prototype. Do NOT implement:

- Authentication
- Real APIs
- Email integrations
- CRM integrations
- Backend services

Use mocked data only.

---

## Tech Stack

Use:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn-style components or local equivalents
- lucide-react icons
- react-resizable-panels

If shadcn is unavailable, build equivalent local components.

---

## Project Structure

Expected structure:

```txt
/app
  /(routes)
/components
  /layout
  /revenue
  /inbound
  /outbound
  /intelligence
  /drafting
  /artefacts
  /shared
/lib
  /types.ts
  /mock/
```

---

## Core System Requirements

### Revenue System Bar

- Must be visible globally
- Must show key system metrics
- Must filter the Revenue Queue

### Signal Layer

Every opportunity must include:

- signalType
- signalStrength
- signalSource

These must be visible in UI.

### Ownership Model

Each opportunity must include:

- owner: You / Team / Unassigned
- waitingOn: You / Prospect

### Stage Enforcement

Stages must imply required actions:

- Draft Ready → Needs approval
- Sent → Waiting on prospect
- Replied → Needs response
- Call Booked → Needs preparation
- Proposal Sent → Needs follow-up
- Nurture → No immediate action

### Revenue Queue

This is the primary interface.

Must support:

- filtering
- selecting opportunities
- opening tabs
- showing next actions

### Opportunity Workspace

Must include:

- Signal context
- Suggested action
- Draft message
- Lead intel
- Pitch intel
- Timeline
- Next action

### Outbound System

Must feel like a running system, not static UI.

Include:

- Prospect Scanner
- Campaign state
- Automation modes
- Sequence progress
- Reply Queue

### Reply Queue

Must:

- interrupt outbound sequences
- categorize replies
- require human review

### First-Run Experience

Must:

- guide user in under 60 seconds
- highlight system bar
- highlight opportunity
- drive first click
- show immediate value

Must NOT block usage.

---

## Mock Data Requirements

Mock data must:

- include realistic company names and roles
- include timestamps and delays
- include imperfect scenarios such as missed replies and stale deals
- include varied outcomes: positive, negative, neutral, ambiguous

Avoid generic placeholders like:

- Test Company
- John Doe

---

## Interaction Requirements

Must support:

- opening opportunities as tabs
- switching tabs
- closing tabs
- editing drafts
- approving/sending as state change only
- scheduling actions
- marking booked
- updating timeline
- filtering queue
- campaign state transitions
- reply → queue behavior

Use local React state.

---

## UI / UX Guidelines

Design must feel:

- dark
- minimal
- operational
- dense but readable
- structured
- system-like

Avoid:

- playful SaaS UI
- large marketing cards
- passive dashboards
- clutter
- CRM-first Kanban dominance

---

## What NOT to Build

Do NOT implement:

- dashboards
- forecasting
- attribution
- CRM complexity
- permissions
- real integrations
- backend logic

---

## Build Strategy

Follow this order:

1. Scaffold app
2. Define types
3. Create mock data
4. Build layout + sidebar
5. Build Revenue System Bar
6. Build Revenue Queue
7. Build Opportunity Workspace
8. Implement Signal Layer
9. Implement First-run experience
10. Build Inbound
11. Build Outbound
12. Build supporting pages
13. Add interactions
14. Polish UI

---

## Acceptance Criteria

The build is complete when:

- App runs without errors
- All routes exist
- Revenue System Bar works
- Signal layer is visible
- Ownership is visible
- Revenue Queue is interactive
- Opportunities open in tabs
- Workspace shows draft + intel + next action
- Outbound behaves like a system
- Reply queue functions correctly
- First-run onboarding works
- Mock data feels realistic

---

## Final Instruction

Do not over-engineer.

Do not simplify the system model.

Build a **coherent, believable revenue execution system** using mocked data and clean UI interactions.

Focus on:

- clarity
- flow
- realism
- actionability

This is the priority over everything else.
