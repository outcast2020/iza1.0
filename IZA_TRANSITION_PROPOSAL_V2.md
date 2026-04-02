# IZA Transition Proposal v2

## Executive Summary

IZA should evolve in three directions at the same time:

1. become a trustworthy pedagogical registry
2. give teachers immediate visibility
3. modernize the teenage-facing experience without changing IZA's non-generative core

This is not a proposal to "add AI".

It is a proposal to convert a strong research prototype into a sustainable pedagogical instrument while preserving what makes IZA rare:

- it does not write for the learner
- it asks, validates, and accompanies
- it can already produce meaningful writing indicators from the learner's own process

## Non-Negotiables

1. The learner experience remains in Brazilian Portuguese.
2. Internal architecture, schema, and development notes can be written in English.
3. IZA must not generate text for the learner in this phase.
4. Objective indicators must remain pedagogical signals, not grades.
5. Teacher visibility must arrive early, not after a full refactor.
6. No native mobile rewrite for now.
7. No backend migration beyond Google Apps Script for now.

## Strategic Decisions

### Decision 1: Keep the pedagogical engine, not just the UI

The current code already contains the pedagogical core:

- step validation
- scene detection
- final-line strength
- journey rubric
- completion checklist

These should be preserved and externalized into a clearer architecture.

### Decision 2: Move from session logging to learner history

The current sheet design is session-centered. The next version must become participant-centered.

### Decision 3: Build teacher visibility in parallel with data restructuring

Phase 1 and Phase 2 should overlap.

Teachers need a usable readout as soon as the new data starts being captured.

### Decision 4: Modernize the frontend as a web app, not a native app

The correct medium for your context is still web technology:

- browser-first distribution
- easy workshop sharing by URL
- low-end device compatibility
- continuity with Apps Script and existing JavaScript logic

The upgrade path is:

- move rendering to a modern framework
- ship as a high-quality PWA
- consider Capacitor later only if app-store distribution becomes necessary

## Current State Diagnosis

### What is already strong

- IZA's writing flow is pedagogically differentiated
- session data is already rich
- the frontend already computes useful indicators
- local persistence already exists
- Google Sheets integration already fits the lab workflow

### What is blocking scale

- flat registry
- unreliable write confirmation because of `no-cors`
- no participant identity model
- no consent audit trail
- no teacher interface
- monolithic frontend
- plain DOM rendering that will feel dated on mobile for teenagers

## Revised Target Architecture

## Data Layer

Keep the current check-in Google Sheet as an operational source. Redesign the IZA registry as a separate pedagogical source.

### Sheet A: Check-in Source

Purpose:

- workshop attendance
- cohort identification
- participant verification

### Sheet B: IZA Registry

Recommended tabs:

1. `participants`
2. `sessions`
3. `session_indicators`
4. `repair_events`
5. `teacher_notes`
6. `consent_events`

### Why `repair_events` instead of full `validation_events`

This is the main architectural adjustment from v1.

Instead of logging every validation decision, log only pedagogically meaningful exceptions:

- repair needed
- manual override
- flagged session anomaly

Accepted validations should be summarized at the session level in `session_indicators`.

This reduces row growth while preserving the teacher and research value.

### Scaling rule for `repair_events`

- keep `repair_events` in Google Sheets during the first year
- create one archive tab or export per month if volume grows quickly
- define a migration trigger at `50,000` rows

When that threshold is crossed:

- move archived events to BigQuery, SQLite, or another analysis store
- keep only recent operational rows in Sheets

## Proposed Registry Schema

### `participants`

One row per learner.

Fields:

- `participant_id`
- `checkin_user_id`
- `match_status`
- `match_method`
- `full_name`
- `email`
- `municipio`
- `estado`
- `origem`
- `teacher_group`
- `first_session_at`
- `last_session_at`
- `sessions_count`
- `consent_current_status`
- `consent_current_version`

### `sessions`

One row per IZA journey.

