## Overall Flow

Create feature branch for test-automation
        ↓
Test Strategy / Test Plan
        ↓
Testing framework setup
        ↓
Test environment configuration
        ↓
Test data / DB reset strategy
        ↓
Test structure & conventions
        ↓
Requirement / business-rule traceability
        ↓
Manual representative tests
        ↓
Agent customisation
        ↓
Agent-assisted coverage expansion
        ↓
Full regression
        ↓
Test Report
        ↓
CI
        ↓
PR + review
        ↓
Merge to main


## Create feature branch for test-automation

git switch -c feature/test-automation
(create branch and switch to the new branch)

git branch
(verify you are on the branch)

REMEMBER! 
you are in your local laptop test-automation feature branch now. 
If you want to push the changes in github test-automation feature branch you still have to add, commit and push:

git add .
git commit -m "Set up test automation framework"
git push -u origin feature/test-automation 
(after that, from your local laptop feature branch, you can only run: git push)

git switch main
(it switches to main branch)

git switch feature/test-automation
(it switches to test-automation feature branch)

REMEMBER!
BEFORE SWITCHING YOU NEED TO COMMIT YOUR CHANGES TO KEEP THEM IN YOUR FEATURE BRANCHES. IF YOU DON'T, GIT WILL ABORT THE SWITCH TO PROTECT YOUR WORK.

from project root:
git add .
git commit -m "Update test automation configuration"
git switch main


Optionally (not required, just for knowledge), you can keep the changes temporarily without committing:
git stash >>> temporarily hide/save changes
git switch main

then later:
git switch feature/test-automation
git stash pop >>> bring them back


## Create Test Strategy / Test Plan

create docs\test-strategy.md

## Testing framework setup

Three layes:

Unit / Component → Jest + React Testing Library
API              → Playwright APIRequestContext
UI / E2E         → Playwright Test


- Jest + React Testing Library are installed and configured at the **project root**, because both frontend and backend unit tests are managed centrally from there.


npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest @types/react @types/react-dom
(install Jest+React Testing Library)

jest.config.ts 
jest.setup.ts

In package.json, add the script: 
"test:unit": "jest"


then update tsconfig.json to include: "types": ["node", "jest", "@testing-library/jest-dom"]

Because Jest is running from the project root rather than inside the Next.js application, install Babel support:
npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-typescript @babel/preset-react

create babel.config.cjs
(Babel transforms TypeScript, TSX and JSX into JavaScript that Jest can execute.
When Jest was originally inside frontend, Next.js handled this automatically through next/jest. Now that Jest runs from the project root as standalone Jest, Babel must be configured explicitly)

Create your first Jest test:
tests\unit\smoke.test.ts (just temporary, to prove 1+1 = 2)

Execute the jest test from frontend folder to make sure it works:
npm run test:unit

for better Jest reporting install:
npm install --save-dev jest-html-reporter

then in jest.config.ts add reporters

and in package.json add this script for the coverage: 
"test:unit:coverage": "jest --coverage"

in project root, under test-results, you will now see:
unit-test-report.html (handy and much easier to read).
coverage folder (no need to dig into this)

- Playwright can cover both API and UI/E2E, I’d set that up at the repository root so the shared tests/ folder can contain both API and UI automation.

from Desktop/Expense-Approval-System (feature/test-automation):

npm init -y
(it creates package.json)

npm install --save-dev @playwright/test typescript
(it installs Playwright typescript)

npx playwright install
(it installs the browser binaries)

npm install --save-dev @types/node
(it installs Node.js TypeScript definitions)

install the Playwright extension for VS Code if you don't have it

Create the file: Expense-Approval-System/playwright.config.ts
(it  tells Playwright where the tests live, how to run them, what browser to use, and what evidence to capture on failures.)

now create the file: tsconfig.json
(it tells TypeScript how to understand and check your TypeScript code)

Now update package.json for:
type: "module"
some useful playwright scripts

verify playwright is installed:
npx playwright --version

this list how many tests you have (at the moment, zero):
npx playwright test --list

## test environment configuration

This is done just for Playwright (API/UI), not for Jest (unit test, so run locally)

in root project, create this file: 
.env.test
(environment variables specifically for the test environment, if you use .env is for all environments for the whole application)

in project root install:
npm install --save-dev dotenv

then update playwright.config.ts so that env variables can be used.

## Test data / DB reset strategy

Our goal is:

Development → backend/expenses.db >>> which we already have
Testing     → backend/expenses-test.db >>> which we need to create

so automated tests never modify your normal development data.

update backend\src\db.ts where: 
const databasePath = process.env.DB_PATH || 'expenses.db'; 
(it means: If DB_PATH is provided → use that database, otherwise use expenses.db)

then update .env.test with the environment variable for your new test database:
DB_PATH=expenses-test.db

Next, we should add the DB reset mechanism so automated tests can start from a clean state.

Create: backend/src/resetTestDb.ts

then add this script in backend/package.json: 
"reset:test-db": "tsx src/resetTestDb.ts"

from backend folder run:
DB_PATH=expenses-test.db npm run reset:test-db

it should say: Test database reset complete.
it should create: backend/expenses-test.db with 0 rows.

To ignore the test database in git, in project root .gitignore, add: 
backend/expenses-test.db

## Test structure & conventions
Remember: I have centralised Jest at project root so previous intructions for Jest in frontend needs to be modified slightly.

Create this structure:

