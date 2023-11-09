const express = require('express');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

// Import routes
const userRouter = require('./routes/user_routes');
const messageRouter = require('./routes/message_routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(session({
    secret: 'Fill in from dot env',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.DEV_DB})
}))

// Views 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// passport
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.get('/', (req, res) => {
    console.log('/');
    res.render('home')
})

app.use('/users', userRouter);
app.use('/messages', messageRouter);

app.use(express.static("public"));

module.exports = app;