Fields:

- `session_id`
- `participant_id`
- `started_at`
- `ended_at`
- `track_key`
- `presence_key`
- `presence_mix_json`
- `journey_summary`
- `keywords_csv`
- `final_line`
- `literary_gift_title`
- `literary_gift_author`
- `literary_gift_source`
- `register_status`
- `transcript_txt`

### `session_indicators`

One row per session with structured metrics.

Fields:

- `session_id`
- `participant_id`
- `repair_count`
- `best_scene_score`
- `semantic_overlap`
- `socratic_count`
- `mirror_count`
- `closing_words`
- `closing_lines`
- `rubric_total`
- `rubric_fidelidade_ao_passo`
- `rubric_concretude`
- `rubric_retencao_semantica`
- `rubric_qualidade_da_pergunta`
- `rubric_qualidade_do_fechamento`
- `rubric_qualidade_da_sintese_final`
- `check_final_line_strong`
- `check_step_fidelity`
- `check_theme_reflection`
- `completed_session`
- `returned_user`

### `repair_events`

One row per meaningful repair or intervention signal.

Fields:

- `repair_event_id`
- `session_id`
- `participant_id`
- `step_key`
- `event_type`
- `reason`
- `user_text_excerpt`
- `created_at`

### `teacher_notes`

One row per teacher annotation.

Fields:

- `teacher_note_id`
- `participant_id`
- `session_id`
- `teacher_name`
- `note_type`
- `note_text`
- `created_at`

### `consent_events`

This is a new required table.

Purpose:

- create an audit trail for LGPD and future research governance

Fields:

- `consent_event_id`
- `participant_id`
- `session_id`
- `timestamp`
- `consent_version`
- `action`
- `source`

Allowed actions:

- `granted`
- `updated`
- `withdrawn`

## Check-in Linking Strategy

The linkage must remain non-destructive and explicit.

### Matching order

1. exact normalized email
2. normalized full name + workshop/cohort
3. normalized full name + municipality
4. manual reconciliation if ambiguous

### Matching fields

- `match_status`: `matched | ambiguous | unmatched`
- `match_method`: `email | name_cohort | name_city | manual`
- `matched_at`

### Principle

If matching fails, IZA still writes to its own registry.

The pedagogical system must not depend on the check-in sheet to function.

## Reliable Write Contract

This is now a first-class requirement.

### Backend response contract

Apps Script should return JSON with:

- `ok`
- `stage`
- `session_id`
- `participant_id` when available
- `timestamp`
- `error` when relevant

### Frontend write behavior

1. attempt write with CORS-enabled JSON request
2. retry up to 3 times with exponential backoff
3. if all attempts fail, store the payload in `pendingWrites`
4. retry queued writes on:
   - app start
   - session resume
   - online reconnect
   - successful later writes

### Queue strategy

Immediate version:

- store `pendingWrites` in `localStorage`

PWA version:

- migrate the queue to IndexedDB for better resilience

This is the minimum viable dead-letter strategy without adding new infrastructure.

## Teacher Visibility Plan

This is the second major adjustment from v1.

The dashboard technology must be explicit.

### Teacher dashboard v1 technology choice

For immediate delivery, use a two-step path:

#### Step 1: Google Sheets Dashboard Tab

Use:

- `QUERY`
- pivot tables
- charts
- conditional formatting

This gives teachers something usable within days, not weeks.

It is operationally simple and acceptable for the first few hundred sessions.

#### Step 2: Apps Script HTMLService Teacher Web App

After the data model stabilizes, add a lightweight teacher web app rendered from Apps Script.

This avoids new backend infrastructure while giving:

- filters
- participant pages
- session drill-down
- a friendlier reading experience than Sheets

### Why not start with Looker Studio

Looker Studio can be useful later, but it is not the best first teacher tool because:

- teachers often need annotation, not just visualization
- session review and transcript reading are awkward there
- operational iteration is slower than a simple Apps Script interface

