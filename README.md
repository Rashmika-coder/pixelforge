# PixelForge — AI Text-to-Image Generator

A full-stack web application that allows users to generate AI images from text prompts using the ClipDrop API. Built with React (Vite) on the frontend and Node.js/Express/MongoDB on the backend.



> **Academic Project** — Built to explore full-stack development concepts including REST APIs, JWT-based authentication, and third-party AI integrations.

---

## What This App Does

- Users can **register / log in** with email and password (passwords are hashed using bcrypt).
- Each user gets **5 free credits** on signup to generate images.
- On the **Result page**, users type a text prompt and the app calls the ClipDrop AI API to generate an image.
- Credits are deducted per generation. Users can **buy more credits** via the pricing page.
- A JWT token is stored in `localStorage` to persist login sessions.

---

## Project Structure

```
pixelforge/
├── client/                  # React frontend (Vite + TailwindCSS)
│   └── src/
│       ├── components/      # Reusable UI components (Navbar, Login, Footer, etc.)
│       ├── context/         # Global state using React Context API
│       ├── pages/           # Route-level pages (Home, Result, BuyCredit)
│       └── assets/          # Static files and data constants
│
└── server/                  # Node.js + Express backend
    ├── config/              # Database connection (MongoDB via Mongoose)
    ├── controllers/         # Business logic for users and images
    ├── middlewares/         # JWT authentication middleware
    ├── models/              # Mongoose schema/models
    └── routes/              # Express API route definitions
```

---

## Tech Stack

| Layer       | Technology                              |
|-------------|----------------------------------------|
| Frontend    | React 19, Vite, TailwindCSS, Framer Motion |
| Backend     | Node.js, Express 5, ES Modules         |
| Database    | MongoDB Atlas (via Mongoose)           |
| Auth        | JWT (jsonwebtoken) + bcrypt            |
| AI API      | ClipDrop Text-to-Image API             |
| HTTP Client | Axios                                  |

---

## Getting Started

### Prerequisites
- Node.js v18+
- A MongoDB Atlas URI
- A ClipDrop API key (free at [clipdrop.co](https://clipdrop.co/apis))

### 1. Clone the Repository

```bash
git clone https://github.com/Rashmika-coder/pixelforge.git
cd pixelforge
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLIPDROP_API=your_clipdrop_api_key
PORT=4000
```

Start the server:

```bash
npm run server     # with nodemon (development)
# or
npm start          # plain node
```

### 3. Setup the Frontend

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the dev server:

```bash
npm run dev
```

App will be available at `http://localhost:5173`

---

## API Endpoints

### User Routes — `/api/users`

| Method | Endpoint      | Description                  | Auth Required |
|--------|--------------|------------------------------|---------------|
| POST   | `/register`  | Register a new user          | No            |
| POST   | `/login`     | Login and receive JWT token  | No            |
| GET    | `/credits`   | Fetch logged-in user credits | Yes (JWT)     |

### Image Routes — `/api/image`

| Method | Endpoint          | Description                          | Auth Required |
|--------|------------------|--------------------------------------|---------------|
| POST   | `/generate-image` | Generate an image from a text prompt | Yes (JWT)     |

---

## How Authentication Works

1. User registers/logs in → server returns a **JWT token**.
2. Token is saved in **localStorage** on the client.
3. Every protected request sends the token in the **request headers**.
4. The `userAuth` middleware verifies and decodes the token to identify the user.

---

## Environment Variables Reference

| Variable       | Where     | Description                          |
|----------------|-----------|--------------------------------------|
| `MONGO_URI`    | server    | MongoDB Atlas connection string      |
| `JWT_SECRET`   | server    | Secret key for signing JWT tokens    |
| `CLIPDROP_API` | server    | ClipDrop API key for image generation|
| `PORT`         | server    | Port for the Express server (default: 4000) |
| `VITE_BACKEND_URL` | client | Backend URL for API calls        |

---

## Known Limitations / Future Improvements

- Payment integration (Razorpay) is not fully hooked up — only the UI exists.
- No image history stored in the database yet.
- Error messages could be more descriptive for edge cases.
- Could benefit from rate limiting on the image generation endpoint.

---

## Author

Made by RAshmika-coder and team as a learning project to explore full-stack development with React, Node.js, and AI APIs.

[GitHub Profile](https://github.com/Rashmika-coder)
