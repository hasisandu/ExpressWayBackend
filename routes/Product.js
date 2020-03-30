const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();


router.post('/upload', (req, res) => {
    res.send({image: req.file});
});


/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const Product = require('../query/ProductQuery');



router.get('/getAllProducts', async (req, res) => {
    console.log("ok");
    try {
        const list = await Product.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/getAllProducts/byShopId/:shopId', async (req, res) => {


    const query = {shopId: req.params.shopId}

    try {
        const list = await Product.find(query);
        console.log(list);
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/getProduct/:ProductId', async (req, res) => {
console.log(';;;;;;')
    try {
        const list = await Product.findById(req.params.ProductId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/find/byshopId', async (req, res) => {
    let shop = req.headers.id;
    const query2 = {shopId: shop};
    console.log(query2)
    try {
        const data = await Product.find(query2);

        res.json(data);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/deleteProduct', async (req, res) => {

    const myquery = {_id: req.headers.productid};
    const removed = await Product.deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        res.send(err);
        res.send(obj.result);
    });

});

router.get('/getProduct/searchProduct/mainSearch', async (req, res) => {
    const name = req.headers.searchtext;
    try {
        const data = await Product.find(
            {
                $or: [
                    {name: {$regex: name, $options: "i"}},
                    {description: {$regex: name, $options: "i"}},
                    {price: {$regex: name, $options: "i"}},
                    {discount: {$regex: name, $options: "i"}},
                    {Language: {$regex: name, $options: "i"}},
                    {title: {$regex: name, $options: "i"}},
                    {specs: {$regex: name, $options: "i"}},
                ]
            }
        );

        res.json(data);


    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveProduct', async (req, res) => {

    console.log(req.body);

    var product = new Product({
        name: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        image1: req.body.image1,
        image2: req.body.image2,
        featuredState: req.body.featuredState,
        title: req.body.title,
        shopId: req.body.shopId,
        availability: req.body.availability,
        discountStatus: req.body.discountState,
        specs: req.body.specs
    });


    product.save()
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});



//-------------------------------------------------------------------------------


module.exports = router;
