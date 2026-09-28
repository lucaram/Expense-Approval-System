# Test Strategy — Expense Approval System

## 1. Objective

Define the testing approach for the Expense Approval System MVP and ensure the implemented requirements and business rules are validated at the appropriate test level.

## 2. Scope

The strategy covers the following requirements, documented in `docs/expense-approval-system requirements.md`, acceptance criteria (AC) as:

- AC-001 — Create expense
- AC-002 — Submit expense
- AC-003 — Approve expense
- AC-004 — Reject expense
- AC-005 — View status

The strategy covers the following business rules, documented in `docs/domain-invariants.md`, business rules (BR) are:

- BR-001 — Expense amount must be positive
- BR-002 — Draft is the initial status
- BR-003 — Only submitted expenses can be approved
- BR-004 — Only submitted expenses can be rejected
- BR-005 — Approved and rejected expenses are terminal
- BR-006 — Required fields must be present
- BR-007 — Status transitions must be valid
- BR-008 — Expense amount must not exceed £10,000

## 3. Test Levels

### Unit / Component Tests

Tools:
- Jest
- React Testing Library
- TypeScript

Focus:
- validation logic
- reusable business logic
- amount boundary validation
- component rendering and interaction where appropriate

### API Tests

Tools:
- Playwright APIRequestContext
- TypeScript

Focus:
- create expense
- retrieve expense
- submit expense
- approve expense
- reject expense
- validation failures
- amount boundary enforcement
- invalid state transitions
- HTTP status codes and response payloads

### UI / End-to-End Tests

Tools:
- Playwright Test
- TypeScript

Focus:
- employee creates an expense
- employee submits an expense
- manager approves an expense
- manager rejects an expense
- current status is displayed correctly
- frontend validation errors are displayed
- frontend and backend work together

## 4. Test Approach

Use the lowest reliable test layer for each scenario.

Avoid duplicating the same validation at every layer unless the duplication provides meaningful confidence.

Coverage will include:

- positive scenarios
- negative scenarios
- boundary conditions
- invalid state transitions
- regression scenarios

For amount validation, boundary coverage should include:

- amount less than or equal to zero is rejected
- a valid positive amount is accepted
- £10,000 is accepted
- an amount greater than £10,000 is rejected

Where appropriate, boundary validation should be covered at the lowest reliable layer and supported by API-level enforcement evidence.

## 5. Test Environment

Local environment:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001`
- Swagger UI: `http://localhost:3001/api-docs`

Automated tests will use a controlled test environment and isolated test data.

## 6. Test Data

Automated tests must not depend on existing records in the development database.

Tests should:

- create their own required data
- use predictable data
- whenever possible, avoid execution-order dependencies
- reset or isolate database state where required
- include explicit boundary values where required by business rules

For BR-008, representative amount values should include:

- `10000` as the valid maximum boundary
- `10000.01` as an invalid value above the maximum

## 7. Traceability

Tests should be traceable to:

- acceptance criteria
- business rules
- relevant API endpoints

Examples:

- AC-001
- AC-002
- BR-001
- BR-007
- BR-008

## 8. Regression

The regression suite should cover the main business workflows:

- create expense
- submit expense
- approve expense
- reject expense
- view expense status
- invalid transitions
- validation failures
- lower amount boundary validation
- upper amount boundary validation

Regression must include evidence that existing behaviour remains unchanged after business-rule updates.

## 9. Reporting

Test execution should provide:

- passed tests
- failed tests
- skipped tests
- failure evidence
- Playwright HTML reports
- screenshots / traces for UI failures where useful
- Jest coverage where useful
- clear evidence of new or changed business-rule coverage

## 10. Entry Criteria

Testing can begin when:

- MVP functionality is implemented
- changed requirements and business rules are documented
- API documentation is updated
- affected production code is implemented
- frontend and backend can run locally
- test framework configuration is available, for example:
  - Jest installed/configured for unit tests
  - Playwright installed/configured for API/UI tests
  - test folders created
  - base URLs/config set
  - test commands available in `package.json`

## 11. Exit Criteria

Testing is considered complete for the MVP or approved change when:

- agreed critical scenarios are automated
- regression suite passes
- no unresolved critical defects remain
- acceptance criteria (AC) in `docs/expense-approval-system requirements.md` and business rules (BR) in `docs/domain-invariants.md` have appropriate coverage
- changed business rules have explicit regression evidence
- test results are documented in the test report

For BR-008 specifically:

- £10,000 is proven valid
- an amount greater than £10,000 is proven invalid
- API enforcement is verified
- traceability is updated

## 12. CI

Automated tests are integrated into GitHub Actions so regression tests can run automatically on relevant pushes and pull requests.

CI should execute the full automated regression suite and fail when any required unit, API, or UI test fails.