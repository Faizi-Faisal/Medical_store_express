const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const dotenv = require('dotenv');

const signup = require('./routes/signup');
const login = require('./routes/login');
const home = require('./routes/home');
const addMed = require('./routes/addMedicine');
const delMed = require('./routes/deleteMedicine');
const logout = require('./routes/logout');
const update = require('./routes/updateMed');
const searchRoute = require('./routes/search');

const app = express();
dotenv.config()

mongoose.connect(process.env.MONGO_URI);
let db = mongoose.connection;

db.on('error', function (err) {
    console.log(err);
});
db.once('open', function () {
    console.log("Connected to mongodb");
});

hbs.registerPartials(__dirname + '/views/partials');


app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(flash());

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    console.log('Middleware isAuthenticated executed');
    if (req.session && req.session.isAuthenticated) {
        return next();
    }
    res.redirect('/login');
};

// Routes
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/', isAuthenticated, home); 
app.use('/addMedicine', isAuthenticated, addMed);
app.use('/:id', isAuthenticated, delMed);
app.use('/updateMed', update);
app.use('/search', searchRoute);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(3000, function () {
    console.log('Server started on port 3000...');
});
