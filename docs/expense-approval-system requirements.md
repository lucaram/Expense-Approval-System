# Expense Approval System — MVP Requirements

## Objective

Allow an employee to submit an expense claim and allow a manager to approve or reject it.

## Actors

### Employee

An employee can:

- create an expense claim
- submit the claim for approval
- view the current status of the claim

### Manager

A manager can:

- view submitted expense claims
- approve a submitted claim
- reject a submitted claim

## Expense Claim Data

Each expense claim must contain:

- employee
- description
- amount
- expense date
- status

## Statuses

An expense claim can have the following statuses:

- `DRAFT`
- `SUBMITTED`
- `APPROVED`
- `REJECTED`

## Acceptance Criteria

### AC-001 — Create expense

Given an employee is using the system  
When they create an expense with a valid description, amount, and expense date  
Then the expense is created with status `DRAFT`.

### AC-002 — Submit expense

Given an expense is in `DRAFT` status  
When the employee submits it  
Then its status becomes `SUBMITTED`.

### AC-003 — Approve expense

Given an expense is in `SUBMITTED` status  
When a manager approves it  
Then its status becomes `APPROVED`.

### AC-004 — Reject expense

Given an expense is in `SUBMITTED` status  
When a manager rejects it  
Then its status becomes `REJECTED`.

### AC-005 — View status

Given an employee has submitted an expense  
When they view the expense  
Then the current status is displayed.

## Validation

- Description is mandatory.
- Amount is mandatory.
- Amount must be greater than zero.
- Expense date is mandatory.

## Out of Scope for MVP

The following are not included yet:

- authentication
- multiple approval levels
- file/receipt uploads
- expense categories
- notifications
- editing an expense after submission
- reopening rejected expenses