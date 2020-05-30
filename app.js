const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressHbs = require('express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const session = require('express-session');
//==============================================================================
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const addRouter = require('./routes/add');
const cardRouter = require('./routes/card');
const ordersRouter = require('./routes/orders');
const authRouter = require('./routes/auth');
//==============================================================================
const User = require('./models/user');
const varMiddleware = require('./middleware/variables');
//MONGOOSE======================================================================
const mongoose = require('mongoose');
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

    const candidate = await User.findOne();
    if (!candidate) {
        const user = new User({
            email: 'sergiy.ilchyshyn@gmail.com',
            name: 'Sergiy',
            cart: { items: [] }
        });
        await user.save();
    }
}
start();
//==============================================================================
const app = express();
//==============================================================================
app.use(async(req, res, next) => {
    try {
        const user = await User.findById('5ec691f45f2bd31d54b94be1');
        req.user = user;
        next();
    } catch (e) {
        console.error(e);

    }
});
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
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(varMiddleware);
//==============================================================================
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/add', addRouter);
app.use('/card', cardRouter);
app.use('/orders', ordersRouter);
app.use('/auth', authRouter);
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