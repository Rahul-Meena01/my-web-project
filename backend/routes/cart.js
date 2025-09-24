const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../middleware/auth");

// Add to cart endpoint
router.post("/addtocart", fetchUser, async (req, res, next) => {
  try {
    console.log("added", req.body.itemId);
    const updatePath = `cartData.${req.body.itemId}`;
    await User.findOneAndUpdate({ _id: req.user.id }, { $inc: { [updatePath]: 1 } });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    next(error);
  }
});

// Remove from cart endpoint
router.post("/removefromcart", fetchUser, async (req, res, next) => {
  try {
    console.log("removed", req.body.itemId);
    const updatePath = `cartData.${req.body.itemId}`;
    await User.findOneAndUpdate(
      { _id: req.user.id, [updatePath]: { $gt: 0 } },
      { $inc: { [updatePath]: -1 } },
    );
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    next(error);
  }
});

// Get cart data endpoint
router.get("/getcart", fetchUser, async (req, res, next) => {
  try {
    console.log("get cart data");
    const userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
