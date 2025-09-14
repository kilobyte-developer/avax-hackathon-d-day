// models/Checkout.js
const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    flightNumber: { type: String, required: true },
    dateOfBooking: { type: Date, required: true },
    dateOfReturn: { type: Date, required: true },
    ticketUrl: { type: String }, // Cloudinary uploaded file
  },
  { timestamps: true }
);

module.exports = mongoose.model("Checkout", CheckoutSchema);