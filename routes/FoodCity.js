const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const FoodCity = require('../query/FoodCityQuery');

/* GET home page. */
router.get('/getAllProducts', async (req, res) => {
    try {
        const list = await FoodCity.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:productId', async (req, res) => {
    try {
        const list = await FoodCity.findById(req.params.productId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:productId', async (req, res) => {
    try {
        const removed = await FoodCity.delete(req.params.productId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllProduct/searchProduct', async (req, res) => {

    const name = req.body.name;
    const price = req.body.price;
    const discount = req.body.discount;
    const description = req.body.description;
    const discountState = req.body.discountState;


    try {
        const data = await TextilesPost.find(
            {
                $or: [
                    {name: name},
                    {price: price},
                    {discount: discount},
                    {description: description},
                    {discountState: discountState}
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveProduct', async (req, res) => {


    var foodCity = new FoodCity({
        image: req.body.img1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        productFeatures: req.body.productFeatures,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        productState: req.body.productState,
        qty: req.body.qty
    });


    console.log(foodCity)

    foodCity.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateProduct', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var foodCity = new FoodCity({
        image: req.body.img1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        productFeatures: req.body.productFeatures,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        productState: req.body.productState,
        qty: req.body.qty
    });

    const id = req.body.id;


    console.log(foodCity);

    foodCity.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
