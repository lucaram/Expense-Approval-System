# Feature Architecture

## Purpose

This document describes the technical design of the Expense Approval System MVP.

## Technology Stack

### Frontend

- React / NextJS framework
- TypeScript
- Browser-based single-page application

### Backend

- Node.js
- Express
- TypeScript

### Database

- SQLite

## High-Level Architecture

The system consists of:

- React frontend
- Node.js/Express backend API
- SQLite database

The frontend communicates with the backend using HTTP/JSON APIs.

The backend is responsible for:

- business-rule validation
- status-transition validation
- persistence
- returning API responses

The frontend is responsible for:

- collecting user input
- displaying expense data
- displaying validation errors
- allowing employee and manager actions

## Expense Domain Model

An expense contains:

- `id`
- `employee`
- `description`
- `amount`
- `expenseDate`
- `status`

Allowed status values:

- `DRAFT`
- `SUBMITTED`
- `APPROVED`
- `REJECTED`

## API Design

### Create Expense

`POST /api/expenses`

Creates a new expense.

Expected result:

- expense is persisted
- initial status is `DRAFT`

### Get Expense

`GET /api/expenses/:id`

Returns the expense and its current status.

### Submit Expense

`POST /api/expenses/:id/submit`

Allowed only when the current status is `DRAFT`.

Expected result:

- status becomes `SUBMITTED`

### Approve Expense

`POST /api/expenses/:id/approve`

Allowed only when the current status is `SUBMITTED`.

Expected result:

- status becomes `APPROVED`

### Reject Expense

`POST /api/expenses/:id/reject`

Allowed only when the current status is `SUBMITTED`.

Expected result:

- status becomes `REJECTED`

## Business Rule Enforcement

The backend must enforce the authoritative rules defined in:

`docs/domain-invariants.md`

The frontend must not be treated as the authoritative enforcement layer.

For example, hiding an Approve button is useful UI behaviour, but the backend must still reject an invalid approval request.

## Persistence

SQLite stores expense records.

The backend is the only application component that reads from or writes directly to the database.

The frontend must access expense data through the backend API.

## Error Handling

The API should return appropriate errors for:

- missing required fields
- amount less than or equal to zero
- expense not found
- invalid status transition

The frontend should display meaningful errors returned by the backend.

## MVP Scope

Authentication and real user authorization are outside the initial MVP.

Employee and manager roles may initially be represented by separate UI workflows rather than a full authentication system.