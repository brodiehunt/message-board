const express = require('express');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const {connectDB} = require('./config/dbcon')
const {errorHandler, noRouteDefined} = require('./middleware/error_handling_middleware');
const authMiddleware = require('./middleware/auth_middleware');
const path = require('path');
require('dotenv').config();

// Import routes
const userRouter = require('./routes/user_routes');
const messageRouter = require('./routes/message_routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

let mongoDBURI;

if (process.env.NODE_ENV === 'development' ) {
    mongoDBURI = process.env.DEV_DB;
} else if (process.env.NODE_ENV === 'test') {
    mongoDBURI = process.env.TEST_DB;
} else {
    mongoDBURI = process.env.PROD_DB
}
// {mongoUrl: mongoDBURI}

// express-session config -- mongostore
app.use(session({
    secret: 'Fill in from dot env',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: mongoDBURI})
}))

// passport configuration
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
// error message passed to login form
app.use(flash())

// Views 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Routes
app.get('/', authMiddleware.authRedirect, (req, res) => {
    console.log(req.session);
    res.render('home')
})

app.use('/users', userRouter);
app.use('/messages', authMiddleware.authorize, messageRouter);
// app.use(noRouteDefined);

app.use(errorHandler);

module.exports = app;
