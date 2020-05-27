const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/', async(req, res) => {
    res.render('orders', {
        isOreder: true,
        title: 'Закази'
    });
});
router.post('/', async(req, res) => {
    res.redirect('/orders');
});

module.exports = router;