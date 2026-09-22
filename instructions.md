## CREATE PROJECT AND INITIATE GIT

1. create project folder: 
   - Expense-Approval-System

2. initialize Git locally:
   - git init >>> initialise this folder as local git repo
   - git branch -M main >>> current default branch is named "main"
   - git status >>> confirms you are on main branch

## FOLDER STRUCTURE, REQUIREMENTS, GOLDEN SHEET, ARCHITECTURE, FRONTEND/BACKEND BUILD INCLUDING DATABASE AND APIs

3. create the initial project skeleton:
   - mkdir frontend backend requirements docs tests
   
   create these files: 
   - requirements\expense-approval.md
   - docs\domain-invariants.md (GOLDEN SHEET)
   - docs\feature-architecture.md
   - docs\test-automation-architecture.md

4.  FRONTEND SKELETON (we'll continue later)
Create a new Next.js frontend project in frontend folder, using TypeScript, ESLint and the App Router (from project route path, there is no need to cd frontend):
   - npx create-next-app@latest frontend --ts --eslint --app


 5. - BACKEND (we'll do it all now)
    - cd backend
    - npm init -y >>> creates package.json (replace  "type": "commonjs", with  "type": "module",)
    - npm install express cors dotenv >>> installs runtime dependencies
    - npm install --save-dev typescript tsx @types/node @types/express @types/cors >>> installs TypeScript/dev tooling and type definitions
    - npx tsc --init >>> creates tsconfig.json 
     in tsconfig.json chage the below values from true to false:
     "declaration": false,
      "declarationMap": false,
    - npm install better-sqlite3 >>> install sqlite database
    - npm install --save-dev @types/better-sqlite3 >>> installs the TypeScript type definitions for the better-sqlite3 package.

    - then create this files / folders:
    backend/
    ├── src/
    │   ├── server.ts (copy/paste code from chatgpt)
    │   ├── db.ts (copy/paste code from chatgpt)
    │   ├── routes/
    │   ├── services/
    │   ├── models/
    │   └── validators/

    now update backend\package.json scripts with dev and start.

    "scripts": {
    "dev": "tsx watch src/server.ts",
    "start": "tsx src/server.ts"
    }

    - now execute:
      npm run dev

      then open: 
      http://localhost:3001/health

      it should say: {"status":"ok"}

    - update db.ts and create the schema in db.ts >>> db.exec (`CREATE TABLE...copy / paste code from chatgpt) >>> basically it creates the expenses database.
      
      then run again: 
      npm run dev >>> now the SQLite database file should be created in backend

    - install SQLite Viewer VS Code plugin to view backend\expenses.db directly from VS Code

    -   Implement requirement AC-001 — Create expense at backend-database level: create an expense with post /api/expenses.

      You need to define: 
      Model      = what an Expense looks like
      Validator  = is the input valid?
      Service    = do the actual work
      Route      = expose it through the API
      
      create these files: 
      backend/src/models/expense.ts
      (Defines the shape/types of an expense in TypeScript, e.g. fields like id, amount, status)
      it would be these two routes:
      router.post('/'...
      router.get('/:id'...

      
      backend\src\validators\expenseValidator.ts
      (Checks whether incoming expense data is valid, e.g. description present, amount > 0, date present)

      backend/src/services/expenseService.ts
      (Contains the business/data logic, e.g. insert an expense into SQLite and return the created record)
      it would be these two functions:
      export function createExpense...
      export function getExpenseById
      
      backend/src/routes/expenses.ts
      (Defines the HTTP API endpoint, e.g. POST /api/expenses, receives the request, calls validation/service logic, and sends the response)

      These files will be updated several times as we implement requirements (i.e. create expense, submit expense, etc. )

      rerun: npm run dev

      from a second terminal run this curl command:
      curl -X POST http://localhost:3001/api/expenses \
      -H "Content-Type: application/json" \
      -d "{\"employee\":\"Luca\",\"description\":\"Train to client office\",\"amount\":45.50,\"expenseDate\":\"2026-09-21\"}"

      this inject the database with data, you should see:
      {
        "id": 1,
        "employee": "Luca",
        "description": "Train to client office",
        "amount": 45.5,
        "expenseDate": "2026-09-21",
        "status": "DRAFT"
      }

      Now go to expenses.db, refresh the database (top left icon of the viewer) and you will see the updated data.

      you can further test data retrival (the get request in implied in a curl command, while POST / PUT / DELETE must be specified)
      curl http://localhost:3001/api/expenses/1

      and also test something that does not exist to get an error
      curl http://localhost:3001/api/expenses/999

    - implement requirement AC-002 — Submit expense.
    implement the state-transition endpoint POST /api/expenses/:id/submit so a DRAFT expense can become SUBMITTED, while invalid transitions are rejected.

    in backend\src\services\expenseService.ts add:
    export function submitExpense...

    in backend\src\routes\expenses.ts add:
    router.post('/:id/submit'...

    then run curl command:
    curl -X POST http://localhost:3001/api/expenses/1/submit

    where status changes from DRAFTED to SUBMITTED, results below:
    {
    "id": 1,
    "employee": "Luca",
    "description": "Train to client office",
    "amount": 45.5,
    "expenseDate": "2026-09-21",
    "status": "SUBMITTED"
    }

    if you run the same curl command again, you will get an error because only draft expesnses can be submitted and we are already in submitted status:
    $ curl -X POST http://localhost:3001/api/expenses/1/submit
    {"error":"Only DRAFT expenses can be submitted."}

    you can check the status in backend\expenses.db

- implement AC-003 — approve a submitted expense
  in backend\src\services\expenseService.ts add:
  export function approveExpense...

  in backend\src\routes\expenses.ts add:
  router.post('/:id/approve'...

  curl command to test:
  curl -X POST http://localhost:3001/api/expenses/1/approve

  where from submitted the status becomes approved:
  {
  "id": 1,
  "employee": "Luca",
  "description": "Train to client office",
  "amount": 45.5,
  "expenseDate": "2026-09-21",
  "status": "APPROVED"
  }

  if you run the same curl again:
  curl -X POST http://localhost:3001/api/expenses/1/approve
  
   you would have an error because you are already in approved status.
  {"error":"Only SUBMITTED expenses can be approved."}

  you can also check the status in backend\expenses.db


  - implement AC-004 — Reject expense
  where only a submitted expense can be rejected.

  in backend\src\services\expenseService.ts add the function:
  export function rejectExpense...

  in backend\src\routes\expenses.ts add the route:
  router.post('/:id/reject'...

  To test rejection, you need a new expense, because expense 1 done before was already APPROVED but we need a SUBMITTED status to reject.

  This created a new expenses in DRAFTED status:
  curl -X POST http://localhost:3001/api/expenses \
  -H "Content-Type: application/json" \
  -d "{\"employee\":\"Luca\",\"description\":\"Hotel\",\"amount\":120,\"expenseDate\":\"2026-09-22\"}"

  Now we need to submit it so from DRAFTED becomes SUBMITTED status:
  curl -X POST http://localhost:3001/api/expenses/2/submit

  now we can reject from SUBMITTED to REJECTED:
  curl -X POST http://localhost:3001/api/expenses/2/reject

  run the same curl again and you should have an error because it is already in a REJECTED status:
  {"error":"Only SUBMITTED expenses can be rejected."}

  
  6) FRONT END (complete skeleton)
  complete AC-005 — View status. 
  You already have GET /api/expenses/:id, so the backend essentially supports it. This step should now be about exposing that status in the frontend, so we need to go to the Frontend folder and create frontend\app\page.tsx
  
  Then open up another terminal:
  cd frontend
  npm run dev

then in the frontend (http://localhost:3000), while the backend is up and running already (http://localhost:3001/health), I add:
expense: type "1" > click view expense
expense: type "2" > click view expense

and you'll retrieve data from database. 
AC-005 — View status has been implemented successfully.

- The next FRONTEND step is building the actual employee UI to create and submit expenses, so we stop relying on curl for those actions.
So frontend\app\page.tsx will be updated again where the workflow is: Create expense → DRAFT → Submit expense → SUBMITTED

Now test only this flow:

Enter a new employee, description, amount and date.
Click Create Expense.
You should immediately see the new expense with status DRAFT.
Click Submit Expense.
The same card should change to SUBMITTED.
Refresh SQLite Viewer and confirm the database row is also SUBMITTED.

This implements the employee-facing UI for AC-001 (Create expense) + AC-002 (Submit expense) without curl


- The next FRONTEND step is to build the manager UI, so a manager can retrieve a SUBMITTED expense and then Approve or Reject it without using curl.

update frontend/app/page.tsx again so that:

Create new expense
→ Submit Expense
→ status becomes SUBMITTED
→ Approve OR Reject buttons appear
→ choose one
→ status changes accordingly

That completes the manager-facing UI for AC-003 (Approve expense) and AC-004 (Reject expense)

test the UI with two new entries:
Create → DRAFT → Submit → SUBMITTED → Approve → APPROVED
Create → DRAFT → Submit → SUBMITTED → Reject → REJECTED

## CREATE GITHUB REPO AND PUSH FROM LOCAL MACHINE TO REMOTE

- create .gitignore at the project root (it will apply to everything, both frontend and backend).

- Create github repo: 
https://github.com/lucaram/Expense-Approval-System.git

- from project root:
git remote add origin https://github.com/lucaram/Expense-Approval-System.git
(It connects your local Git repository to the remote GitHub repository you just created)

git remote = manage remote repositories
add = add a new remote
origin = the conventional name for your main remote repository
the URL = where that remote repository lives on GitHub

- git remote -v
(shows the remote repositories connected to your local Git repo)

it should show:
origin  https://github.com/lucaram/Expense-Approval-System.git (fetch)
origin  https://github.com/lucaram/Expense-Approval-System.git (push)

origin = the name of the remote github repo
fetch = where Git downloads changes from
push = where Git uploads your commits to
-v = verbose, so it shows the actual URLs

- git status
(shows in which branch you are, currently main, and the untracked files in red)

- git add .
(tages all current changes in the project for the next commit.)

- git commit -m "Initial MVP implementation"
(Creates a local Git snapshot with that message.)

- git push -u origin main
(Uploads your local main branch to GitHub (origin) and links it so future pushes can simply use git push.)