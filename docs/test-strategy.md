# Test Strategy — Expense Approval System

## 1. Objective

Define the testing approach for the Expense Approval System MVP and ensure the implemented requirements and business rules are validated at the appropriate test level.

## 2. Scope

The strategy covers the following requirements, documented in `docs/expense-approval-system requirements.md`, acceptance criteria(AC) as:

- AC-001 — Create expense
- AC-002 — Submit expense
- AC-003 — Approve expense
- AC-004 — Reject expense
- AC-005 — View status

The strategy covers the following business rules, documented in
`docs/domain-invariants.md`, business rules (BR) are:

- BR-001 — Expense amount must be positive
- BR-002 — Draft is the initial status
- BR-003 — Only submitted expenses can be approved
- BR-004 — Only submitted expenses can be rejected
- BR-005 — Approved and rejected expenses are terminal
- BR-006 — Required fields must be present
- BR-007 — Status transitions must be valid


## 3. Test Levels

### Unit / Component Tests

Tools:
- Jest
- React Testing Library
- TypeScript

Focus:
- validation logic
- status transition logic
- reusable business logic
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

## 8. Regression

The regression suite should cover the main business workflows:

- create expense
- submit expense
- approve expense
- reject expense
- view expense status
- invalid transitions
- validation failures

## 9. Reporting

Test execution should provide:

- passed tests
- failed tests
- skipped tests
- failure evidence
- Playwright HTML reports
- screenshots / traces for UI failures where useful
- Jest coverage where useful

## 10. Entry Criteria

Testing can begin when:

- MVP functionality is implemented
- API documentation is available
- frontend and backend can run locally
- test framework configuration is available, for example:
Jest installed/configured for unit tests
Playwright installed/configured for API/UI tests
test folders created
base URLs/config set
test commands available in package.json

## 11. Exit Criteria

Testing is considered complete for the MVP when:

- agreed critical scenarios are automated
- regression suite passes
- no unresolved critical defects remain
- acceptance criteria (AC) in `docs/expense-approval-system requirements.md` and business rules (BR) in `docs/domain-invariants.md` have appropriate coverage
- test results are documented in the test report

## 12. CI

Automated tests will later be integrated into GitHub Actions so regression tests can run automatically on relevant pushes and pull requests.