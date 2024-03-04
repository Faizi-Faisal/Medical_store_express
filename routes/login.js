const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Make sure to adjust the path if needed

router.get('/', (req, res) => {
    // Check if the user is already logged in
    if (req.session && req.session.isAuthenticated) {
        return res.redirect('/');
    }

    // If not logged in, show the login page
    res.render('login', { title: 'Login Page', message: req.flash('message') });
});

router.post('/', async (req, res) => {
    console.log('POST /login');

    // Check if the user is already logged in
    if (req.session && req.session.isAuthenticated) {
        console.log('Already authenticated, logging out.');
        req.session.isAuthenticated = false;
        return res.redirect('/login');
    }

    // Handle login logic here (authentication against the database)
    const { email, password } = req.body;

    try {
        // Query the database for the provided email and password
        const user = await User.findOne({ email, password });

        if (user) {
            req.session.isAuthenticated = true;
            console.log('Authentication successful. isAuthenticated:', req.session.isAuthenticated);
            console.log('Authentication successful. Username:', user.username);
            req.session.username = user.username;
            return res.redirect('/');
        } else {
            console.log('Invalid credentials.');
            req.flash('message', 'Invalid credentials! Please try again');
            return res.redirect('/login');
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        req.flash('message', 'An error occurred. Please try again later.');
        return res.redirect('/login');
    }
});


module.exports = router;
