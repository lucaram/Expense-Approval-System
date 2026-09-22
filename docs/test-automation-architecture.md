## Test Layers and Tools

The project should use the lowest reliable test level for each behaviour.

### Unit Tests

Tooling:

- Jest
- React Testing Library
- TypeScript

Use for isolated business logic and component behaviour.

Examples:

- amount validation
- status-transition validation
- pure utility functions
- domain/business-rule functions
- React component rendering
- component interaction and validation
- conditional UI behaviour

### API Tests

Tooling:

- Playwright APIRequestContext
- TypeScript

Use Playwright's API testing capabilities for backend behaviour and business-rule enforcement.

Examples:

- create expense
- submit expense
- approve expense
- reject expense
- invalid status transitions
- validation errors
- HTTP status codes
- response payload validation
- API error handling

### UI / End-to-End Tests

Tooling:

- Playwright Test
- TypeScript

Use for user-facing workflows and end-to-end behaviour across frontend and backend.

Examples:

- employee creates an expense
- employee submits an expense
- manager approves an expense
- manager rejects an expense
- current status is displayed correctly
- validation messages are displayed correctly
- frontend and backend behave correctly together