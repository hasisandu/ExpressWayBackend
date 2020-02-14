const createError = require('http-errors');
const express = require('express');
const path = require('path');
/*const mongoose = require('mongoose');*/
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')

require('dotenv/config');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const textTileRouter = require('./routes/Textile');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Textile', textTileRouter);

//connect DB
var mongoose = require("mongoose");
var ObjectId = require("mongoose").ObjectId;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo", {useUnifiedTopology: true}, () => {
    console.log('connected to databasedf');
});
/*

mongoose.connect(process.env.DB_CONNECT, {  useUnifiedTopology: true } , () => {
    console.log('connected to database');
});*/


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.listen(5000, () => {
    console.log("connect")
})

module.exports = app;
