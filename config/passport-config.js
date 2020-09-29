const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');


passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((_id, done) => {
    User.findById(_id).then((user) => {
        done(null, user)
    })
});


passport.use("local", new LocalStrategy((username, password, done) => {

    User.findOne({ username: username }, (err, user) => {
        if (err) { return }
        if (!user) return done(null, false)
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) { return }
            if (result === true) {
                return done(null, user)
            } else {
                return done(null, false)

            }
        })
    })
})
);


passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleID: profile.id }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser)
            } else {
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    done(null, newUser)

                })
            }
        })

    })
)  