# Test Traceability — Expense Approval System

| Requirement / Rule | Description | Planned Test Layer | Test Reference | Coverage |
|---|---|---|---|---|
| AC-001 | Create expense | API + UI | `tests/API/expense-lifecycle.api.spec.ts`; `tests/UI/expense-lifecycle.ui.spec.ts` | Covered |
| AC-002 | Submit expense | API + UI | `tests/API/expense-lifecycle.api.spec.ts`; `tests/UI/expense-lifecycle.ui.spec.ts` | Covered |
| AC-003 | Approve expense | API + UI | `tests/API/expense-lifecycle.api.spec.ts`; `tests/UI/expense-lifecycle.ui.spec.ts` | Covered |
| AC-004 | Reject expense | API + UI | `tests/API/expense-lifecycle.api.spec.ts`; `tests/UI/expense-lifecycle.ui.spec.ts` | Covered — API and UI rejection workflows are both covered |
| AC-005 | View status | API + UI | `tests/API/expense-lifecycle.api.spec.ts`; `tests/UI/expense-lifecycle.ui.spec.ts` | Covered — API status retrieval and UI status display are both covered for a submitted expense |
| BR-001 | Expense amount must be positive | Unit + API | `tests/UNIT/backend/expenseValidator.test.ts`; `tests/API/expense-lifecycle.api.spec.ts` | Covered — zero and negative amounts are rejected at both unit and API levels |
| BR-002 | Draft is the initial status | API | `tests/API/expense-lifecycle.api.spec.ts`; `tests/UI/expense-lifecycle.ui.spec.ts` | Covered — newly created expenses start in `DRAFT`; the initial status is verified through the API and displayed in the UI |
| BR-003 | Only submitted expenses can be approved | API | `tests/API/expense-invalid-transition.api.spec.ts` | Covered — approval from `DRAFT`, `APPROVED`, and `REJECTED` is rejected; valid approval from `SUBMITTED` is covered by the lifecycle API flow |
| BR-004 | Only submitted expenses can be rejected | API | `tests/API/expense-lifecycle.api.spec.ts`; `tests/API/expense-invalid-transition.api.spec.ts` | Covered — valid `SUBMITTED → REJECTED` is covered and rejection from `DRAFT`, `APPROVED`, and `REJECTED` is rejected |
| BR-005 | Approved and rejected expenses are terminal | API | `tests/API/expense-invalid-transition.api.spec.ts` | Covered — `APPROVED` and `REJECTED` expenses reject further approve and reject transitions |
| BR-006 | Required fields must be present | Unit + API | `tests/UNIT/backend/expenseValidator.test.ts`; `tests/API/expense-lifecycle.api.spec.ts`; `tests/UI/expense-validation.ui.spec.ts` | Covered — all four required fields are validated at unit and API levels; description validation is also covered in the UI |
| BR-007 | Status transitions must be valid | API | `tests/API/expense-lifecycle.api.spec.ts`; `tests/API/expense-invalid-transition.api.spec.ts` | Covered — documented valid transitions and invalid submit, approve, and reject transitions are covered at API level |