## Teacher Space v1

### Screen 1: Cohort Overview

- total learners
- total sessions
- completion rate
- average indicators by cohort
- most common repair reasons
- learners needing review

### Screen 2: Learner Profile

- identity and check-in match status
- session history
- trend of concreteness, semantic retention, and final-line strength
- latest synthesis
- latest transcript summary
- teacher notes

### Screen 3: Session Review

- transcript
- rubric
- checklist
- repair events
- delivered literary gift

### Screen 4: Signals Panel

- repeated difficulty in the same step
- low concretude across sessions
- progress in final-line strength
- return without completion
- recent growth worth teacher recognition

## Frontend Strategy for Teenagers

The user-facing experience should remain web-based, but it should feel more like a polished app.

### Recommendation

Use Svelte for the rendering layer migration.

Why Svelte fits this project:

- small runtime
- fast on low-end devices
- simple mental model
- easier transition from plain JavaScript than a heavier framework
- good support for animated, tactile interfaces without large abstractions

React remains a valid alternative if the team already has strong React capability, but Svelte is the preferred default for this project.

### Important boundary

Do not rewrite the pedagogical engine first.

Port the rendering layer before touching the core dialog logic.

Keep and progressively extract:

- validation rules
- presence logic
- transcript builders
- summary builders
- Apps Script API integration

## PWA Plan

This should be part of the frontend modernization, not a separate product track.

### PWA v1 features

- `manifest.json`
- install prompt
- service worker for app shell caching
- offline resume of the current session
- retry queue for pending sheet writes

### Teenage UX goals

- fast loading on school Wi-Fi and low-end Android
- home-screen install
- reliable session recovery
- touch-friendly layout
- smoother transitions
- no accidental data loss

### Nice-to-have later

- gesture support for back navigation
- better transition choreography
- reconnect awareness
- notification hooks if ever justified

## Agentic Horizon

The future horizon remains valid, but still inactive.

### Current mode

- `dialog_mode = "socratic"`

### Future optional mode

- `dialog_mode = "agentic"`

### Possible future gates

- multiple completed sessions
- sustained strong final-line indicators
- reduced repair frequency
- explicit learner opt-in
- explicit research and consent policy

### Constraint

Even in the future, the agent should challenge and extend the learner's own thinking.

It should not generate poems for them.

## Delivery Plan

## Track A: Data + Reliability

### Week 1

- redesign the registry sheets
- add `participant_id`
- add check-in matching
- add `consent_events`
- define response contract for Apps Script

### Week 2

- replace `no-cors` flow
- implement retry with exponential backoff
- add `pendingWrites`
- persist session indicators and repair events structurally

## Track B: Teacher Visibility

### Week 1

- create the first dashboard tab in Google Sheets
- show participation, completion, and repair summaries

### Week 2

- add learner profile readout
- add simple session review filters
- test with real educators

This track should run in parallel with Track A.

## Track C: Frontend Stabilization

### Week 3

- extract logic modules from `app.js`
- isolate API client
- isolate indicator computation
- isolate dialog strategy

### Week 4 to 5

- build Svelte UI shell
- port current screens without changing pedagogical behavior
- preserve pt-BR content and current visual identity

## Track D: PWA Layer

### Week 5 to 6

- add manifest
- add service worker
- move retry queue toward IndexedDB if needed
- validate installability and offline resume on real devices

## What This Proposal Optimizes For

- pedagogical integrity
- research-grade continuity per learner
- fast teacher usefulness
- low operational complexity
- teenager-friendly experience
- future optionality without AI drift

## Final Recommendation

The correct next move is:

- keep IZA non-generative
- restructure data around learners
- deliver teacher visibility immediately
- modernize the frontend as a Svelte-based PWA
- keep Apps Script for now

This path respects the lab's philosophy, improves current operations, and creates a realistic bridge toward a future agentic layer only if the pedagogy eventually earns that transition.
