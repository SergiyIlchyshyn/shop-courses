var express = require('express');
var router = express.Router();

const Course = require('../models/course');

router.get('/', (req, res, next) => {
    res.render('add', {
        title: 'Add course',
        isAdd: true
    });
});
router.post('/', async(req, res, next) => {
    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img,
        userId: req.user
    });

    try {
        await course.save();
        res.redirect('/courses');
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;