# GolfTee Backend (Example)

This is a minimal Express backend scaffold to support the `GolfTee_adminportal` frontend. It's intentionally small and uses in-memory storage for demo/development purposes.

Features:
- CORS enabled so frontend dev server (e.g. Next.js) can call this backend
- Demo endpoints: auth (signup/login), bookings, events, notifications, analytics, members

Not for production: passwords are stored in-memory and unhashed — replace with a real DB and proper auth for production.

Quick start

1. From repository root:

```powershell
cd GolfTee_adminportal/backend
npm install
npm run dev
```

2. Access:
- Health: `GET http://localhost:4000/api/health`
- Login: `POST http://localhost:4000/api/auth/login` (body: `{ "username": "u", "password": "p" }`)
- Signup: `POST http://localhost:4000/api/auth/signup` (body: `{ "username": "u", "password": "p", "email": "e" }`)

Update your frontend `.env.local` to point to the backend during development:

```
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Notes
- If you are running locally the backend uses Prisma with a SQLite DB by default. The `DATABASE_URL` is set in `backend/.env` and points at `prisma/dev.db`.
- On `npm install` the project runs `prisma generate` (via `postinstall`) to ensure the Prisma client is available.
- If you prefer to use Supabase instead, set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `backend/.env` (do not commit service keys publicly).
 - If you prefer to use Supabase instead, set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `backend/.env` (do not commit service keys publicly).

Local DB and seeding
- The backend uses Prisma with a local SQLite DB by default (`prisma/dev.db`).
- To create tables on the configured `DATABASE_URL` and generate the Prisma client:

```powershell
cd backend
npm install
npm run prisma:generate   # generates Prisma client
npm run prisma:push       # push schema to the database (creates tables)
```

- To populate the DB with example data for local development run:

```powershell
npm run seed
```

Switching to Supabase Postgres
- To switch to your Supabase Postgres DB, update `backend/.env` with the Postgres connection string (e.g. `DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.<project>.supabase.co:5432/postgres`) and run `npm run prisma:push` to create tables remotely. Consider creating proper migrations for production usage.
