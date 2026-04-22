// mongodb.js — MongoDB connection configuration
// Uses Mongoose to connect to MongoDB Atlas using the URI from environment variables

import mongoose from "mongoose";

const connectDB = async () => {
  // Log a message once the connection is successfully established
  mongoose.connection.on('connected', () => {
    console.log('Database connected');
  });

  // Connect using the URI stored in .env
  await mongoose.connect(process.env.MONGO_URI);
};

export default connectDB;
