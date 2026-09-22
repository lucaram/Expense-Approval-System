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

remember: you are in your local laptop test-automation feature branch now. If you want to push the changes in github test-automation feature branch you still have to add, commit and push:

git add .
git commit -m "Set up test automation framework"
git push -u origin feature/test-automation 
(after that, from your local laptop feature branch, you can only run git push)

## Create Test Strategy / Test Plan

create docs\test-strategy.md

## Testing framework setup

Three layes:

Unit / Component → Jest + React Testing Library
API              → Playwright APIRequestContext
UI / E2E         → Playwright Test


- Jest + React Testing Library cover unit testing, install them inside frontend because component tests belong to the Next/React application.

from Desktop/Expense-Approval-System (feature/test-automation):
cd frontend
(changes to frontend directory)

npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
(install Jest+React Testing Library)

Create these files: 
frontend/jest.config.ts 
frontend/jest.setup.ts

In frontend/package.json, add the script: 
"test": "jest" 

Then from the frontend folder install:
npm install --save-dev @types/jest
(it installs the jest type definitions)

then update frontend\tsconfig.json to include: "types": ["node", "jest"], which we have just installed in previous step.

Create your first Jest test:
frontend\tests\unit\smoke.test.ts

Execute the jest test from frontend folder to make sure it works:
npm test

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