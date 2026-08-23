const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const connectDB = require("./config/db");

dotenv.config();

const products = [
  
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Sample products imported successfully.");
    process.exit();
  } catch (error) {
    console.error("Error importing products:", error);
    process.exit(1);
  }
};

importData();
