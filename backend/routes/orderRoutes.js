const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { user, orderItems, totalPrice } = req.body;

    const order = await Order.create({
      user,
      orderItems,
      totalPrice
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;