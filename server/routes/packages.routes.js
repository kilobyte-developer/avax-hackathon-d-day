// routes/packages.js
const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// GET /api/packages - Get all active packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({ active: true });
    res.json({
      success: true,
      data: packages,
      count: packages.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching packages',
      error: error.message
    });
  }
});

// GET /api/packages/:id - Get single package by ID
router.get('/:id', async (req, res) => {
  try {
    const package = await Package.findOne({
      _id: req.params.id,
      active: true
    });

    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    res.json({
      success: true,
      data: package
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching package',
      error: error.message
    });
  }
});

// GET /api/packages/type/:type - Get packages by type
router.get('/type/:type', async (req, res) => {
  try {
    const packages = await Package.find({
      type: req.params.type.toUpperCase(),
      active: true
    });

    res.json({
      success: true,
      data: packages,
      count: packages.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching packages by type',
      error: error.message
    });
  }
});

// GET /api/packages/category/:category - Get packages by category
router.get('/category/:category', async (req, res) => {
  try {
    const packages = await Package.find({
      category: req.params.category.toUpperCase(),
      active: true
    });

    res.json({
      success: true,
      data: packages,
      count: packages.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching packages by category',
      error: error.message
    });
  }
});

module.exports = router;