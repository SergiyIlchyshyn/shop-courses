var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Home page',
        isHome: true
    });
});
/* GET courses page. */
router.get('/courses', (req, res, next) => {
    res.render('courses', {
        title: 'Courses page',
        isCourses: true
    });
});
/* GET add page. */
router.get('/add', (req, res, next) => {
    res.render('add', {
        title: 'Add course',
        isAdd: true
    });
});

module.exports = router;