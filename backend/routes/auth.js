const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// User registration endpoint
router.post("/signup", async (req, res, next) => {
  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create an empty cart
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    // Create a new user INSTANCE with a different name ('newUser')
    // Major change: store hashed password for security
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      cartData: cart,
    });

    // Save the new user to the database
    await newUser.save();
    console.log("User registered successfully");

    // Create JWT token
    const data = {
      user: {
        id: newUser._id,
      },
    };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw Object.assign(new Error("JWT secret not configured"), { status: 500 });
    }
    const token = jwt.sign(data, secret);

    // Send a SINGLE response with success and the token
    res.json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.error("Error in signup:", error);
    next(error);
  }
});

// User login endpoint
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (!passCompare) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
    const data = { user: { id: user._id } };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw Object.assign(new Error("JWT secret not configured"), { status: 500 });
    }
    const token = jwt.sign(data, secret);
    res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
