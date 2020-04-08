const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();



const Product = require('../query/ProductQuery');


router.get('/getAllProducts', async (req, res) => {
    try {
        const list = await Product.find();
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/getAllProducts/limited', async (req, res) => {
    try {
        const list = await Product.find().limit(50);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/getAllProducts/byShopId/:shopId', async (req, res) => {

    try {
        const query = {shopId: req.params.shopId}
        const list = await Product.find(query);
        console.log(list);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/getProduct/:ProductId', async (req, res) => {

    try {
        const list = await Product.findById(req.params.ProductId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/find/byshopId', async (req, res) => {
    try {
        let shop = req.headers.id;
        const query2 = {shopId: shop};
        const data = await Product.find(query2);
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/deleteProduct', async (req, res) => {
    try {
        const myquery = {_id: req.headers.productid};
        const removed = await Product.deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            res.send(err);
            res.send(obj.result);
        });
    } catch (e) {
        res.send(e)
    }


});

router.get('/getProduct/searchProduct/mainSearch', async (req, res) => {

    try {
        const name = req.headers.searchtext;
        const data = await Product.find(
            {
                $or: [
                    {name: {$regex: name, $options: "i"}},
                    {description: {$regex: name, $options: "i"}},
                    {Language: {$regex: name, $options: "i"}},
                    {title: {$regex: name, $options: "i"}},
                    {city: {$regex: name, $options: "i"}}
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.get('/getProduct/searchProduct/mainSearch/withFilter/all', async (req, res) => {
    try {
        const txtSearch = req.headers.searchtext;
        let txtMin = Number(req.headers.min);
        let txtMax = Number(req.headers.max);
        const txtFeatured = req.headers.featured;
        const txtDiscount = req.headers.discount;
        const txtCity = req.headers.city;
        const data = await Product.find(
            {
                $or: [
                    {name: {$regex: txtSearch, $options: "i"}},
                    {description: {$regex: txtSearch, $options: "i"}},
                    {Language: {$regex: txtSearch, $options: "i"}},
                    {title: {$regex: txtSearch, $options: "i"}},
                    {city: {$regex: txtSearch, $options: "i"}}
                ],
                $and: [
                    {"price": {$gte: --txtMin, $lt: ++txtMax,}},
                    {featuredState: {$regex: txtFeatured, $options: "i"}},
                    {discountStatus: {$regex: txtDiscount, $options: "i"}},
                    {city: {$regex: txtCity, $options: "i"}},

                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.get('/getProductbyFilter/filterByCity', async (req, res) => {

    try {
        Product.aggregate([
            {
                $lookup:
                    {
                        from: 'products',
                        localField: 'shopId',
                        foreignField: '_id',
                        as: 'orderdetails'
                    }
            }
        ]).toArray(function (err, res) {
            if (err) throw err;
            console.log(JSON.stringify(res));
        });
    } catch (e) {
        res.json({message: e})
    }


});

router.get('/getProductbyFilter/filter/All', async (req, res) => {
    try {
        let begin = Number(req.headers.begin);
        let end = Number(req.headers.end);
        const list = await Product.find({
            "price": {
                $gte: --begin,
                $lt: ++end,
            }
        })
        res.send(list)
    } catch (e) {
        res.send(e)
    }

});

router.post('/saveProduct', async (req, res) => {

    try {
        var product = new Product({
            name: req.body.productName,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            image1: req.body.image1,
            image2: req.body.image2,
            featuredState: req.body.featuredState,
            title: req.body.title,
            shopId: req.body.shopId,
            availability: req.body.availability,
            discountStatus: req.body.discountState,
            specs: req.body.specs,
            date: req.body.date,
            city: req.body.city
        });


        product.save()
            .then(item => {
                res.send(item);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    } catch (e) {
        res.json({message: e})
    }


});

router.get('/getAllProductCount', async (req, res) => {

    try {
        const count = await Product.count();
        res.send({count: count})
    } catch (e) {
        e.json({message: e})
    }


});

module.exports = router;
