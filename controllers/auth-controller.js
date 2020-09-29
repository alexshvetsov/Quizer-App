const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt')
const User = require('../models/user-model');


const authCheck = (req, res, next) => {
    if (!req.user) {
        // res.redirect('https://fathomless-garden-43680.herokuapp.com/sign-up')
        res.redirect('http://localhost:3000/sign-up')
    } else {
        next()
    }
}



//google auth
router.get("/google", passport.authenticate("google", {
    scope: ['profile', "email"]
}));

//google auth redircet
router.get("/google/redirect", passport.authenticate('google'), (req, res) => {

    // res.redirect('https://fathomless-garden-43680.herokuapp.com/profile');
    res.redirect('http://localhost:3000/profile')

});

router.get("/profile", authCheck, (req, res) => {
    res.json(req.user)
});



///local stargey new user
router.post('/register', (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) console.log(err);
        if (doc) res.json({ message: 'User is already taken' })
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            });
            await newUser.save();
            res.json(newUser)
        };
    });

});

router.post("/login", (req, res) => {

    passport.authenticate("local", (err, user, info) => {
        if (err) { return }
        if (!user) res.json({ message: 'No such user' })
        if (user) {
            req.logIn(user, (err) => {
                if (err) { console.log(err); return }
                res.json(user)
            });
        }
    })(req, res)
});

module.exports = router;   