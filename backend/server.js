const express =
  require("express");

const dotenv =
  require("dotenv");

const cors =
  require("cors");

const connectDB =
  require("./config/db");

const productRoutes =
  require("./routes/productRoutes");


dotenv.config();


// ========================================
// DATABASE
// ========================================

connectDB();


// ========================================
// EXPRESS
// ========================================

const app =
  express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(
  cors()
);

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true
  })
);


// ========================================
// ROUTES
// ========================================

app.use(
  "/api/products",
  productRoutes
);


// ========================================
// HOME
// ========================================

app.get(
  "/",
  (req, res) => {

    res.send(
      "API Running"
    );

  }
);


// ========================================
// PORT
// ========================================

const PORT =
  process.env.PORT || 5000;


app.listen(
  PORT,
  () => {

    console.log(
      `Server running on port ${PORT}`
    );

  }
);