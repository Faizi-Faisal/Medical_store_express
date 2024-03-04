const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('signup', { title: 'Signup Page' });
});

router.post('/', async (req, res) => {
    try {
        // Extract user data from the request body
        const { username, email, password } = req.body;

        // Create a new user instance
        const user = new User({
            username,
            email,
            password,
            accountCreated: new Date(),
        });

        // Save the user to the database
        await user.save();

        req.flash('success', 'Signup successful!');
         res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
