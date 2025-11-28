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
