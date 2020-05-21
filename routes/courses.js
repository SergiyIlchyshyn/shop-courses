const express = require('express');
const router = express.Router();

const Course = require('../models/course');
// Get all courses
router.get('/', async(req, res, next) => {
    const courses = await Course.getAll();
    // console.log(courses);
    res.render('courses', {
        title: 'Courses page',
        isCourses: true,
        courses
    });
});
// Get one course by ID
router.get('/:id', async(req, res) => {
    const course = await Course.getById(req.params.id);
    res.render('course', {
        layout: 'empty',
        title: `Course ${course.title}`,
        course
    });
});
// Edit course
router.get('/:id/edit', async(req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }

    const course = await Course.getById(req.params.id);

    res.render('course-edit', {
        title: `Edit course - ${course.title}`,
        course
    })
});
router.post('/edit', async(req, res) => {
    await Course.update(req.body);

    res.redirect('/courses');
});

module.exports = router;