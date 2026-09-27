---
name: test-design-analysis
description: Analyse requirements, business rules, architecture, traceability, and existing automated tests to identify meaningful test coverage gaps and recommend the correct test layer. Use for test design, coverage analysis, traceability review, regression planning, and deciding whether a scenario belongs in Jest, API, or UI/E2E testing.
---

# Test Design Analysis Skill

Use this skill before creating or expanding automated test coverage.

## Purpose

Identify:

- what behaviour is not yet covered
- which requirement or business rule is affected
- which test layer should cover it
- whether equivalent coverage already exists
- the smallest useful automated test to add

## Required project context

Inspect the relevant project documentation before proposing tests:

- `docs/expense-approval-system requirements.md`
- `docs/feature-architecture.md`
- `docs/domain-invariants.md`
- `docs/test-strategy.md`
- `docs/test-automation-architecture.md`
- `docs/test-traceability.md`

Also inspect the existing automated tests under:

- `tests/UNIT`
- `tests/API`
- `tests/UI`

## Analysis workflow

1. Identify the requirement, acceptance criterion, or business rule being analysed.
2. Inspect the existing traceability entry.
3. Inspect existing automated tests that may already cover the behaviour.
4. Determine whether coverage is:
   - covered
   - partially covered
   - not covered
5. Identify the lowest reliable test layer:
   - Jest unit/component
   - Playwright API
   - Playwright UI/E2E
6. Avoid unnecessary duplication between layers.
7. Identify positive, negative, boundary, validation, and state-transition scenarios where relevant.
8. Recommend the smallest useful addition to coverage.

## Test layer guidance

Use Jest when behaviour can be tested reliably in isolation.

Examples:

- validation logic
- pure business logic
- reusable functions
- React component rendering
- isolated component behaviour

Use Playwright API testing when validating authoritative backend behaviour.

Examples:

- HTTP status codes
- response payloads
- persistence behaviour
- business-rule enforcement
- invalid state transitions

Use Playwright UI/E2E when validating meaningful user-visible behaviour across frontend and backend.

Examples:

- employee workflow
- manager workflow
- status display
- validation messages
- complete user journeys

## Traceability rules

Use `docs/test-traceability.md` as the current coverage map.

`TBD` means that a concrete automated test reference has not yet been linked.

Do not invent test references.

When proposing coverage, clearly state:

- requirement/business rule
- current coverage
- identified gap
- recommended test layer
- recommended test scenario

## Handoff guidance

After identifying the appropriate test layer:

- use `jest-test-implementation` for Jest unit/component coverage
- use `playwright-test-implementation` for Playwright API or UI/E2E coverage

If an existing test is failing rather than new coverage being added:

- use `jest-failure-triage` for Jest failures
- use `playwright-failure-triage` for Playwright failures

## Output format

Provide a concise analysis containing:

- Coverage gap
- Requirement / business rule
- Existing coverage
- Recommended test layer
- Proposed test scenario
- Reason for choosing that layer

Do not implement tests unless explicitly asked.