---
description: Iteratively analyse and expand automated test coverage until all requirements and business rules have the minimum justified coverage for the Expense Approval System.
argument-hint: Optionally specify a requirement, business rule, test layer, area, or maximum scope to focus on.
---

Use the QE automation agent.

The objective is to achieve the minimum sufficient automated coverage for all documented acceptance criteria and business rules without unnecessary duplication, artificial tests, or over-testing.

Work iteratively using this cycle:

ANALYSE
→ SELECT NEXT GAP
→ IMPLEMENT SMALLEST USEFUL TEST
→ EXECUTE
→ UPDATE TRACEABILITY
→ RE-ANALYSE
→ REPEAT

Continue until there are no meaningful justified coverage gaps remaining.

---

## Phase 1 — Analyse current coverage

Use the `test-design-analysis` skill.

Inspect:

- `docs/expense-approval-system requirements.md`
- `docs/feature-architecture.md`
- `docs/domain-invariants.md`
- `docs/test-strategy.md`
- `docs/test-automation-architecture.md`
- `docs/test-traceability.md`
- existing tests under:
  - `tests/UNIT`
  - `tests/API`
  - `tests/UI`
- relevant production code where necessary to understand where behaviour is actually enforced

For every acceptance criterion and business rule determine:

- exact documented behaviour
- current automated evidence
- current coverage classification
- valid-path coverage
- invalid-path coverage
- boundary coverage
- terminal-state coverage
- API-enforcement coverage
- UI-visible coverage where relevant
- duplicated or unnecessary coverage
- the lowest reliable layer for any remaining gap

Classify each item as:

- `Covered`
- `Partial`
- `Not covered`

Use only concrete test evidence.

Do not infer full coverage from similar or related tests.

---

## Coverage assessment rules

Evaluate the exact wording of each requirement and business rule.

A requirement or rule is `Covered` only when all behaviour required by that row is exercised at the justified test layer.

Use `Partial` when only part of the behaviour is proven.

Use `Not covered` when no concrete automated test proves the behaviour.

For restrictive rules containing words such as:

- `only`
- `must`
- `must not`
- `cannot`
- `terminal`

require explicit evidence of the prohibited behaviour.

A successful positive path alone does not prove an `only` rule.

A terminal-state rule requires evidence that prohibited subsequent transitions are rejected.

Boundary rules must include meaningful boundary evidence where appropriate.

Do not confuse:

- validation logic
- API enforcement
- state-transition behaviour
- UI presentation
- end-to-end workflow behaviour

---

## Test-layer selection

Always use the lowest reliable layer that meaningfully proves the behaviour.

Use:

- Jest unit tests for isolated pure business/validation logic
- Jest React tests for isolated frontend/component behaviour
- Playwright API tests for backend enforcement, persistence-dependent behaviour, and state transitions
- Playwright UI/E2E tests only when user-visible behaviour or frontend/backend integration must be proven

Do not create a unit test merely because a traceability row currently says `Unit + API`.

If the production architecture does not expose isolated unit-testable logic and testing it would require:

- SQLite
- HTTP
- service integration
- persistence
- artificial mocking of implementation details

then prefer the appropriate API/integration layer.

Do not introduce a new production abstraction solely to manufacture a unit test unless the existing architecture itself clearly justifies that refactoring.

If the planned layer in `docs/test-traceability.md` appears inconsistent with the actual architecture:

1. verify this from production code
2. explain the mismatch
3. select the genuinely lowest reliable layer
4. do not add pointless tests merely to satisfy an outdated layer label
5. update the planned layer in traceability only when the architectural evidence clearly justifies the correction
6. never change the planned layer merely to make coverage appear complete

---

## Phase 2 — Select the next test

From the current analysis, select the smallest useful test that closes the most meaningful remaining coverage gap.

Prefer tests that:

- close a complete requirement/business-rule gap
- cover multiple closely related rules naturally
- add meaningful confidence
- avoid duplicating existing evidence
- use the lowest reliable layer

