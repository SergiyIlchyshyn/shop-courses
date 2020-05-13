var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('courses', {
        title: 'Courses page',
        isCourses: true
    });
});

module.exports = router;