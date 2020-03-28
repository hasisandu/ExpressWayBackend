const createError = require('http-errors');
const express = require('express');
const path = require('path');
/*const mongoose = require('mongoose');*/
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
var cors = require('cors')

require('dotenv/config');


const babyCareRouter = require('./routes/BabyCare');
const BusinessRouter = require('./routes/Business');
const ProductRouter = require('./routes/Product');
const fileRoutes = require('./routes/image-upload');
/*const LoginRoutes = require('./routes/login');*/
const ClothRouter = require('./routes/textilerouters/Cloths');
const UserRoute = require('./routes/userRoutes/UserRoutes');

const app = express();

app.use(cors())


app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({extended: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
//==============================================

app.use('/babyCare', babyCareRouter);


app.use('/image', fileRoutes);
/*app.use('/login', LoginRoutes);*/
//================================================
app.use('/api/v1/cloth', ClothRouter);
app.use('/api/v1/business', BusinessRouter);
app.use('/api/v1/product', ProductRouter);
app.use('/api/v1/user', UserRoute);
//================================================

//connect DB
var mongoose = require("mongoose");
var ObjectId = require("mongoose").ObjectId;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo", {useUnifiedTopology: true}, () => {
    console.log('connected to database');
});

/*
mongoose.connect(process.env.DB_CONNECT, {  useNewUrlParser: true }, () => {
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
app.listen(8000, () => {
    console.log("connect")
})

module.exports = app;
