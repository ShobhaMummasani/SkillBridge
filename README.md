# SkillBridge: Full-Stack Career Portal

Capstone project — LaunchED Global internship.

## What is already built (working scaffold)

**Backend** (`/backend` — Node.js, Express, TypeScript, MongoDB + Mongoose, JWT, bcrypt)
- Register / Login with hashed passwords and JWT (`/api/auth`)
- Role-based access: `student` and `recruiter` (`middleware/auth.ts`)
- Jobs: create, edit, delete, list with search + location + type filter + pagination (`/api/jobs`)
- Applications: student applies, recruiter views applicants and updates status (`/api/applications`)
- Profile: view/update bio and resume link (`/api/users`)

**Frontend** (`/frontend` — React + TypeScript + Vite + Tailwind CSS v4 + React Router)
- Login / Register pages with role choice
- Jobs list with search, location, type filter, pagination
- Job detail page with an apply form (student only)
- Student dashboard: my applications with status
- Recruiter dashboard: my postings, view applicants, change status
- Post-a-job form (recruiter only)
- Profile page
- Dark mode toggle, responsive layout

Both projects compile with **zero TypeScript errors** and `npm run build` succeeds on both.

## How to run it

### 1. MongoDB
Create a free cluster at https://www.mongodb.com/cloud/atlas (takes 5 minutes), or run MongoDB locally.
Copy the connection string.

### 2. Backend
```
cd backend
cp .env.example .env
# edit .env: paste your MONGO_URI, set a JWT_SECRET (any long random string)
npm install
npm run dev
```
Runs on http://localhost:5000

### 3. Frontend
```
cd frontend
cp .env.example .env   # already points to localhost:5000/api
npm install
npm run dev
```
Runs on http://localhost:5173

## What's intentionally left out (given the 2-day timeline)

- Separate admin dashboard — merged into the recruiter dashboard
- Docker + GitHub Actions CI/CD — deploy manually instead (see plan below)
- Figma file — a quick hand-sketch/Excalidraw wireframe is enough for the report
- Resume file upload — using a resume **link** (Google Drive) instead of file storage, to avoid setting up S3/Cloudinary under time pressure

## 2-day build & submission plan

See `PLAN.md` in this folder.
