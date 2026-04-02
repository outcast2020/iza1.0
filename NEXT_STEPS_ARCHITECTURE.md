# IZA 1.0 Next Steps Architecture

## Positioning

IZA should remain a non-generative writing mediator for now.

Its current strength is not "AI writing help", but a guided pedagogical flow that:

- asks instead of answers
- validates writing moves step by step
- closes the session with synthesis, keywords, and a literary gift

The next phase should protect that core while making the system:

- measurable
- user-centered instead of session-centered
- teacher-readable
- structurally ready for a future agentic layer without enabling it yet

## Product Principles

1. The app experience stays in Brazilian Portuguese.
2. Development documentation, architecture notes, schemas, and internal planning can move to English.
3. IZA must not generate text for the learner in the current phase.
4. Objective indicators should describe the learner's writing process, not replace teacher judgment.
5. A future agentic mode, if ever enabled, must depend on explicit user opt-in and clear writing-readiness milestones.

## What Already Exists in `Iza1.0`

The current frontend already contains the foundation for objective indicators:

- session transcript in `state.turns`
- step-level validation status in `pushTurn(..., meta)`
- scene/concreteness detection in `detectSceneSignals`
- final-line strength detection in `isStrongFinalLine`
- session rubric in `buildJourneyRubric`
- session checklist in `buildDoneChecklist`

The current backend already stores:

- participant name and email
- municipality, state, and origin
- chosen track and IZA presence
- final transcript
- journey synthesis
- keywords
- literary gift and closing log

## Main Gaps to Solve First

### 1. Registry is flat and session-based

`Code.gs` writes one row per session into a single records sheet. There is no durable participant entity and no independent learning history per user.

### 2. Indicators are computed but not persisted structurally

The frontend sends `turns`, `journeyRubric`, and `doneChecklist`, but the backend does not store them in a structured way for longitudinal analysis.

### 3. Check-in verification is not modeled yet

The current flow collects `name`, `email`, `municipio`, `estado`, and `origem`, but it does not verify or reconcile the participant against the check-in Google Sheet.

### 4. There is no teacher-facing pedagogical view

Teachers currently have no friendly space to inspect progression across sessions, compare indicators, or identify where a learner needs support.

### 5. Data write reliability is weak

`postJsonRobust` still uses `mode: "no-cors"` in the frontend, so the app cannot reliably confirm whether the records write actually succeeded.

## Recommended Target Architecture

Keep Google Sheets + Apps Script for now, but redesign the data model.

### Sheet A: Check-in Source

This remains the operational source of truth for workshop participation.

Suggested role:

- attendance / enrollment source
- participant verification source
- workshop grouping source

Suggested key:

- `checkin_user_id` if available
- otherwise a stable composite match rule using normalized email first, then name + cohort/workshop

### Sheet B: IZA Registry

This should become an independent, redesigned pedagogical registry.

Recommended tabs:

1. `participants`
2. `sessions`
3. `session_indicators`
4. `validation_events`
5. `teacher_notes`

### Proposed entities

#### `participants`

One row per person.

Core fields:

- `participant_id`
- `checkin_user_id`
- `full_name`
- `email`
- `municipio`
- `estado`
- `origem`
- `first_session_at`
- `last_session_at`
- `sessions_count`
- `consent_status`
- `teacher_group`

#### `sessions`

One row per IZA journey.

Core fields:

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
- `register_status`
- `transcript_txt`

#### `session_indicators`

One row per session with structured, queryable metrics.

Core fields:

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

#### `validation_events`

One row per repair or validation decision.

Core fields:

- `session_id`
- `participant_id`
- `step_key`
- `event_type`
- `reason`
- `user_text_excerpt`
- `created_at`

This table makes teacher analysis and research much easier than parsing the transcript later.

#### `teacher_notes`

One row per teacher annotation.

Core fields:

- `participant_id`
- `session_id`
- `teacher_name`
- `note_type`
- `note_text`
- `created_at`

## How to Link With the Check-in Sheet

Use a non-destructive verification pipeline:

