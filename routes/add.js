var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('add', {
        title: 'Add course',
        isAdd: true
    });
});

module.exports = router;