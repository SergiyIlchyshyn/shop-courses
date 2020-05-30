const express = require('express');
const router = express.Router();

// LogIn User
router.get('/login', async(req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    });
});
router.post('/login', async(req, res) => {
    req.session.isAuthenticated = true;
    res.redirect('/');
});

// LogOut User
router.get('/logout', async(req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    });
});

module.exports = router;