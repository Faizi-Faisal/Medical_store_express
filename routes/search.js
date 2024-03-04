const express = require('express');
const router = express.Router();
const Medlist = require('../models/medlist');


router.get('/', async (req, res) => {
    try {
      const searchTerm = req.query.searchTerm; // Assuming your query parameter is named 'searchTerm'
  
      // Use a regular expression to make the search case-insensitive
      const regex = new RegExp(searchTerm, 'i');
  
      // Find medicines with matching names
      const results = await Medlist.find({ name: regex });
  
      res.json({ success: true, results });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;