---
name: playwright-test-implementation
description: Implement or modify Playwright API and UI/E2E tests for the Expense Approval System using the project's established structure, data strategy, locator rules, assertions, and database isolation. Use when creating Playwright tests, expanding API/UI coverage, implementing identified coverage gaps, or improving existing Playwright automation.
---

# Playwright Test Implementation Skill

Use this skill when implementing Playwright API or UI/E2E automation.

## Purpose

Create reliable, readable, deterministic Playwright tests that follow the existing project architecture and conventions.

## Before implementation

Inspect:

- relevant requirement or business rule
- `docs/test-traceability.md`
- existing Playwright tests
- relevant application/API implementation
- `.github/instructions/test.automation.instructions.md`

Do not implement a test before understanding the expected behaviour.

## Test structure

Use:

- `tests/API` for API tests
- `tests/UI` for UI/E2E tests

Naming:

- API: `*.api.spec.ts`
- UI/E2E: `*.ui.spec.ts`

Do not create a new folder structure unless necessary.

## API implementation rules

Use Playwright `request` / APIRequestContext.

Each API test should:

1. create the data it requires
2. perform the action being tested
3. verify the HTTP status
4. verify meaningful response data
5. verify resulting state where relevant

For negative scenarios verify:

- expected error status
- expected error payload

Do not use hard-coded IDs from previous runs.

Do not depend on another test.

## UI/E2E implementation rules

Use the real frontend and backend.

Prefer stable semantic locators:

1. `getByRole()`
2. `getByLabel()`
3. other semantic locators
4. `getByText()` only when necessary

For form fields prefer `getByLabel()`.

For buttons and controls prefer `getByRole()`.

For status elements prefer:

```ts
page.getByRole('status')