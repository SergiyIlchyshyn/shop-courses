const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// LogIn User
router.get('/login', async(req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true,
        loginError: req.flash('loginError'), // працює як гетер
        registerError: req.flash('registerError')
    });
});
router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = await User.findOne({ email });
        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);
            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err;
                    }
                    res.redirect('/');
                });
            } else {
                req.flash('loginError', 'Невірний пароль');
                res.redirect('/auth/login#login');
            }
        } else {
            req.flash('loginError', 'Такого користувача не існує');
            res.redirect('/auth/login#login');
        }
    } catch (e) {
        console.error(e);
    }
});

// LogOut User
router.get('/logout', async(req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    });
});

// Register Users
router.post('/register', async(req, res) => {
    try {
        const { email, password, repeat, name } = req.body;
        const candidate = await User.findOne({ email });
        if (candidate) {
            req.flash('registerError', 'Користувач з таким email вже існує');
            res.redirect('/auth/login#register');
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({
                email,
                name,
                password: hashPassword,
                cart: { items: [] }
            });
            await user.save();
            res.redirect('/auth/login#login');
        }
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;