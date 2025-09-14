const express = require("express");
const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");
const fs = require("fs");
const Checkout = require("../models/Checkout");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// POST /api/checkout
router.post("/", upload.single("file"), async (req, res) => {
  try {
    let fileUrl = null;

    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "checkouts",
        resource_type: "auto",
      });

      fileUrl = uploadRes.secure_url;
      fs.unlinkSync(req.file.path); // cleanup temp file
    }

    const newCheckout = new Checkout({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      flightNumber: req.body.flightNumber,
      bookingDate: req.body.bookingDate,
      returnDate: req.body.returnDate,
      ticketUrl: fileUrl,
      selectedPackage: req.body.selectedPackage,
    });

    await newCheckout.save();

    res.status(201).json({ success: true, checkout: newCheckout });
  } catch (err) {
    console.error("❌ Checkout save error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
