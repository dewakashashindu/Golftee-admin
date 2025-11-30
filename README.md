
# GolfTee Admin Portal

This repository contains the Next.js frontend (App Router) and a lightweight Node/Express backend.

Overview:

- Frontend: Next.js app in the repository root (app directory).
- Backend: Express server in `backend/` (uses Prisma + SQLite by default in this branch).

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm (bundled with Node) or yarn/pnpm

## Quick start (development)

### 1) Start the backend

Open a PowerShell terminal and run:

```powershell
cd C:\Users\ggnpi\GolfTee_adminportal\backend
copy .env.example .env  # then edit .env if you need to set secrets
npm install
# If you changed Prisma schema or first-time setup:
npx prisma generate
npx prisma migrate dev --name init  # will create sqlite dev.db when DATABASE_URL=file:./dev.db
npm run dev
```

By default the backend listens on `http://localhost:4000` and exposes routes under `/api/*`.

### 2) Start the frontend (Next.js)

Open a second terminal and run:

```powershell
cd C:\Users\ggnpi\GolfTee_adminportal
npm install
npm run dev
```

Frontend dev server will start at `http://localhost:3000` and the Next config in this workspace rewrites `/api/*` to the backend during development.

## Environment variables

- `backend/.env.example` contains example variables. Copy to `backend/.env` and fill:
  - `DATABASE_URL` — for local dev use `file:./dev.db` (SQLite)
  - `JWT_SECRET` — a secret string used for signing JWTs
  - Optional Supabase keys: `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (do not commit service role keys)

## Useful commands

- Frontend dev: `npm run dev` (in repo root)
- Backend dev: `npm run dev` (in `backend/`)
- Run Prisma migrations: `npx prisma migrate dev` (in `backend/`)

## Testing / Smoke checks

- Backend health: `GET http://localhost:4000/api/health` → returns JSON status
- Bookings API: `GET http://localhost:4000/api/bookings` → returns bookings JSON
- Frontend pages: `http://localhost:3000/bookings`, `/analytics`, `/notifications` — should render in dev

## Notes

- The repository includes Prisma schema and a migration in `backend/prisma/migrations/` so other developers can recreate the DB.
- `.env` and `backend/dev.db` are ignored by git — keep secrets out of the repo.

If you want, I can add a `Makefile`/PowerShell script to automate these steps or create a `backend/README.md` with the same instructions.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
