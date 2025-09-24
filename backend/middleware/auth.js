const jwt = require("jsonwebtoken");

// Major change: use env-based secret and forward errors to centralized handler
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  } else {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw Object.assign(new Error("JWT secret not configured"), { status: 500 });
      }
      const data = jwt.verify(token, secret);
      req.user = data.user; // Set the user data in the request object
      next(); // Call the next middleware or route handler
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
      }
      next(error);
    }
  }
};

module.exports = fetchUser;
