// updateMed.js
const express = require('express');
const router = express.Router();
const Medlist = require('../models/medlist');

// Update route
router.post('/', async (req, res) => {
  const { itemId, name, description, price, strikedprice } = req.body;

  try {
    const updatedItem = await Medlist.findByIdAndUpdate(itemId, {
      name,
      description,
      price,
      strikedprice
    }, { new: true });

    if (!updatedItem) {
      req.flash('error', 'Item not found');
      return res.status(404).json({ message: 'Item not found' });
    }

    // Add a success flash message
    req.flash('success', 'Medicine updated successfully');

    res.status(200).json({ message: 'Medicine updated successfully' });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong...Please try again');
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
