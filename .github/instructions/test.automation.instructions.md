---
description: Apply these instructions when designing, creating, reviewing, debugging, or modifying test automation for the Expense Approval System.
applyTo: "**"
---

# Expense Approval System — Test Automation Instructions

You are working in the Expense Approval System repository.

Follow the existing project architecture, requirements, business rules, test strategy, test automation architecture, traceability, and established test conventions before creating or modifying tests.

## Test strategy

Use the lowest reliable test layer:

- Jest for unit and React component testing.
- Playwright APIRequestContext for API testing.
- Playwright Test for UI/E2E testing.

Avoid duplicating the same behaviour across multiple layers unless the duplication provides meaningful additional confidence.

## Existing test structure

Use the existing folders:

- `tests/UNIT/backend`
- `tests/UNIT/frontend`
- `tests/API`
- `tests/UI`
- `tests/various/test-data`
- `tests/various/utils`

Follow the existing naming conventions:

- Unit: `*.test.ts` or `*.test.tsx`
- API: `*.api.spec.ts`
- UI/E2E: `*.ui.spec.ts`

Do not create new test folder structures without a clear reason.

## Requirements, architecture, business rules, test strategy, test automation architecture and traceability

Before designing, modifying, or reviewing tests, inspect:

- `docs/expense-approval-system requirements.md`
- `docs/feature-architecture.md`
- `docs/domain-invariants.md`
- `docs/test-strategy.md`
- `docs/test-automation-architecture.md`
- `docs/test-traceability.md`

Use these documents for different purposes:

- Requirements define expected user behaviour and acceptance criteria.
- Feature architecture defines system boundaries, API responsibilities, persistence, and where business rules are enforced.
- Domain invariants define authoritative business rules and valid state transitions.
- Test strategy defines scope, test approach, regression, reporting, and quality expectations.
- Test automation architecture defines the appropriate test layer and tooling for each type of behaviour.
- Test traceability maps requirements and business rules to both planned and implemented automated coverage.

Tests should be traceable to acceptance criteria in `docs/expense-approval-system requirements.md` and/or business rules in `docs/domain-invariants.md`.

In `docs/test-traceability.md`, `TBD` means "to be determined" and indicates that no concrete automated test reference has yet been linked for that requirement or rule.

Do not invent test references. Only replace `TBD` with an actual existing test file and, where useful, the corresponding test name.

When adding, removing, or materially changing automated coverage, update `docs/test-traceability.md` so that it continues to reflect the current implementation.

### Documentation update rules

Treat the following documents as read-only reference sources unless the user explicitly asks to change them:

- `docs/expense-approval-system requirements.md`
- `docs/feature-architecture.md`
- `docs/domain-invariants.md`
- `docs/test-strategy.md`
- `docs/test-automation-architecture.md`

Do not modify these documents automatically as part of test creation, debugging, failure triage, or coverage expansion.

`docs/test-traceability.md` is the only project documentation file that may be updated automatically when automated coverage changes.

When updating `docs/test-traceability.md`:

- reference only tests that actually exist
- do not invent coverage
- preserve `TBD` where coverage is still missing
- distinguish accurately between covered, partially covered, and not covered
- keep the planned test layer aligned with the existing test strategy and test automation architecture

Do not invent requirements or expected behaviour that are not supported by the project documentation or implementation.

If documentation and implementation appear to conflict, report the mismatch rather than silently assuming which one is correct or modifying the documentation to match the implementation.

## Test design

Cover meaningful:

- positive scenarios
- negative scenarios
- validation failures
- boundary conditions
- invalid state transitions
- terminal-state behaviour

Prefer independent tests.

Each test should create the data it needs and should not depend on another test having run first.

State transitions within a single scenario are allowed when required by the business workflow.

Do not depend on execution order.

Avoid unnecessary duplication between unit, API, and UI layers.

## Test data and database

For API and UI/E2E tests:

- use `backend/expenses-test.db`
- assume the test database is reset before the suite through the root `package.json` scripts
- never use `backend/expenses.db` for automated testing

The reset mechanism is implemented through:

- `backend/src/resetTestDb.ts`

Do not rely on hard-coded database IDs from previous runs.

Use values created during the current test execution.

Test data should be predictable, readable, and relevant to the scenario being tested.

## Playwright locator rules

Prefer stable, user-facing locators:

1. `getByRole()`
2. `getByLabel()`
3. other semantic locators
4. `getByText()` only when no better semantic locator exists

Do not use brittle CSS selectors unless necessary.

Do not use `waitForTimeout()`.

Use Playwright auto-waiting and assertions such as:

- `toBeVisible()`
- `toHaveText()`
- `toHaveValue()`

For status elements, prefer locating the semantic element with `getByRole()` and asserting its value with `toHaveText()`.

## API test rules

Use Playwright `request` / APIRequestContext.

Validate both:

- HTTP response status
- meaningful response payload

For state transitions, verify the resulting expense status.

For negative tests, verify both:

- the expected HTTP status code
- the expected error response

Create the required test data within the test itself.

Do not depend on records created by another test.

## UI/E2E test rules

Use the real frontend and backend.

Prefer testing complete user-visible workflows.

For form inputs, use `getByLabel()`.

For buttons and semantic controls, use `getByRole()`.

For status values, prefer locating the semantic status element and asserting its text.

Verify user-visible outcomes rather than internal implementation details.

Do not duplicate API-level validation coverage in UI unless the UI test validates meaningful user-facing behaviour.

## Jest rules

Use Jest for backend unit logic and React component testing.

Use React Testing Library for frontend component tests.

Prefer behaviour-focused assertions over implementation-detail assertions.

Do not access the database from unit tests.

Unit tests should remain isolated from external services, the backend server, and the test database.

## Reuse and maintainability

Before creating new helpers, utilities, test data builders, or abstractions, inspect the existing test support code.

Reuse existing utilities where appropriate.

Extract reusable logic only when duplication justifies it.

Keep test code simple and readable.

Avoid unnecessary abstraction.

Do not introduce Page Object Models for trivial one-off interactions.

Introduce Page Objects only when UI coverage grows enough to justify meaningful reuse.

## Scope control

Make only changes required for the requested testing task.

Do not refactor unrelated production code.

Do not change requirements, business rules, or application behaviour unless explicitly asked.

If a test exposes what appears to be a product defect, report the mismatch instead of silently changing the application to make the test pass.

If production code must be changed to improve testability, explain why before making the change.

## Execution commands

Run all test commands from the project root.

### Unit tests

```bash
npm run test:unit