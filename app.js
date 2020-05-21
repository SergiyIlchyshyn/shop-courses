var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
//MONGOOSE======================================================================
var mongoose = require('mongoose');
async function start() {
    const url = `mongodb+srv://admin-shop:Oi6Fn45QzY1oDUBg@clustertest-3w4kv.mongodb.net/shop`;
    // Для подключения к БД применяем метод connect()
    await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => console.log('DB Connected!'))
        .catch(err => {
            console.log(Error, err.message);
        });
}
start();
//==============================================================================
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var addRouter = require('./routes/add');
var cardRouter = require('./routes/card');
//==============================================================================
var app = express();
//HANDLEBARS====================================================================
app.engine('.hbs', expressHbs({
    layoutsDir: "views/layouts",
    defaultLayout: 'layout',
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs');
//==============================================================================
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//==============================================================================
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/add', addRouter);
app.use('/card', cardRouter);
//==============================================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;