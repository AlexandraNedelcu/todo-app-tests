# Todo App – Full Stack (React + Node.js)

This is a full-stack Todo application with:
- Frontend: React (Vite) + Playwright tests
- Backend: Node.js + Express + Jest/Supertest tests
- CI: GitHub Actions for test automation
- Code coverage (backend)
- Visual snapshots for UI tests

## Project Structure
```
todo-app/
│
├── frontend/ # React app (Vite)
│ └── tests/ # UI automation with Playwright
│
├── backend/ # Express API
│ └── tests/ # API tests with Supertest + Jest
│
├── .github/workflows/
│ └── test.yml # GitHub Actions CI config
│
└── README.md # This file
```

## Local Setup Instructions

### 1. Clone the repository
```
git clone https://github.com/AlexandraNedelcu/todo-app-tests.git
cd todo-app
```

### 2. Run Backend (API)
```
cd backend
npm install
npm start
```

Backend will run at **http://localhost:4000**

### 3. Run Frontend (UI)
Open new terminal:
```
cd frontend
npm install
npm run dev
```

Frontend will run at **http://localhost:5173**

## Run Tests

### 1. API Tests (backend)
```
cd backend
npm test                 # Run tests
npm test -- --coverage   # Run with code coverage
```

### 2. UI Tests (frontend)
```
cd frontend
npx playwright install     # Only once
npx playwright test        # Run UI tests
```

Failed UI tests will generate screenshots and video under:
```
frontend/test-results/
```

## GitHub Actions (CI)

- All tests run automatically on every push or pull request to main
- Failed UI test artifacts (screenshots, video) are saved for inspection
- You can find CI status in the GitHub "Actions" tab

## Code Coverage
- API coverage is generated via Jest
