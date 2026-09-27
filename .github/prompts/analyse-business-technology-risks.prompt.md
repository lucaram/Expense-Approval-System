---
name: analyse-business-technology-risks
description: Analyse business and technology risks in the Expense Approval System, assess their likelihood and impact, relate them to current automated test coverage, and recommend mitigations.
argument-hint: Optionally specify a requirement, business rule, component, workflow, or risk area to focus on.
---

Use the QE automation agent and the `test-design-analysis` skill.

Analyse:

- `docs/expense-approval-system requirements.md`
- `docs/feature-architecture.md`
- `docs/domain-invariants.md`
- `docs/test-strategy.md`
- `docs/test-automation-architecture.md`
- `docs/test-traceability.md`
- existing tests under `tests/UNIT`, `tests/API`, and `tests/UI`

Identify business risks such as:

- incorrect expense status
- invalid approval or rejection
- invalid data being accepted
- valid data being rejected
- incorrect amount handling
- users seeing incorrect or stale status
- terminal states being modified
- important workflows being unavailable

Identify technology risks such as:

- frontend/backend contract mismatch
- backend business-rule enforcement failure
- incorrect API status codes or payloads
- persistence/data-integrity issues
- state-transition defects
- test-environment contamination
- insufficient test isolation
- brittle UI automation
- missing coverage at the appropriate test layer

For each identified risk, use this structure:

1. Risk
2. Risk type: Business or Technology
3. Relevant requirement/business rule/component
4. Likelihood
5. Impact
6. Overall priority
7. Existing automated coverage
8. Coverage gap, if any
9. Recommended mitigation
10. Recommended test layer
11. Recommended next test or engineering action

Assess likelihood using:

- High
- Medium
- Low

Assess impact using:

- High
- Medium
- Low

Determine overall priority using both likelihood and impact.

For example:

- High likelihood + High impact → High priority
- Low likelihood + High impact → may still be High or Medium priority depending on the severity
- High likelihood + Low impact → usually Medium priority
- Low likelihood + Low impact → Low priority

Do not use a purely mechanical score when project context suggests a different priority. Explain the reasoning briefly.

For each risk, propose practical ways to minimise it.

Mitigations may include:

- additional automated coverage
- moving coverage to a lower, more reliable test layer
- strengthening backend validation
- improving API contract checks
- improving state-transition coverage
- improving test isolation
- improving test data management
- improving semantic UI locators
- adding CI quality gates
- improving observability or failure diagnostics
- improving regression coverage

Prefer the smallest effective mitigation for the identified risk.

Base likelihood, impact, and prioritisation on evidence from the available project documentation, implementation, traceability, and existing tests.

Clearly distinguish:

- documented facts
- observed coverage gaps
- inferred risks
- recommended mitigations

Do not modify code or documentation.

Do not invent requirements, business rules, system behaviour, or risk evidence that are not supported by the project documentation or implementation.