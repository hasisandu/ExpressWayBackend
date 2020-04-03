const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;


const Favourite = require('../../query/express/favourite/Favourite');

router.post('/saveFavourite', async (req, res) => {
    let favourite = new Favourite({
        userId: req.body.userId,
        ProductId: req.body.ProductId,
        ProductImage: req.body.ProductImage,
        date: req.body.date,
        time: req.body.time,
        productName: req.body.productName,
        price: req.body.price,
        title: req.body.title,
    });

    let query = {ProductId: req.body.ProductId}

    let result = await Favourite.findOne(query)

    if (result != null) {
        Favourite.deleteOne(query)
            .then(item => {
                res.send({state: 500});
            })
            .catch(err => {
                res.status(400).send({state: 400});
            });
    } else {
        favourite.save()
            .then(item => {
                res.send({state: 200});
            })
            .catch(err => {
                res.status(400).send({state: 400});
            });
    }

});

router.get('/getFavouriteCount', async (req, res) => {

    var query = {userId: req.headers.id};
    try {
        const list = await Favourite.find(query);
        res.json(list.length);
    } catch (e) {
        res.json({message: err});
    }
});
router.get('/getIsThereOrNot', async (req, res) => {

    var query = {ProductId: req.headers.id};

    console.log(query)

    try {
        const json = await Favourite.findOne(query);

        if (json != null) {
            console.log(json)
            res.send(true)
        } else {
            res.send(false)
        }
    } catch (e) {
        res.send(false);
    }
});

module.exports = router;
