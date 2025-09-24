const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Image storage engine
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// Create upload endpoint for images
router.post("/upload", upload.single("product"), (req, res) => {
  const baseUrl = process.env.PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 4000}`;
  res.json({ success: 1, image_url: `${baseUrl}/images/${req.file.filename}` });
});

module.exports = router;
