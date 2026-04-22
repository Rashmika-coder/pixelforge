// imageRoutes.js — API routes for AI image generation
// Base path: /api/image (mounted in server.js)

import express from "express";
import { generateImage } from '../controllers/imageController.js';
import userAuth from "../middlewares/auth.js";

const imageRouter = express.Router();

// Protected route — user must be logged in to generate images
// The userAuth middleware verifies the JWT and attaches userId to req.body
imageRouter.post('/generate-image', userAuth, generateImage);  // POST /api/image/generate-image

export default imageRouter;
