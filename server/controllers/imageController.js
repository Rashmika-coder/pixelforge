// imageController.js — Handles AI image generation
// Validates credits, calls the ClipDrop API, decodes the response,
// deducts 1 credit from the user, and returns a base64-encoded image.

import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from 'form-data';

/**
 * POST /api/image/generate-image
 * Generates an image from a text prompt using the ClipDrop API.
 * Requires authentication (userId is attached by the userAuth middleware).
 */
export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    // Fetch the user document from MongoDB
    const user = await userModel.findById(userId);

    // Guard: user must exist and a prompt must be provided
    if (!user || !prompt) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    // Guard: user must have at least 1 credit remaining
    if (user.creditBalance === 0 || user.creditBalance < 0) {
      return res.json({
        success: false,
        message: 'No Credit Balance',
        creditBalance: user.creditBalance
      });
    }

    // Build the multipart form payload expected by ClipDrop
    const formData = new FormData();
    formData.append('prompt', prompt);

    // Call the ClipDrop API — response is a binary image buffer
    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: { 'x-api-key': process.env.CLIPDROP_API },
        responseType: 'arraybuffer' // receive raw binary data
      }
    );

    // Convert binary response to a base64 data URL usable by the frontend
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct 1 credit from the user's balance after a successful generation
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1
    });

    res.json({
      success: true,
      message: 'Image Generated',
      creditBalance: user.creditBalance - 1,
      resultImage
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};