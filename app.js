const createError = require('http-errors');
const express = require('express');
const path = require('path');
/*const mongoose = require('mongoose');*/
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
var cors = require('cors')

require('dotenv/config');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const textTileRouter = require('./routes/Textile');
const babyCareRouter = require('./routes/BabyCare');
const bookshopRouter = require('./routes/BooShopk');
const computershopRouter = require('./routes/ComputerShop');
const electronicShopRouter = require('./routes/ElectronicShop');
const foodCityRouter = require('./routes/FoodCity');
const juwaleryShopRouter = require('./routes/Juwellary');
const loversRouter = require('./routes/Lovers');
const petShopRouter = require('./routes/PetShop');
const phoneShopRouter = require('./routes/PhoneShop');
const saloonRouter = require('./routes/Saloon');
const spaRouter = require('./routes/Spa');
const studioRouter = require('./routes/Studios');
const wineStoreRouter = require('./routes/WineStore');

const app = express();

app.use(cors())

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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Textile', textTileRouter);
app.use('/babyCare', babyCareRouter);
app.use('/bookshop', bookshopRouter);
app.use('/computer', computershopRouter);
app.use('/electronic', electronicShopRouter);
app.use('/juwalery', juwaleryShopRouter);
app.use('/lovers', loversRouter);
app.use('/foodCity', foodCityRouter);
app.use('/petShop', petShopRouter);
app.use('/phoneShop', phoneShopRouter);
app.use('/saloon', saloonRouter);
app.use('/spa', spaRouter);
app.use('/studio', studioRouter);
app.use('/wine', wineStoreRouter);

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
