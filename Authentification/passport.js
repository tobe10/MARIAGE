const { validPassword } = require('./passwordUtils')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/registerSchema')

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            const isValid = validPassword(password, user.hash, user.salt)
            if (isValid) {

                return done(null, user);
            } else { return done(null, false) }
        });
    }
));

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});