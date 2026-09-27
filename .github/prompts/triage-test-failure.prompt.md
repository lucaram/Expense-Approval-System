---
description: Diagnose a failing automated test and identify whether the cause is test code, data, environment, configuration, dependency/runtime setup, or an application defect.
argument-hint: Provide the failing test name, error output, test layer, or area to investigate.
---

<!-- Tip: Use /create-prompt in chat to generate content with agent assistance -->

Use the QE automation agent.

Select the correct triage skill based on the failing test:

- `jest-failure-triage` for Jest unit/backend or React component tests
- `playwright-failure-triage` for Playwright API or UI/E2E tests

Investigate the failure before changing code.

Analyse:

- the failing test
- the test layer/framework
- the exact error/assertion
- relevant test configuration
- relevant production code
- applicable requirements/business rules

For Jest failures, inspect where relevant:

- mocks
- test isolation
- imports/module resolution
- Jest configuration
- Babel/TypeScript/TSX transformation
- React Testing Library queries
- React runtime/dependency issues

For Playwright failures, inspect where relevant:

- screenshots
- traces
- error context
- response payloads
- locators
- test data
- database state
- environment configuration
- frontend/backend connectivity

Classify the issue as one of:

- test defect
- locator/query problem
- test data problem
- database/reset problem
- environment/configuration issue
- dependency/runtime issue
- application defect
- documentation/implementation mismatch
- unresolved investigation

Do not change production code simply to make the test pass.

If a fix is justified:

1. explain the root cause
2. make the smallest appropriate change
3. rerun the relevant test suite
4. confirm the result

Return:

1. Failing test
2. Test layer/framework
3. Observed failure
4. Root cause
5. Evidence
6. Fix applied or recommended
7. Rerun result