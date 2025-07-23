## Project Structure
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


## Local Setup Instructions

### 1. Run Backend (API)
```
cd backend
npm install
npm start
```

Backend will run at http://localhost:4000

### 2. Run Frontend (UI)
Open new terminal:
```
cd frontend
npm install
npm run dev
```

Frontend will run at http://localhost:5173


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

Failed UI tests will generate screenshots and video under: frontend/test-results/