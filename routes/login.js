/*
const express = require('express');
const router = express.Router();

router.get('/auth/facebook', Passport.authenticate('facebook'));

router.get('/auth/facebook/callback', Passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }
));

router.get('/logout', function (req, rsp) {
    req.logout();
    rsp.redirect('/');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
*/
