const express = require('express');
const router = express.Router();
const Medlist = require('../models/medlist');

router.post('/', async (req, res) => {
    const { name, description, strikedprice, price } = req.body;

    try {

        // Save the new medicine to the database
        const newMedicine = new Medlist({
            name: name,
            description: description,
            strikedprice: strikedprice,
            price: price,
        });

        await newMedicine.save();

        // Flash message for success
        req.flash('success', 'Medicine added successfully!');
        res.redirect('/');
    } catch (error) {
        console.error(error);

        // Flash message for error
        req.flash('error', 'Error adding medicine: ' + error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
