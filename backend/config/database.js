const mongoose = require("mongoose");

const connectDB = () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error("MONGODB_URI is not set. Please configure backend/.env");
    process.exit(1);
  }
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
      process.exit(1);
    });
};

module.exports = connectDB;
