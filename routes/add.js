var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('add', {
        title: 'Add course',
        isAdd: true
    });
});
router.post('/', (req, res, next) => {
    console.log(req.body);
    res.redirect('/courses');
});

module.exports = router;