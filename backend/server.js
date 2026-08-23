// ========================================
// IMPORT PACKAGES
// ========================================

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


// ========================================
// IMPORT DATABASE CONNECTION
// ========================================

const connectDB = require("./config/db");


// ========================================
// IMPORT ROUTES
// ========================================

const productRoutes = require("./routes/productRoutes");


// ========================================
// LOAD ENVIRONMENT VARIABLES
// ========================================

dotenv.config();


// ========================================
// CONNECT TO MONGODB
// ========================================

connectDB();


// ========================================
// CREATE EXPRESS APP
// ========================================

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

// Allow frontend requests
app.use(cors());

// Read JSON data from requests
app.use(express.json());

// Read form data
app.use(
  express.urlencoded({
    extended: true
  })
);


// ========================================
// PRODUCT ROUTES
// ========================================

app.use(
  "/api/products",
  productRoutes
);


// ========================================
// HOME / TEST ROUTE
// ========================================

app.get("/", (req, res) => {

  res.send("E-Commerce API Running");

});


// ========================================
// 404 ROUTE
// ========================================

app.use((req, res) => {

  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });

});


// ========================================
// PORT
// ========================================

const PORT =
  process.env.PORT || 5000;


// ========================================
// START SERVER
// ========================================

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);