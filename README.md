# Project SA – 1st Movie 🎬
Full-stack auth forms connected to MongoDB Atlas.

## Stack
- **Frontend**: HTML, CSS, Vanilla JS
- **Backend**: Node.js + Express
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT + bcryptjs
- **Email**: Nodemailer (password reset)

---

## Folder Structure
```
project-sa-fullstack/
├── index.html              ← Landing page
├── css/style.css           ← Shared styles
├── js/form-validation.js   ← API helpers + validation utils
├── pages/
│   ├── login.html
│   ├── signup.html
│   ├── reset-password.html
│   ├── new-password.html   ← Used after clicking reset email link
│   └── link-account.html
└── server/
    ├── index.js            ← Express entry point
    ├── .env.example        ← Copy to .env and fill in values
    ├── config/db.js        ← MongoDB connection
    ├── models/User.js      ← Mongoose User schema
    ├── middleware/auth.js  ← JWT protect middleware
    └── routes/auth.js      ← All auth API routes
```

---

## Quick Start

### 1. Get a MongoDB Atlas connection string
1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Create a free **M0 cluster**
3. Click **Connect → Drivers** and copy the connection string
4. Replace `<username>` and `<password>` with your DB user credentials

### 2. Configure environment
```bash
cd server
cp .env.example .env
# Edit .env and fill in MONGODB_URI, JWT_SECRET, and email settings
```

### 3. Install dependencies & start server
```bash
cd server
npm install
npm run dev     # development (with nodemon)
# or
npm start       # production
```

### 4. Open frontend
Open `index.html` directly in your browser, or visit `http://localhost:5000`

---

## API Endpoints

| Method | Endpoint                  | Description                        | Auth Required |
|--------|---------------------------|------------------------------------|---------------|
| POST   | /api/auth/signup          | Register new user                  | No            |
| POST   | /api/auth/login           | Login, returns JWT                 | No            |
| POST   | /api/auth/reset-password  | Send password reset email          | No            |
| POST   | /api/auth/new-password    | Set new password using reset token | No            |
| POST   | /api/auth/link-google     | Link Google account to user        | Yes (Bearer)  |
| GET    | /api/auth/me              | Get current user info              | Yes (Bearer)  |
| GET    | /api/health               | Health check                       | No            |

---

## Notes
- JWT tokens are stored in `localStorage` under the key `sa_token`
- Passwords are hashed with bcrypt (12 rounds)
- Password reset tokens expire after **1 hour**
- For production Google OAuth, integrate [Google Identity Services](https://developers.google.com/identity/gsi/web)
