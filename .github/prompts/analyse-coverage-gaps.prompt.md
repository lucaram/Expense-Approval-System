---
description: Analyse current automated test coverage and identify the next meaningful gaps in the Expense Approval System.
argument-hint: Optionally specify a requirement, business rule, test layer, or area to analyse.
---

<!-- Tip: Use /create-prompt in chat to generate content with agent assistance -->

Use the QE automation agent and the `test-design-analysis` skill.

Analyse:

- `docs/expense-approval-system requirements.md`
- `docs/feature-architecture.md`
- `docs/domain-invariants.md`
- `docs/test-strategy.md`
- `docs/test-automation-architecture.md`
- `docs/test-traceability.md`
- existing tests under `tests/UNIT`, `tests/API`, and `tests/UI`

Identify:

- uncovered requirements/business rules
- partially covered requirements/business rules
- duplicated or unnecessary coverage
- the lowest reliable test layer for each gap
- the smallest useful test to add next

Consider all supported test layers:

- Jest unit/backend
- Jest React component
- Playwright API
- Playwright UI/E2E

When assessing current coverage:

- evaluate the exact wording of each requirement and business rule
- classify coverage only from concrete existing test evidence
- do not infer full coverage from a related or similar test
- do not mark a requirement/rule as `Covered` unless all behaviour required by that row is actually exercised
- use `Partial` when only part of the behaviour is tested
- use `Not covered` when no concrete automated test proves the behaviour
- preserve `TBD` where no concrete test reference exists
- if the planned layer is `API + UI`, do not assume full coverage when only one layer exists
- for restrictive rules containing words such as `only`, `must not`, `cannot`, or `terminal`, verify that negative/forbidden behaviour is explicitly tested
- a successful positive path alone does not fully prove a restrictive rule
- a terminal-state rule requires evidence that further transitions are rejected
- clearly distinguish:
  - valid-path coverage
  - invalid-path coverage
  - terminal-state coverage
  - UI display coverage
  - API enforcement coverage

If documentation and existing tests do not align, report the mismatch instead of assuming the intended behaviour.

Do not modify code or documentation.

Return a concise coverage-gap analysis with:

1. Requirement / business rule
2. Current coverage
3. Coverage classification:
   - Covered
   - Partial
   - Not covered
4. Evidence from existing tests
5. Coverage gap
6. Recommended test layer
7. Recommended next test
8. Reason for the recommendation
9. Recommended implementation skill:
   - `jest-test-implementation`
   - or `playwright-test-implementation`

At the end, identify one:

### Smallest useful next test

Recommend the single smallest test that closes the most meaningful current coverage gap without introducing unnecessary duplication.