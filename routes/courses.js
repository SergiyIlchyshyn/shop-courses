const express = require('express');
const router = express.Router();

const Course = require('../models/course');

router.get('/', async(req, res, next) => {
    const courses = await Course.getAll();
    console.log(courses);
    res.render('courses', {
        title: 'Courses page',
        isCourses: true,
        courses
    });
});

module.exports = router;