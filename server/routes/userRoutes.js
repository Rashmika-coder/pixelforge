// userRoutes.js — API routes for user authentication and account management
// Base path: /api/users (mounted in server.js)

import express from 'express'
import { registerUser, loginUser, userCredits } from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()

// Public routes — no authentication required
userRouter.post('/register', registerUser)  // POST /api/users/register
userRouter.post('/login', loginUser)        // POST /api/users/login

// Protected route — requires a valid JWT token in the request headers
userRouter.get('/credits', userAuth, userCredits)  // GET /api/users/credits

export default userRouter
