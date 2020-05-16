const express = require('express');
const router = express.Router();

const Course = require('../models/course');

router.get('/', async(req, res, next) => {
    const courses = await Course.getAll();
    // console.log(courses);
    res.render('courses', {
        title: 'Courses page',
        isCourses: true,
        courses
    });
});

router.get('/:id', async(req, res) => {
    const course = await Course.getById(req.params.id);
    res.render('course', {
        layout: 'empty',
        title: `Course ${course.title}`,
        course
    });
})

module.exports = router;