Expense-Approval-System/
├── tests/
│   ├── API/
│   │
│   ├── UI/
│   │
│   ├── UNIT/
│   │   ├── backend/
│   │   │   
│   │   └── frontend/
│   │      
│   └── various/
│       ├── test-data/
│       └── utils/


Good conventions to use:

- Unit:  *.test.ts / *.test.tsx 
(.ts for pure TypeScript logic, .tsx when the test renders React/JSX components)
- API:   *.api.spec.ts
- UI:    *.ui.spec.ts

Good practice to follow:

- each test should have a clear business-focused name
- tests should create their own required data where possible
- tests should not depend on another test having already run
- use reusable helpers rather than duplicating setup
- API tests validate backend rules directly
- UI tests focus on complete user workflows
- use stable Playwright locators such as getByRole() and getByLabel()
- no arbitrary waitForTimeout()
- keep test data deterministic
- keep API and UI tests separate


## Requirement / business-rule traceability

create docs\test-traceability.md

# Test Traceability — Expense Approval System

| Requirement / Rule | Description | Planned Test Layer | Test Reference |
|---|---|---|---|
| AC-001 | Create expense | API + UI | TBD |
| AC-002 | Submit expense | API + UI | TBD |
| AC-003 | Approve expense | API + UI | TBD |
| AC-004 | Reject expense | API + UI | TBD |
| AC-005 | View status | API + UI | TBD |
| BR-001 | Expense amount must be positive | Unit + API | TBD |
| BR-002 | Draft is the initial status | Unit + API | TBD |
| BR-003 | Only submitted expenses can be approved | Unit + API | TBD |
| BR-004 | Only submitted expenses can be rejected | Unit + API | TBD |
| BR-005 | Approved and rejected expenses are terminal | Unit + API | TBD |
| BR-006 | Required fields must be present | Unit + API | TBD |
| BR-007 | Status transitions must be valid | Unit + API | TBD |

For now, keep Automation Test Reference as TBD. 
Once we create the manual representative tests, we’ll replace those with real file/test names.

## Manual representative tests

Let's create a small number of tests by hand first:

- two Jest unit tests >>> from root: npm run test:unit
- two Playwright API test >>> from root: npm run test:api
- two Playwright UI/E2E test >>> from root: npm run test:ui

from frontend folder: npm run dev
from backend folder: DB_PATH=expenses-test.db npm run dev (it uses test.DB)



1) JEST FOR UNIT TESTING

- Let's create a BACKEND UNIT TEST (.ts)
The best first unit-test target is the expense validation logic in:
backend\src\validators\expenseValidator.ts

That lets us test BR-001 and BR-006 without involving HTTP, SQLite, or the UI.

BR-001 — Expense amount must be positive
An expense claim must have an amount greater than zero.

BR-006 — Required fields must be present
An expense claim cannot be created without:
description
amount
expense date

Create:
tests/UNIT/backend/expenseValidator.test.ts

now run it: 
npm run test:unit

- Now let's do a FRONTEND UNIT TEST (.tsx)
Verify that the Create Expense UI correctly:
renders the main page heading
renders the create expense form

Create tests\UNIT\frontend\page.test.tsx

not run it: 
npm run test:unit




2) PLAYWRIGHT FOR API TESTING

Start with one representative Playwright API test for the most important happy-path flow:

Create expense
→ verify DRAFT
→ submit expense
→ verify SUBMITTED
→ approve expense
→ verify APPROVED

Use your existing backend URL from .env.test:
API_BASE_URL=http://localhost:3001

now stop the original backend server. 

From backend folder, make sure the backend server is running using the test database (already set in .env.test)
DB_PATH=expenses-test.db npm run dev

create positive tests to verify the above mentioned flow (it creates 1 entry in test-DB)
tests\API\expense-lifecycle.api.spec.ts

create negative tests to prove you cannot approve a DRAFT status or an already APPROVED status (it creates 2 entries in test-DB)
tests\API\expense-invalid-transition.api.spec.ts

Then from the project root run:
npm run test:api

REMEMBER!
With the positive tests you create a new expense, so every time that test you add an expense into the test database.

Overtime you may need to reset the data from the backend folder:
DB_PATH=expenses-test.db npm run reset:test-db
(this command runs the existing script: backend/src/resetTestDb.ts, which reset the test DB)

If you want to wire that reset into the API test command, so every run starts from a clean database, do this:
in project root: npm install --save-dev cross-env
(Use cross-env so the script works reliably on Windows)

in project root package.json, update the existing "test:api" script with this:
"test:api": "cd backend && cross-env DB_PATH=expenses-test.db npm run reset:test-db && cd .. && playwright test tests/API"

then from the project root run:
npm run test:api

it will do:
1. reset backend/expenses-test.db
2. return to project root
3. run all Playwright API tests



3)PLAYWRIGHT FOR UI TESTING

For the manual representative UI test, start with one end-to-end happy path:

Create expense
→ verify DRAFT
→ Submit
→ verify SUBMITTED
→ Approve
→ verify APPROVED

create this positive test to validate the flow draft > submitted > approved
tests/UI/expense-lifecycle.ui.spec.ts

create this negative test (missing description shows an error)
tests\UI\expense-validation.ui.spec.ts

from project root execute the UI test:
npm run test:ui

similarly to API test, in root package.json update the UI script to:
"test:ui": "cd backend && cross-env DB_PATH=expenses-test.db npm run reset:test-db && cd .. && playwright test tests/UI"

it will do:
1. reset backend/expenses-test.db
2. return to project root
3. run all Playwright UI tests