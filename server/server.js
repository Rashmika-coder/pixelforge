// server.js — Entry point for the Express backend
// Connects to MongoDB, registers middleware, and mounts API routes

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

// Middleware: parse JSON request bodies and allow cross-origin requests from the frontend
app.use(express.json())
app.use(cors())

// Connect to MongoDB before handling any requests
await connectDB()

// API Routes
app.use('/api/users', userRouter)   // handles register, login, and credit fetch
app.use('/api/image', imageRouter)  // handles AI image generation

// Health-check route
app.get('/', (req, res) => res.send('API Working'))

app.listen(PORT, () => console.log('Server running on port ' + PORT))
