console.log("THIS IS MY SERVER FILE");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("TEST WORKING");
});

//ROUTES
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("E-commerce Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});