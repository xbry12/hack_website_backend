const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // For JWT token generation
const User = require("../models/User");
const { generateToken, matchPassword } = require("../utils/authUtils");

// We created generateToken and matchPassword helper functions in authUtils.js:
// generateToken: Handles the generation of the JWT token (used in both registration and login).
// matchPassword: Compares the entered password with the stored hash (used in login).
// The logic in the registration and login routes is now much cleaner and reusable.

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
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create and save the new user
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();

    // Generate a JWT token
    const token = generateToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password with stored hash
    const isMatch = await matchPassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
