---
name: jest-test-implementation
description: Implement or modify Jest backend unit tests and React component tests for the Expense Approval System using the project's established structure, React Testing Library conventions, isolation rules, and Jest/Babel configuration. Use when creating Jest tests, expanding unit/component coverage, or implementing identified coverage gaps at the unit level.
---

# Jest Test Implementation Skill

Use this skill when implementing Jest unit or React component tests.

## Purpose

Create fast, isolated, readable, deterministic Jest tests that follow the project's existing conventions.

Use Jest for:

- backend validation and business logic
- pure functions and utilities
- domain logic
- React component rendering
- isolated component behaviour

Do not use Jest for:

- HTTP/API behaviour
- database integration
- end-to-end workflows
- real frontend/backend integration

## Before implementation

Inspect:

- the relevant requirement or business rule
- `docs/test-traceability.md`
- existing tests under `tests/UNIT`
- the relevant production code
- `.github/instructions/test.automation.instructions.md`

Confirm that the behaviour belongs at unit/component level before creating the test.

## Test structure

Use:

- `tests/UNIT/backend` for backend unit tests
- `tests/UNIT/frontend` for React component tests

Naming:

- backend/unit: `*.test.ts`
- React component: `*.test.tsx`

Do not create new unit-test folder structures without a clear reason.

## Backend unit test rules

Test logic in isolation.

Examples:

- validation rules
- pure business logic
- reusable functions
- domain/state-transition logic where isolated logic exists

Do not:

- start the backend server
- call HTTP endpoints
- access SQLite
- use `backend/expenses-test.db`
- depend on another test

Use mocks only when necessary.

Prefer testing inputs and outputs rather than implementation details.

## React component test rules

Use React Testing Library.

Prefer user-facing queries:

1. `getByRole()`
2. `getByLabelText()`
3. other accessible queries

Test:

- rendered content
- visible controls
- user-facing component behaviour
- validation or conditional rendering where appropriate

Avoid:

- testing internal React state directly
- querying implementation-specific class names
- testing private implementation details
- calling the real backend unless explicitly creating an integration-style test

## Isolation

Unit/component tests must:

- run without frontend/backend servers
- run without a database
- not depend on execution order
- not share mutable state between tests
- create their own inputs and mocks

## Assertions

Use clear assertions that describe observable behaviour.

Examples:

- `toEqual()`
- `toContain()`
- `toBeInTheDocument()`
- `toHaveTextContent()`
- `toBeVisible()`

Avoid over-asserting implementation details.

## Maintainability

Keep each test focused on one behaviour or responsibility.

Reuse existing helpers where useful.

Do not create unnecessary abstraction.

Keep test names business-readable.

## Execution

Run from the project root:

`npm run test:unit`

If relevant, run coverage with:

`npm run test:unit:coverage`

## Traceability

When new unit/component coverage materially changes requirement or business-rule coverage, update:

`docs/test-traceability.md`

Only reference tests that actually exist.

Do not modify other project documentation automatically.

## Completion report

Report:

- test added or modified
- requirement/business rule covered
- why Jest was the appropriate layer
- files changed
- execution command
- pass/fail result
- whether traceability was updated