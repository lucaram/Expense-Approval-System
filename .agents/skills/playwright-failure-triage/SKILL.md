
### 3. `playwright-failure-triage`

```md
---
name: playwright-failure-triage
description: Analyse failing Playwright API or UI/E2E tests and determine whether the cause is test code, test data, database state, environment, configuration, locator strategy, timing, API behaviour, or an application defect. Use for debugging failed Playwright tests, flaky tests, environment issues, unexpected API responses, locator failures, and regression failures.
---

# Playwright Failure Triage Skill

Use this skill when a Playwright API or UI/E2E test fails.

## Purpose

Diagnose the failure before changing code.

Determine whether the issue belongs to:

- test implementation
- locator strategy
- test data
- database state
- environment
- Playwright configuration
- frontend
- backend
- documented requirement/business rule
- genuine application defect

## Triage workflow

1. Read the complete failure message.
2. Identify the exact failing assertion or action.
3. Inspect the relevant test code.
4. Inspect screenshots, traces, error context, or response data when available.
5. Check whether the correct test environment is running.
6. Check whether API/UI tests are using `backend/expenses-test.db`.
7. Check whether the test database was reset correctly.
8. Compare actual behaviour with:
   - requirements
   - business rules
   - architecture
   - traceability
9. Determine the most likely root cause.
10. Make the smallest justified change.
11. Rerun the relevant test.
12. Confirm whether the issue is resolved.

## Locator failures

When Playwright reports multiple matching elements:

- do not immediately use `.first()` or positional selectors
- prefer making the locator semantically unique
- use `getByRole()`, `getByLabel()`, or meaningful filtering

When an element cannot be found:

- inspect whether the expected semantic role or label actually exists
- inspect whether the application state reached the expected point
- verify that frontend/backend calls succeeded

## API failures

Inspect:

- HTTP status
- response body
- request payload
- API endpoint
- current expense state
- expected state transition

Do not assume the test is wrong simply because the API returned an unexpected response.

## Environment failures

Check:

- frontend running on expected URL
- backend running on expected URL
- backend started with `DB_PATH=expenses-test.db`
- `.env.test` values
- Playwright base URL
- API base URL
- database reset execution

## Flaky tests

Avoid fixing flakiness by adding arbitrary waits.

Do not use:

```ts
waitForTimeout()