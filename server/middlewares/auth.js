// auth.js — JWT Authentication Middleware
// Verifies that the request comes from a logged-in user by checking the JWT token in headers.
// Attaches the decoded userId to req.body so downstream controllers can use it.

import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  // Reject the request if no token is provided
  if (!token) {
    return res.json({ success: false, message: 'Not Authorized. Login Again' });
  }

  try {
    // Verify the token using the secret key from environment variables
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      // Attach userId to the request body so controllers can identify the user
      if (!req.body) req.body = {};
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    next(); // token is valid, proceed to the next handler
  } catch (error) {
    // Token expired or tampered with
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