1. User starts an IZA session.
2. Backend tries to match the participant to the check-in sheet.
3. If there is a confident match, store the `checkin_user_id` in `participants`.
4. If there is no confident match, still create or update the IZA participant registry independently.
5. Mark the verification status for later manual reconciliation when needed.

Recommended matching order:

1. exact normalized email
2. normalized full name + workshop/cohort
3. normalized full name + municipality

Recommended verification fields:

- `match_status`: `matched | ambiguous | unmatched`
- `match_method`: `email | name_cohort | name_city | manual`
- `matched_at`

This preserves independence while still allowing strong linkage.

## Teacher Space Recommendation

Do not start with a complex new platform.

Start with a teacher web app or protected dashboard fed by the redesigned IZA registry.

### Teacher dashboard v1 should answer:

1. Who has written before and how many times?
2. Which learners are advancing in concreteness, final-line strength, and semantic retention?
3. Where is each learner getting stuck?
4. Which sessions need teacher review?

### Teacher dashboard v1 screens

#### 1. Cohort overview

- total learners
- total sessions
- average rubric by cohort
- most frequent validation failures
- learners inactive for a given period

#### 2. Learner profile

- participant identity and workshop link
- session timeline
- indicator trend across sessions
- latest synthesis
- latest strong line
- teacher notes

#### 3. Session review

- transcript
- rubric
- checklist
- validation events by step
- literary gift delivered

#### 4. Signals panel

- repeated repair on the same step
- low concretude across multiple sessions
- strong progress in final-line quality
- high semantic retention growth

## Objective Writing Indicators for This Phase

These are the best first indicators because they are already close to the current code:

1. Step fidelity
2. Concreteness / scene realization
3. Final-line strength
4. Semantic retention between journey and synthesis
5. Number of repair loops
6. Session completion rate
7. Return rate across sessions

Important: keep them as pedagogical signals, not grades.

## Future Agentic Horizon Without Enabling AI Now

The codebase should become agent-ready, not agent-enabled.

Prepare for a future dialog strategy switch, but leave it inactive:

- `dialog_mode = "socratic"` now
- possible future `dialog_mode = "agentic"`

Possible activation gates in the future:

- multiple completed sessions
- sustained strong final lines
- lower repair frequency
- explicit user opt-in

The future agentic layer should only challenge or question the writer's own material. It should not author poems for them.

## Delivery Plan

### Phase 1: Stabilize and Restructure Data

Goal: make records trustworthy and longitudinal.

- replace `no-cors` write flow with a reliable Apps Script response contract
- redesign the IZA registry sheet structure
- persist `journeyRubric`, `doneChecklist`, and validation events structurally
- add participant-level registry with `participant_id`
- add check-in verification fields and matching logic
- add consent field

### Phase 2: Build Teacher Space v1

Goal: create a friendly pedagogical view without changing the learner experience.

- build a simple teacher dashboard
- add cohort overview, learner profile, and session review
- add filters by workshop, city, track, and progression signals
- add teacher notes

### Phase 3: Refactor Frontend for Maintainability

Goal: keep behavior, improve architecture.

- split `app.js` into modules
- isolate validation functions
- isolate dialog strategy
- isolate API client
- make summary and indicator generation testable

### Phase 4: Research Readiness

Goal: prepare the path to a future agentic experiment without activating it.

- define milestone rules for advanced interaction
- keep dialog strategy abstraction in place
- document ethics, consent, and opt-in rules

## Suggested Immediate Next Sprint

If only one sprint happens now, it should be this:

1. Redesign the Google Sheets data model.
2. Persist indicators and validation events structurally.
3. Add participant matching with the check-in sheet.
4. Build a minimal teacher dashboard readout.

This gives the lab:

- better pedagogical visibility
- a cleaner research dataset
- continuity per learner
- a strong base before any agentic experiment

## Practical Decision

The current best move is not "add AI".

The current best move is:

- protect the existing writing experience
- convert the hidden pedagogy into structured indicators
- organize the registry around learners
- give teachers a readable progression space

That path keeps IZA philosophically coherent and makes the next level possible for the right reasons.
