const express = require('express');
const router = express.Router();
const Medlist = require('../models/medlist');

router.get('/', async (req, res) => {
    console.log('Session in Home:', req.session);
    try {
        // Fetch medicines from the database, sorted by createdAt in descending order
        const medlist = await Medlist.find().sort({ createdAt: -1 });

        // Render your view with the sorted medicine list
        res.render('index', { medlist, isAuthenticated: req.session.isAuthenticated,username: req.session.username });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

