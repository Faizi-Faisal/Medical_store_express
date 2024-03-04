const express = require('express');
const router = express.Router();
const Medlist = require('../models/medlist');

router.delete('/:id', async (req, res) => {
    const itemId = req.params.id; // Corrected to use req.params.id

    try {
        // Delete the item from the database
        await Medlist.findByIdAndDelete(itemId);

        // Flash message for success
        req.flash('success', 'Medicine deleted successfully!');
        res.status(200).send({ success: true });
    } catch (error) {
        console.error(error);

        // Flash message for error
        req.flash('error', 'Error deleting item.');
        res.status(500).send({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