Before implementing the test, explicitly determine:

1. requirement/business rule affected
2. existing evidence
3. exact remaining gap
4. selected test layer
5. why that layer is appropriate
6. what the test will prove
7. what the test will NOT prove

---

## Phase 3 — Implement

Use:

- `jest-test-implementation` for Jest unit/component tests
- `playwright-test-implementation` for Playwright API/UI tests

Implement only the smallest change required.

Follow:

- existing repository structure
- existing naming conventions
- existing test-data strategy
- database isolation/reset rules
- Playwright/Jest workspace instructions

Reuse existing test files where appropriate.

Do not create unnecessary new files or abstractions.

Do not modify:

- requirements
- business rules
- architecture
- domain invariants
- test strategy
- test automation architecture

unless explicitly requested.

`docs/test-traceability.md` may be updated as part of this workflow.

---

## Phase 4 — Execute

Run the relevant suite after each implementation:

- `npm run test:unit` for Jest
- `npm run test:api` for Playwright API
- `npm run test:ui` for Playwright UI/E2E

Do not continue to the next coverage gap if the newly added test fails for an unresolved reason.

If a test fails:

1. analyse the failure
2. determine whether the problem is:
   - test defect
   - production defect
   - environment issue
   - documentation mismatch
3. stop the iterative coverage-expansion loop if the cause cannot be resolved confidently

Do not hide failures by weakening assertions.

---

## Phase 5 — Update traceability

After a successful test, update `docs/test-traceability.md` only where concrete evidence changed.

For every affected row:

- reference only tests that actually exist
- update coverage conservatively
- use `Partial` if any documented behaviour remains unproven
- use `Covered` only when the full justified meaning is evidenced
- state what remains missing when still `Partial`

Do not inflate coverage.

Do not add additional test layers simply because they are technically possible.

The goal is sufficient evidence, not maximum test count.

---

## Phase 6 — Re-analyse

After each successful implementation and traceability update:

1. re-read the affected traceability rows
2. re-evaluate remaining gaps
3. identify the new smallest useful next test
4. repeat the Analyse → Implement → Execute → Traceability cycle

Do not rely on the original coverage analysis after repository state has changed.

Always reassess against the current code and tests.

---

## Stop conditions

Stop the iterative process when one of these conditions is reached:

### Coverage complete

All acceptance criteria and business rules have sufficient justified automated evidence at their appropriate lowest reliable layers.

### No meaningful additional coverage

Remaining possible tests would only:

- duplicate existing evidence
- test implementation details
- require artificial production refactoring
- add another layer without meaningful confidence
- provide negligible value

### Architecture mismatch

A remaining `Partial` classification exists only because an outdated planned test layer does not match the actual production architecture.

In that case:

- do not manufacture tests
- explain the mismatch
- recommend or apply the justified traceability-layer correction
- reassess coverage

### Documentation conflict

Requirements, business rules, architecture, and implementation disagree.

In that case:

- stop
- report the conflict
- do not invent intended behaviour

### Unresolved failure

A new test exposes an unresolved test, product, data, or environment problem.

Stop before implementing unrelated additional tests.

---

## Final validation

When no meaningful coverage gaps remain, run the complete relevant regression:

- `npm run test:unit`
- `npm run test:api`
- `npm run test:ui`

Do not declare coverage completion if any required suite fails.

Run `git diff --check`.

---

## Final report

At completion report:

### Coverage result

For every AC and BR:

- identifier
- final classification
- primary evidence
- selected test layer

### Tests added

For each test:

- test name
- file
- requirement/business rule covered
- what it proves

### Test execution

Report:

- unit result
- API result
- UI result
- final regression result

### Traceability

Report:

- rows changed
- classification changes
- any planned-layer corrections and why

### Remaining gaps

List any remaining:

- intentional gaps
- architectural limitations
- documentation conflicts
- deferred tests

If none remain, explicitly state:

`No meaningful justified automated coverage gaps remain.`