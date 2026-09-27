---
description: Implement the next justified automated test for an identified coverage gap in the Expense Approval System.
argument-hint: Specify the coverage gap, requirement, business rule, or test scenario to implement.
---

<!-- Tip: Use /create-prompt in chat to generate content with agent assistance -->

Use the QE automation agent.

Use `test-design-analysis` first to confirm the coverage gap and select the correct test layer.

Then use:

- `jest-test-implementation` for Jest unit/component tests
- `playwright-test-implementation` for Playwright API or UI/E2E tests

Before changing code:

1. inspect the relevant requirement/business rule
2. inspect `docs/test-traceability.md`
3. inspect existing automated tests
4. inspect the relevant production code where useful to understand current implementation
5. confirm the exact coverage gap
6. identify what the proposed test will prove
7. identify what the proposed test will NOT prove
8. select the lowest reliable test layer
9. explain briefly what test will be added and why

Then:

1. implement the smallest useful test
2. follow the existing folder and naming conventions
3. follow the relevant Jest or Playwright rules
4. use the correct test data/isolation strategy for the selected layer
5. run the relevant test suite
6. review the result
7. update `docs/test-traceability.md` only if coverage actually changed

When updating `docs/test-traceability.md`:

- evaluate each affected requirement/business rule against the exact evidence provided by the implemented test
- do not mark an item as `Covered` unless the full meaning of that requirement/rule is actually exercised
- use `Partial` when the new test proves only part of the behaviour
- preserve `TBD` or `Not covered` where no concrete automated test exists
- reference only tests that actually exist
- do not infer full coverage from related behaviour
- if the planned test layer is `API + UI`, do not mark the row fully covered when only one of those layers exists unless the requirement is demonstrably satisfied by the available evidence
- for restrictive rules containing `only`, `must not`, `cannot`, or `terminal`, require explicit negative/forbidden-path evidence before marking them fully covered
- a successful positive transition does not fully prove an `only` rule
- a terminal-state rule requires evidence that further transitions are rejected
- if a row remains `Partial`, briefly state exactly what is still missing
- keep valid-path, invalid-path, terminal-state, API-enforcement, and UI-display coverage distinct
- do not change the documented planned test layer merely to make current coverage appear complete

Run:

- `npm run test:unit` for Jest
- `npm run test:api` for Playwright API
- `npm run test:ui` for Playwright UI/E2E

Do not modify requirements, architecture, business rules, test strategy, or test automation architecture.

If documentation and implementation conflict:

- report the mismatch
- do not silently change either side
- do not invent the expected behaviour

At completion, report:

- test added or modified
- requirement/business rule affected
- what the test proves
- what remains unproven, if anything
- selected test layer and why
- implementation skill used
- files changed
- execution command
- execution result
- traceability changes
- final coverage classification for each affected requirement/business rule