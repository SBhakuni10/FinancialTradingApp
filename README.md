
# Financial Trading App (Mini Project)

A simplified trading platform demo built with the MERN stack.  
It includes authentication, KYC, product listing (stocks & mutual funds), portfolio tracking, and transaction history.

---

## 🚀 Features
- Register & Login (JWT auth)
- Submit KYC details on signup
- View available investment products
- Buy / Sell products → portfolio updates
- Portfolio summary (invested vs current value)
- Transaction history
- Admin (optional) → add/remove products

---

## 🛠️ Tech Stack
- **Frontend**: React + Tailwind
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT + bcrypt

---

## 📂 Repo Structure
financial-app/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   ├── redis.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── transactionController.js
│   │   ├── portfolioController.js
│   │   ├── watchlistController.js
│   │   ├── adminController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Transaction.js
│   │   ├── Watchlist.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── portfolioRoutes.js
│   │   ├── watchlistRoutes.js
│   │   ├── adminRoutes.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── uploads/               # Dummy KYC uploads
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── logo.png
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── assets/styles.css
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── PrivateRoute.jsx
│       │   ├── FileUploader.jsx
│       │   └── ChartComponent.jsx
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   ├── KYC.jsx
│       │   ├── Dashboard.jsx
│       │   ├── ProductList.jsx
│       │   ├── ProductDetail.jsx
│       │   ├── Portfolio.jsx
│       │   ├── Watchlist.jsx
│       │   ├── AdminDashboard.jsx
│       │   └── NotFound.jsx
│       ├── context/AuthContext.jsx
│       └── utils/api.js
│   ├── .env.example
│   └── package.json
│
├── README.md
├── API.md
└── .gitignore


# API.md (save to repo root)
```markdown
# API Documentation

Base URL (local): `http://localhost:4000/api`

## Auth
### POST /api/auth/register
- Body:
```json
{ "name": "Alice", "email": "alice@example.com", "password": "pass123" }

### POST /api/auth/login
- Body:
```json
{ "email": "alice@example.com", "password": "pass123" }
````Response: 200 OK, returns token.

#Users
### GET /api/users/profile
```Returns logged-in user profile.

#Products
### GET /api/products
```Returns paginated products.

### GET /api/products/:id
```Returns detailed product.

### POST /api/products
```Creates product.

### PUT /api/products/:id
```Updates product.

### DELETE /api/products/:id

