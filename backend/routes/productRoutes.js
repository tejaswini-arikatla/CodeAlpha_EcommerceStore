const express = require("express");
const Product = require("../models/Product");

const router = express.Router();


// ========================================
// ADD PRODUCT
// ========================================

router.post("/", async (req, res) => {
  try {

    console.log("BODY RECEIVED:", req.body);

    const {
      name,
      price,
      image,
      description,
      category,
      countInStock
    } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      description,
      category,
      countInStock
    });

    res.status(201).json(product);

  } catch (error) {

    console.error(
      "ADD PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }
});


// ========================================
// GET ALL PRODUCTS
// ========================================

router.get("/", async (req, res) => {
  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// ========================================
// GET SINGLE PRODUCT
// ========================================

router.get("/:id", async (req, res) => {
  try {

    const product =
      await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});


// ========================================
// UPDATE PRODUCT
// ========================================

router.put("/:id", async (req, res) => {

  try {

    console.log(
      "UPDATE PRODUCT ID:",
      req.params.id
    );

    console.log(
      "UPDATE DATA:",
      req.body
    );


    const {
      name,
      price,
      image,
      description,
      category,
      countInStock
    } = req.body;


    const product =
      await Product.findByIdAndUpdate(

        req.params.id,

        {
          name,
          price,
          image,
          description,
          category,
          countInStock
        },

        {
          new: true,
          runValidators: true
        }

      );


    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      });

    }


    res.json({
      message: "Product updated successfully",
      product
    });


  } catch (error) {

    console.error(
      "UPDATE PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }

});


// ========================================
// DELETE PRODUCT
// ========================================

router.delete("/:id", async (req, res) => {

  try {

    console.log(
      "DELETE PRODUCT ID:",
      req.params.id
    );


    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );


    if (!product) {

      return res.status(404).json({
        message: "Product not found"
      });

    }


    res.json({
      message: "Product deleted successfully",
      product
    });


  } catch (error) {

    console.error(
      "DELETE PRODUCT ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }

});


// ========================================
// EXPORT
// ========================================

module.exports = router;