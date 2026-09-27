---
name: jest-failure-triage
description: Analyse failing Jest backend unit tests or React component tests and determine whether the cause is test logic, mocks, module resolution, Babel/TypeScript transformation, React Testing Library usage, duplicate React/runtime configuration, production logic, or a genuine defect. Use for debugging Jest failures, component-test failures, configuration issues, and unit-test regressions.
---

# Jest Failure Triage Skill

Use this skill when a Jest unit or React component test fails.

## Purpose

Diagnose the failure before changing code.

Determine whether the issue belongs to:

- test implementation
- incorrect expectation
- test isolation
- mock configuration
- import/module resolution
- Jest configuration
- Babel/TypeScript/TSX transformation
- React Testing Library query
- React runtime/configuration
- production logic
- documented requirement/business-rule mismatch
- genuine application defect

## Triage workflow

1. Read the complete Jest failure message.
2. Identify the exact failing test and assertion.
3. Determine whether it is:
   - backend unit test
   - React component test
4. Inspect the relevant test code.
5. Inspect the production code under test.
6. Compare expected behaviour with requirements/business rules where relevant.
7. Determine the most likely root cause.
8. Explain the cause before modifying code.
9. Make the smallest justified change.
10. Rerun the relevant Jest tests.
11. Confirm whether the issue is resolved.

## Backend unit failures

Inspect:

- function inputs
- expected vs actual outputs
- validation/business-rule logic
- imports
- mocks
- shared mutable state
- test-order dependency

Do not involve:

- backend server
- HTTP requests
- SQLite
- `expenses-test.db`

unless the test is incorrectly designed and should be moved to another layer.

## React component failures

Inspect:

- React Testing Library queries
- accessible roles and labels
- rendered output
- component state transitions visible to the user
- mocks
- React/Jest configuration
- Babel/TSX transformation
- duplicate React installations/runtime mismatch

Prefer fixing semantic queries rather than using brittle selectors.

Do not test internal React state directly.

## Configuration failures

Check:

- `jest.config.ts`
- `jest.setup.ts`
- `babel.config.cjs`
- root `tsconfig.json`
- root `package.json`
- installed Jest/React Testing Library/type dependencies

Common failure categories include:

- ESM/CommonJS mismatch
- TypeScript/TSX transformation failure
- JSX runtime/type resolution
- missing Jest DOM matchers
- duplicate React copies
- module path resolution

## Flaky or order-dependent tests

Check for:

- shared mutable state
- unreset mocks
- global state
- tests depending on another test
- asynchronous behaviour not awaited correctly

Do not fix unit-test flakiness with arbitrary sleeps.

## Application defects

If the test correctly represents documented expected behaviour but the production logic does not:

- identify it as a likely application defect
- explain the mismatch
- do not weaken the test simply to make it pass
- do not silently change requirements or business rules

## Output format

Report:

- failing test
- test type: backend unit or React component
- observed failure
- root cause
- evidence
- fix applied or recommended
- rerun result

Classify the outcome as:

- test defect
- test configuration issue
- dependency/runtime issue
- application defect
- documentation/implementation mismatch
- unresolved investigation