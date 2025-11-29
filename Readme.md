# VenderMart — Textile Marketplace (backend + frontend)

**VenderMart** is a lightweight marketplace web app for textile vendors and administrators. It includes a Node/Express backend (Sequelize ORM) and a React + Vite frontend with Tailwind CSS utilities. This README explains how to set up, run, and contribute to the project locally.

**Quick Links**

- **Backend**: `backend/`
- **Frontend**: `frontend/`

**Requirements**

- Node.js (>= 18 recommended)
- npm (or yarn)
- Windows PowerShell (example commands provided for this environment)

**Status**

- Development-ready: contains authentication (JWT), role-based routes (admin/vendor), product upload support, and seeded demo accounts.

**Seeded demo credentials**

- Admin: `username: admin` / `password: admin123`
- Vendor: `email: vendor@test.com` / `password: vendor123`

**Repository layout**

- `backend/` — Express server, controllers, routes, models, middleware, and DB init script.
- `frontend/` — Vite + React app, Tailwind styles, pages, and hooks.
- `database/` — SQL / initialization artifacts.

**Environment variables**
Create a `.env` file inside the `backend/` folder (example keys):

```
JWT_SECRET=your_super_secret_key_here
PORT=5000
UPLOAD_DIR=uploads
# any DB-related vars if you swap to another DB
```

Make sure `JWT_SECRET` is set — the backend will refuse to start without it.

**Setup & Run (local development)**

1. Backend

Open PowerShell and run:

```powershell
cd backend
npm install
# initialize DB (seeds admin, vendor, categories)
npm run init:db
# start dev server (nodemon)
npm run dev
```

2. Frontend

Open a second terminal and run:

```powershell
cd frontend
npm install
npm run dev
```

By default the backend serves API at `http://localhost:5000/api` and the frontend Vite dev server runs on a local port (commonly `5173`/`5174`).

**Database initialization**

- The project includes `backend/scripts/initDB.js` which syncs models and seeds an admin and vendor account plus a few categories. Run `npm run init:db` from the `backend` directory.

**API overview (selected endpoints)**

- Authentication

  - `POST /api/auth/vendor/register` — register vendor (body: `business_name, email, password, phone`)
  - `POST /api/auth/vendor/login` — vendor login (body: `email, password`) → returns JWT and `user` object
  - `POST /api/auth/admin/login` — admin login (body: `username, password`) — also accepts email in the `username` field; returns JWT and `user`

- Categories

  - `GET /api/categories` — public list of categories (no auth required)

- Products

  - `POST /api/products` — create product (vendor auth required; multipart/form-data for images)
  - `GET /api/products` — list products (various listing endpoints exist in controllers)

- Uploads
  - `POST /api/upload` — file upload helper (used by product creation)

Note: Admin-only endpoints are under `/api/admin/*` and require a valid admin JWT.

**Frontend**

- The frontend uses Axios with an interceptor that attaches `Authorization: Bearer <token>` from `localStorage`. The base URL is set in `frontend/src/utils/constants.js`:

```
export const API_BASE_URL = 'http://localhost:5000/api';
```

Auth state is managed in `frontend/src/context/AuthContext.jsx`. Use the Login page to authenticate as a vendor or admin. After login the token is stored in `localStorage` and used automatically by the frontend.

**Common issues & troubleshooting**

- JWT_SECRET missing: backend will log `JWT_SECRET not found` and exit — ensure `backend/.env` exists and has `JWT_SECRET`.
- 401 Unauthorized on admin endpoints: ensure you are calling admin endpoints with the admin token and that the user role is `admin`.
- 403 Forbidden on admin endpoints: those routes enforce role checks; use admin login and include the token.
- 500 on multipart uploads: do not set `Content-Type` manually when sending `FormData` from the frontend — let Axios set the boundary. (`frontend` already avoids setting this header in `useProducts`.)
- CORS: backend uses permissive CORS for development; adjust `server.js` if you need stricter policies.

**Development notes**

- To inspect or re-seed demo data: run `npm run init:db` from `backend/`. It will sync models and create demo admin/vendor if none exist.
- Models are in `backend/models/` (Admin, Vendor, Product, Category, ProductImage). Controllers are in `backend/controllers/` and routes in `backend/routes/`.
- Auth middleware is in `backend/middleware/auth.js` — it validates JWTs and enforces role-based access.

**Contributing**

- Fork the repo, create a feature branch, and open a PR. Keep changes focused and document DB migrations or model changes.

**License**

- This project doesn't include a license file by default. Add a `LICENSE` if you plan to open-source it.

---
