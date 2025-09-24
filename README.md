My Web – Storefront, Admin, and API Monorepo

This repository contains a complete e‑commerce stack:

- A customer‑facing storefront built with React (Create React App)
- An admin dashboard built with React + Vite
- A Node.js/Express API with MongoDB (Mongoose)

Everything is organized as npm workspaces to make setup, development, and deployments straightforward.

What We Fixed/Improved from the Original Repo

- Converted the project into a clean monorepo with npm workspaces.
- Moved hard‑coded secrets (Mongo URI, JWT secret) into environment variables.
- Added centralized error handling in the API for consistent JSON responses.
- Secured authentication by hashing passwords with bcrypt.
- Standardized API responses in cart/product routes and improved product queries.
- Added `.gitignore`, `.editorconfig`, and Prettier config for consistent formatting.
- Added a root README and clarified scripts across workspaces.
- Added CI workflow to install and build web apps.
- Kept uploads out of version control while preserving folder structure with `.gitkeep`.
- Configured CRA proxy to the API and aligned the frontend to React 18 for compatibility.

Features & Functionality

- Storefront (CRA)
  - Category pages, product detail pages, cart and checkout views
  - Client‑side routing via `react-router-dom`
- Admin (Vite)
  - Add and list products, manage images via upload endpoint
  - Simple admin login page and protected actions (via API)
- Backend API (Express + MongoDB)
  - Products: list, new collections, popular in women, add/remove products
  - Auth: signup/login with JWT, password hashing (bcrypt)
  - Cart: add/remove items, fetch cart state for the authenticated user
  - Image uploads via Multer to `backend/uploads/images`

Project Structure (High‑Level)

- `backend/`
  - `index.js` – Express app entrypoint, routes, error handler, CORS
  - `config/database.js` – MongoDB connection
  - `middleware/auth.js` – JWT verification middleware
  - `routes/` – Route modules: `products.js`, `auth.js`, `cart.js`, `upload.js`
  - `models/` – Mongoose models (`Product.js`, `User.js`)
  - `uploads/images/` – Image upload target (ignored in Git)
- `frontend/` (CRA)
  - `src/` – React app code (components, pages, context)
  - `package.json` – CRA scripts, proxy to API
- `admin/` (Vite)
  - `src/` – Admin UI code (components, pages)
  - `vite.config.js` – Vite configuration
- Root
  - `package.json` – npm workspaces and convenience scripts
  - `.gitignore`, `.editorconfig`, `.prettierrc` – Repo hygiene and formatting
  - `.github/workflows/ci.yml` – Basic CI workflow (install + build web apps)

Installation & Setup
Prerequisites

- Node.js 18+
- A MongoDB connection string (MongoDB Atlas or local MongoDB)

Steps

1. Install dependencies at the root:

```bash
npm install
```

2. Create the API environment file at `backend/.env`:

```bash
PORT=4000
MONGODB_URI=your-mongodb-uri-here
JWT_SECRET=your-secret-here
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:5173
PUBLIC_BASE_URL=http://localhost:4000
```

3. Start each app in separate terminals (recommended during development):

```bash
# API (Express)
npm run start -w backend

# Storefront (CRA)
npm run start -w frontend

# Admin (Vite)
npm run dev -w admin
```

4. Open the apps:

- Storefront: http://localhost:3000
- Admin: http://localhost:5173
- API Health: http://localhost:4000 ("Express app is working")

Usage Examples

- Signup/login to get a JWT, then interact with cart endpoints.
- Add products via the admin UI; images are uploaded to the API and served from `/images/...`.
- In the storefront, browsing categories and adding to cart will call the API via the CRA dev proxy.

Common API Endpoints (Development)

- `POST /signup` – register user (name, email, password)
- `POST /login` – authenticate, returns `{ token }`
- `GET /allproducts` – list products
- `GET /newcollections` – newest products
- `GET /popularinwomen` – top products in women category
- `POST /addproduct` – create product (admin)
- `POST /removeproduct` – delete product (admin)
- `POST /addtocart` – add item to user cart (requires `auth-token`)
- `POST /removefromcart` – remove item from user cart (requires `auth-token`)
- `GET /getcart` – fetch authenticated user cart
- `POST /upload` – upload product image (admin)

Contributing

- Open an issue describing the change you propose.
- For features/bugfixes, create a branch from `main`, keep edits focused and well‑documented.
- Follow the existing code style; Prettier/EditorConfig are configured.
- Add or update documentation/tests when relevant.
- Open a PR with a clear description and screenshots/logs where helpful.

License
This project is currently unlicensed. If open-sourcing, we recommend using the MIT License.
To apply, create a LICENSE file in the root with the MIT text.
