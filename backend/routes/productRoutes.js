const express = require("express");
const Product = require("../models/Product");

const router = express.Router();


// ADD PRODUCT
router.post("/", async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      description,
      category,
      countInStock,
    } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      description,
      category,
      countInStock,
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {

    const product = await Product.findById(
      req.params.id
    );

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});