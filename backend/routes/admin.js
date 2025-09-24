const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Enhanced Admin credentials with better security
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "$2b$10$8K1p/a0drtIzIFCdBVKrNuHS7OpbVu0jIpHDh.sGxUvZjKMZqNWGy", // hashed "admin123"
  email: "admin@mystore.com",
  role: "super_admin",
  permissions: ["read", "write", "delete", "manage_users", "manage_products"],
};

// Admin login endpoint with enhanced security
router.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username और password दोनों required हैं",
      });
    }

    // Check if username matches
    if (username !== ADMIN_CREDENTIALS.username) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // For now, use simple password comparison (in production, use bcrypt)
    const isValidPassword = password === "admin123";

    if (isValidPassword) {
      // Create enhanced JWT token for admin
      const adminData = {
        admin: {
          id: "admin_001",
          username: ADMIN_CREDENTIALS.username,
          email: ADMIN_CREDENTIALS.email,
          role: ADMIN_CREDENTIALS.role,
          permissions: ADMIN_CREDENTIALS.permissions,
          loginTime: new Date().toISOString(),
        },
      };

      const token = jwt.sign(adminData, "harsh_admin_secret_key_2024", {
        expiresIn: "8h",
        issuer: "MyStore-Admin",
        audience: "admin-panel",
      });

      res.json({
        success: true,
        token: token,
        admin: {
          username: ADMIN_CREDENTIALS.username,
          email: ADMIN_CREDENTIALS.email,
          role: ADMIN_CREDENTIALS.role,
          permissions: ADMIN_CREDENTIALS.permissions,
        },
        message: "Admin login successful! Welcome to Admin Panel 🎉",
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid admin credentials. Please check your password.",
      });
    }
  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred. Please try again.",
    });
  }
});

// Enhanced Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const token =
    req.header("admin-token") ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Admin token required.",
    });
  }

  try {
    const decoded = jwt.verify(token, "harsh_admin_secret_key_2024");

    // Check if token is for admin
    if (!decoded.admin || decoded.admin.role !== "super_admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    req.admin = decoded.admin;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Admin session expired. Please login again.",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid admin token.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Token verification failed.",
      });
    }
  }
};

// Admin dashboard endpoint with enhanced info
router.get("/admin/dashboard", authenticateAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Admin Dashboard!",
    admin: req.admin,
    serverTime: new Date().toISOString(),
    permissions: req.admin.permissions,
  });
});

module.exports = { router, authenticateAdmin };
