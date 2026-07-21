# Agent Agenda — Application Documentation

## Table of Contents
1. [Application Overview](#application-overview)
2. [Architecture Overview](#architecture-overview)
3. [Fluent Source Code](#fluent-source-code)
4. [Deployment Instructions](#deployment-instructions)

---

## 1. Application Overview

| Property | Value |
|----------|-------|
| **App Name** | agent agenda |
| **Scope** | global |
| **Scope ID** | f40f0600c3d6c7500deb9e377d013133 |
| **SDK Version** | 4.9.0 |
| **Description** | Add agent agenda — provides HR agents with a personal agenda view of their scheduled appointments |

---

## 2. Architecture Overview

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Agent Agenda Application                   │
│                  (global scope - f40f0600...)                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐     ┌─────────────────────────────┐   │
│  │  Client Script   │     │     Business Rule            │   │
│  │  (cs0)           │     │     (br0 - LogStateChange)   │   │
│  │                  │     │                              │   │
│  │  Type: onLoad    │     │  Trigger: After Update       │   │
│  │  Table: incident │     │  Table: incident             │   │
│  │  Shows info msg  │     │  Logs state transitions      │   │
│  └─────────────────┘     └──────────────┬───────────────┘   │
│                                          │                   │
│                                          ▼                   │
│                           ┌──────────────────────────┐       │
│                           │  Server Script Module     │       │
│                           │  (src/server/script.ts)   │       │
│                           │                           │       │
│                           │  showStateUpdate()        │       │
│                           │  - Reads current state    │       │
│                           │  - Reads previous state   │       │
│                           │  - Displays info message  │       │
│                           └──────────────────────────┘       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Agent Workspace Module (Planned)                     │   │
│  │  Module: My Agenda                                    │   │
│  │  Table: x_snc_hr_mtg_sch_appointment                  │   │
│  │  Filter: Current agent's non-cancelled appointments   │   │
│  │  Sort: By start_time (ascending)                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Component Summary

| Component | Type | Table | Purpose |
|-----------|------|-------|---------|
| `cs0` | Client Script (onLoad) | incident | Displays "Table loaded successfully!!" when a record loads |
| `br0` (LogStateChange) | Business Rule (after update) | incident | Logs state changes with previous/current values |
| `showStateUpdate` | Server Script Module | — | Reusable function that formats state change messages |
| `module_agent_agenda` | App Module (Planned) | x_snc_hr_mtg_sch_appointment | Filtered list showing agent's upcoming appointments |

### Data Flow

```
User opens incident record
        │
        ▼
┌─────────────────────┐
│ Client Script (cs0) │ ──► Displays "Table loaded successfully!!" info message
└─────────────────────┘

User updates incident record
        │
        ▼
┌─────────────────────────┐
│ Business Rule (br0)     │
│ LogStateChange          │
│ (after update)          │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│ showStateUpdate()       │ ──► Displays "state updated from X to Y" info message
│ (server/script.ts)      │
└─────────────────────────┘
```

---

## 3. Fluent Source Code

### Project Structure

```
agent-agenda/
├── now.config.json              # App configuration
├── package.json                 # Dependencies & scripts
└── src/
    ├── fluent/
    │   ├── generated/
    │   │   └── keys.ts          # Auto-generated key registry
    │   ├── example.now.ts       # Client Script & Business Rule definitions
    │   ├── index.now.ts         # Main entry point
    │   ├── tsconfig.client.json
    │   ├── tsconfig.json
    │   └── tsconfig.server.json
    └── server/
        ├── script.ts            # Server-side script module
        └── tsconfig.json
```

### 3.1 `now.config.json`

```json
{
  "scope": "global",
  "scopeId": "f40f0600c3d6c7500deb9e377d013133",
  "name": "agent agenda",
  "tsconfigPath": "./src/server/tsconfig.json"
}
```

### 3.2 `package.json`

```json
{
  "name": "x-1879266-agent-agenda",
  "version": "1.0.0",
  "description": "add agent agenda",
  "license": "UNLICENSED",
  "imports": {
    "#now:*": "./@types/servicenow/fluent/*/index.js"
  },
  "scripts": {
    "build": "now-sdk build",
    "deploy": "now-sdk install",
    "transform": "now-sdk transform",
    "types": "now-sdk dependencies"
  },
  "devDependencies": {
    "@servicenow/sdk": "4.9.0",
    "@servicenow/glide": "27.0.5",
    "typescript": "5.5.4"
  }
}
```

### 3.3 `src/fluent/example.now.ts` — Client Script & Business Rule

```typescript
import { BusinessRule, ClientScript } from '@servicenow/sdk/core'
import { showStateUpdate } from '../server/script'

// Creates a client script that pops up 'Table loaded successfully!!' message
// every time an incident record is loaded
ClientScript({
    $id: Now.ID['cs0'],
    name: 'my_client_script',
    table: 'incident',
    active: true,
    applies_extended: false,
    global: true,
    ui_type: 'all',
    description: 'Custom client script generated by Now SDK',
    messages: '',
    isolate_script: false,
    type: 'onLoad',
    script: script`function onLoad() {
        g_form.addInfoMessage("Table loaded successfully!!")
    }`,
})

// Creates a business rule that logs state change message
// whenever an incident record is updated
BusinessRule({
    $id: Now.ID['br0'],
    action: ['update'],
    table: 'incident',
    script: showStateUpdate,
    name: 'LogStateChange',
    order: 100,
    when: 'after',
    active: true,
})
```

### 3.4 `src/server/script.ts` — Server-Side Script Module

```typescript
import { gs, type GlideRecord } from '@servicenow/glide'

export function showStateUpdate(current: GlideRecord, previous: GlideRecord) {
    const currentState = current.getValue('state')
    const previousState = previous.getValue('state')

    gs.addInfoMessage(`state updated from "${previousState}" to "${currentState}"`)
}
```

### 3.5 `src/fluent/index.now.ts` — Main Entry Point

```typescript
//Add your Fluent APIs here and in other now.ts files under src/fluent
```

### 3.6 `src/fluent/generated/keys.ts` — Auto-Generated Key Registry

```typescript
import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {}
        }
    }
}
```

### 3.7 Agent Workspace Agenda Module (Planned Extension)

The following code defines an Agent Workspace module to give agents a personal agenda view:

```typescript
// src/fluent/lists/agent-agenda.now.ts (PLANNED)
import "@servicenow/sdk/global";
import { Record } from "@servicenow/sdk/core";

// Create a module that shows appointments filtered to the logged-in agent
// This uses the Record API to create a sys_app_module entry
Record({
  $id: Now.ID["module_agent_agenda"],
  table: "sys_app_module",
  data: {
    title: "My Agenda",
    table_name: "x_snc_hr_mtg_sch_appointment",
    filter: "hr_agent=javascript:gs.getUserID()^status!=cancelled^ORDERBYstart_time",
    link_type: "list",
    order: 100,
    active: true
  }
});
```

**Module Filter Logic:**
- `hr_agent=javascript:gs.getUserID()` — Shows only the current agent's appointments
- `status!=cancelled` — Excludes cancelled appointments
- `ORDERBYstart_time` — Sorts chronologically by start time

---

## 4. Deployment Instructions

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | v18+ |
| npm | v9+ |
| ServiceNow SDK | 4.9.0 |
| TypeScript | 5.5.4 |
| ServiceNow Instance | Authenticated via Now CLI |

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Build the Application

This validates all `.now.ts` files and compiles the TypeScript:

```bash
npm run build
```

**Expected output:** No errors. If errors occur, check the fluent file syntax and imports.

### Step 3: Deploy to Instance

```bash
npm run deploy
```

This installs the application metadata (Client Script, Business Rule, Module) onto your connected ServiceNow instance.

### Step 4: Verify Deployment

1. **Client Script Verification:**
   - Navigate to any Incident record
   - On load, you should see the info message: *"Table loaded successfully!!"*

2. **Business Rule Verification:**
   - Open an Incident record
   - Change the State field and save
   - You should see: *"state updated from [old] to [new]"*

3. **Agent Agenda Module Verification (if implemented):**
   - Navigate to the application menu
   - Look for **"My Agenda"** module
   - Confirm the list shows only your appointments, sorted by start time

### Troubleshooting

| Issue | Cause | Resolution |
|-------|-------|------------|
| Build fails: "Cannot find module" | Missing dependencies | Run `npm install` |
| Build fails: "Now.ID not found" | Key not registered | Ensure keys are in `generated/keys.ts` |
| Client Script not firing | Script inactive | Check `active: true` in the definition |
| Business Rule not logging | No state change detected | Ensure the `state` field is being changed |
| Module not visible | Table doesn't exist | Verify `x_snc_hr_mtg_sch_appointment` exists on instance |

### Development Workflow

```
┌──────────┐     ┌──────────┐     ┌───────────┐     ┌──────────┐
│  Edit    │────▶│  Build   │────▶│  Deploy   │────▶│  Verify  │
│ .now.ts  │     │ npm run  │     │ npm run   │     │  on      │
│  files   │     │  build   │     │  deploy   │     │ instance │
└──────────┘     └──────────┘     └───────────┘     └──────────┘
      ▲                                                    │
      │                                                    │
      └────────────────── Fix Issues ◀─────────────────────┘
```

---

## 5. Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Global scope | Application operates across all modules without scope restrictions |
| Separate server script module | Promotes code reuse — `showStateUpdate` can be imported by multiple business rules |
| Dynamic filter with `gs.getUserID()` | Each agent sees only their own appointments without hardcoding |
| After-update timing for BR | Ensures the state has actually changed before logging |
| onLoad client script type | Provides immediate feedback when a form is opened |

---

*Generated for: agent agenda (f40f0600c3d6c7500deb9e377d013133)*
*SDK Version: 4.9.0 | TypeScript: 5.5.4*
