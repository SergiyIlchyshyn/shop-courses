const express = require('express');
const router = express.Router();
const User = require('../models/user');

// LogIn User
router.get('/login', async(req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    });
});
router.post('/login', async(req, res) => {
    const user = await User.findById('5ec691f45f2bd31d54b94be1');
    req.session.user = user;
    req.session.isAuthenticated = true;
    req.session.save(err => {
        if (err) {
            throw err;
        }
        res.redirect('/');
    });
});

// LogOut User
router.get('/logout', async(req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    });
});

module.exports = router;