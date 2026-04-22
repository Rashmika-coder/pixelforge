// userModel.js — Mongoose schema for the User collection
// Defines the structure and types of data stored per user in MongoDB

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },    // email must be unique across all users
  password: { type: String, required: true },               // stored as a bcrypt hash, never plain text
  creditBalance: { type: Number, default: 5 }               // new users start with 5 free credits
});

// Reuse an existing model if already compiled (avoids OverwriteModelError in dev)
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
