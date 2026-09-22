# Domain Invariants

These are non-negotiable business rules that must remain true regardless of implementation.

## BR-001 — Expense amount must be positive

An expense claim must have an amount greater than zero.

## BR-002 — Draft is the initial status

A newly created expense claim must always start in `DRAFT` status.

## BR-003 — Only submitted expenses can be approved

An expense claim can transition to `APPROVED` only from `SUBMITTED`.

## BR-004 — Only submitted expenses can be rejected

An expense claim can transition to `REJECTED` only from `SUBMITTED`.

## BR-005 — Approved and rejected expenses are terminal

Once an expense reaches `APPROVED` or `REJECTED`, its status must not change again within the MVP.

## BR-006 — Required fields must be present

An expense claim cannot be created without:

- description
- amount
- expense date

## BR-007 — Status transitions must be valid

Allowed transitions are:
- From `DRAFT`, the only allowed next status is `SUBMITTED`.
- From `SUBMITTED`, the allowed next statuses are `APPROVED` or `REJECTED`.
- `APPROVED` is a terminal status and cannot transition to another status.
- `REJECTED` is a terminal status and cannot transition to another status.
- No other status transitions are allowed.