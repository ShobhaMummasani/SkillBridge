# 2-Day Plan for SkillBridge

Deadline in your guidelines: 10th Sept 2026. Follow this order — don't skip ahead.

## Day 1 — Get it running and working end-to-end

**Step 1: MongoDB setup (30 min)**
- Make a free MongoDB Atlas cluster.
- Create a database user, allow access from anywhere (0.0.0.0/0) for now.
- Copy the connection string into `backend/.env` as `MONGO_URI`.

**Step 2: Run the backend (30 min)**
- `cd backend && npm install && npm run dev`
- Test with a tool like Postman or Thunder Client (VS Code extension):
  - POST `/api/auth/register` with a student account
  - POST `/api/auth/register` with a recruiter account
  - Copy the recruiter's token, POST `/api/jobs` to create 2-3 sample jobs
  - GET `/api/jobs` to confirm they show up
- If something breaks, read the error message fully before asking for help — 90% of the time it's a typo in `.env` or a missing `await`.

**Step 3: Run the frontend and connect it (1-2 hrs)**
- `cd frontend && npm install && npm run dev`
- Register a student and a recruiter through the UI.
- Post a job as recruiter, apply to it as student.
- Fix any bugs you hit — this is the most important step, because it proves auth + jobs + applications all talk to each other correctly.

**Step 4: Polish the UI you actually have (rest of Day 1)**
- Add 5-6 realistic sample jobs (different titles/companies/skills) so the demo doesn't look empty.
- Check every page on a phone-sized browser window (F12 → responsive mode) — the layout is built mobile-friendly already, just verify.
- Try the dark mode toggle.

## Day 2 — Deploy, document, record

**Step 5: Deploy backend (1 hr)**
- Push `backend/` to a GitHub repo.
- Deploy to Render.com (free tier) — connect the GitHub repo, set build command `npm install && npm run build`, start command `npm start`, and add your `MONGO_URI` and `JWT_SECRET` as environment variables there.

**Step 6: Deploy frontend (30 min)**
- Push `frontend/` to GitHub (same repo or separate folder).
- Deploy to Vercel — set the environment variable `VITE_API_URL` to your deployed backend URL + `/api`.

**Step 7: Test the live version (30 min)**
- Repeat Step 3's test flow but on the live URLs. Fix any CORS or env-var mistakes now, while you still have a day.

**Step 8: Write the short report + README (1-1.5 hrs)**
- Problem statement, tech stack, architecture diagram (a simple boxes-and-arrows sketch is fine), features, challenges you hit and how you fixed them, learning outcomes.
- Use the README.md already in this project as your base — expand each bullet into a paragraph.

**Step 9: Record the demo video (1-1.5 hrs)**
- Follow LaunchED's structure: English intro (name, college, course, year, internship domain, project title) → walkthrough in your own words (problem, tools, architecture, features, live demo, challenges, results) → keep it 5-10 minutes.
- Script the walkthrough in 5-6 bullet points before recording so you don't ramble.

**Step 10: Submit (30 min)**
- Upload code + docs to Google Drive folder, set "Anyone with the link can view."
- Upload video to Drive with the same permission, and post it on LinkedIn tagging LaunchED and your HOD.
- Fill the final Google Form with both links.

## If you run out of time — cut in this order
1. Skip dark mode polish — it already works, don't spend more time on it.
2. Skip deploying to a custom domain — the free Vercel/Render URLs are fine.
3. If MongoDB Atlas setup fights you, that's the one thing to ask for help with immediately — don't lose hours on it alone.
