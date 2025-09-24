const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add product endpoint
router.post("/addproduct", async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ id: 1 }).limit(1);
    let id = 1;
    if (products && products.length > 0) {
      const last = await Product.find({}).sort({ id: -1 }).limit(1);
      id = (last?.[0]?.id || 0) + 1;
    }
    const newProduct = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    await newProduct.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    next(error);
  }
});

// Remove product endpoint
router.post("/removeproduct", async (req, res, next) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    next(error);
  }
});

// Get all products endpoint
router.get("/allproducts", async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// New collections endpoint
router.get("/newcollections", async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ id: -1 }).limit(8);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// Popular in women endpoint
router.get("/popularinwomen", async (req, res, next) => {
  try {
    const products = await Product.find({ category: "women" }).limit(4);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
