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
    const course = new Course(req.body.title, req.body.price, req.body.img);
    await course.save();

    res.redirect('/courses');
});

module.exports = router;