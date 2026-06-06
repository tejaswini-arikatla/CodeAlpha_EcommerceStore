const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  orderItems: [
    {
      name: String,
      qty: Number,
      price: Number
    }
  ],

  totalPrice: {
    type: Number,
    required: true
  }

},
{
  timestamps: true
}
);

module.exports =
mongoose.model("Order", orderSchema);