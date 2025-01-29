const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // For JWT token generation
const User = require("../models/User");

const router = express.Router();

// This will handle user registration.

// POST /register:

// We’re accepting a POST request with the user's username, email, and password.
// We check if the user already exists in the database by searching for the email.
// If the user doesn’t exist, we create a new user instance and hash the password automatically
// (thanks to the pre('save') hook in the User model).
// We then save the user and create a JWT token.

// JWT Token:

// We use jsonwebtoken to create a JWT token that can be sent back to the frontend after successful registration.
// This token is used for authentication in later API calls.

// Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    await user.save();

    // Create a JWT token (optional, you can do this during login as well)
    const token = jwt.sign(
      { userId: user._id }, // Payload (user ID)
      process.env.JWT_SECRET, // Secret key (keep it in .env)
      { expiresIn: "1h" } // Token expiration
    );

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
