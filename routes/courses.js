const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const auth = require('../middleware/auth');

// Get all courses
router.get('/', async(req, res, next) => {
    const courses = await Course.find().populate('userId', 'email name');
    // console.log(courses);
    res.render('courses', {
        title: 'Courses page',
        isCourses: true,
        courses
    });
});
// Get one course by ID
router.get('/:id', async(req, res) => {
    const course = await Course.findById(req.params.id);
    res.render('course', {
        layout: 'empty',
        title: `Course ${course.title}`,
        course
    });
});
// Edit course
router.get('/:id/edit', auth, async(req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }

    const course = await Course.findById(req.params.id);

    res.render('course-edit', {
        title: `Edit course - ${course.title}`,
        course
    })
});
router.post('/edit', auth, async(req, res) => {
    const { id } = req.body;
    delete req.body.id;
    await Course.findByIdAndUpdate(id, req.body);
    res.redirect('/courses');
});
// Delete course
router.post('/remove', auth, async(req, res) => {
    try {
        await Course.deleteOne({ _id: req.body.id });
        res.redirect('/courses');
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;