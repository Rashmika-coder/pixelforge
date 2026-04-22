// userController.js — Handles all user-related operations:
// - registerUser: creates a new account and returns a JWT
// - loginUser: verifies credentials and returns a JWT
// - userCredits: returns the current credit balance for the logged-in user

import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * POST /api/users/register
 * Registers a new user. Hashes the password before saving,
 * then returns a signed JWT token on success.
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation — all fields are required
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    // Hash the password using bcrypt (salt rounds = 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = { name, email, password: hashedPassword };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate a JWT that encodes the user's MongoDB _id
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * POST /api/users/login
 * Validates email and password, then returns a JWT token on success.
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Look up the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/**
 * GET /api/users/credits
 * Returns the current credit balance for the authenticated user.
 * Requires the userAuth middleware to be applied on the route.
 */
export const userCredits = async (req, res) => {
  try {
    const { userId } = req.body; // userId is injected by the auth middleware

    const user = await userModel.findById(userId);
    res.json({ success: true, credits: user.creditBalance, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
