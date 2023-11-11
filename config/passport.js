const passport = require('passport');
const LocalStrategry = require('passport-local').Strategy;
const User = require('../models/User');

const verifyCallback = async (email, password, done) => {
    try {
        const user = await User.findOne({email: email});
        if (!user) {
            return done(null, false);
        }
        if (!user.verifyPassword(password)) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        done(err)
    }
}

const stratOpts = {
    usernameField: 'email'
};

passport.use(new LocalStrategry(stratOpts, verifyCallback));

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
})