# PixelForge — Frontend

React + Vite frontend for the Imagify AI image generator.

## Setup

```bash
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Run the dev server:

```bash
npm run dev
```

## Folder Structure

```
src/
├── components/   # Navbar, Login modal, Header, Steps, Footer, etc.
├── context/      # Global state via React Context API (user, token, credits)
├── pages/        # Home, Result (image generator), BuyCredit
└── assets/       # Static images and data constants
```
