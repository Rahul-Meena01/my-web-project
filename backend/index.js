const express = require("express");
const port = process.env.PORT || 4000;
require("dotenv").config();
const app = express();

const cors = require("cors");
const connectDB = require("./config/database");

// Import routes
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const uploadRoutes = require("./routes/upload");
const { router: adminRoutes } = require("./routes/admin");

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL].filter(Boolean),
    credentials: true,
  }),
);

// Database connection
connectDB();

// Static files for images
app.use("/images", express.static("uploads/images"));

// Basic route
app.get("/", (req, res) => {
  res.send("Express app is working");
});

// Use routes
app.use("/", productRoutes);
app.use("/", authRoutes);
app.use("/", cartRoutes);
app.use("/", uploadRoutes);
app.use("/", adminRoutes);

// Centralized error handler
// Major change: centralizing error handling to return consistent JSON responses
// and avoid duplicated try/catch blocks across routes.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ success: false, message: err.message || "Internal Server Error" });
});

// Start server
app.listen(port, "0.0.0.0", (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error occurred " + error);
  }
});
