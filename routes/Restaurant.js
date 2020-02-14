const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const Restaurant = require('../query/RestaurantQuery');

/* GET home page. */
router.get('/getAllProducts', async (req, res) => {
    try {
        const list = await Restaurant.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:productId', async (req, res) => {
    try {
        const list = await Restaurant.findById(req.params.productId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:productId', async (req, res) => {
    try {
        const removed = await Restaurant.delete(req.params.productId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllProducts/searchProduct', async (req, res) => {

    const name = req.body.name;
    const price = req.body.price;

    try {
        const data = await Restaurant.find(
            {
                $or: [
                    {name: name},
                    {price: price}
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveProducts', async (req, res) => {


    var restaurant = new Restaurant({
        productName: req.body.productName,
        price: req.body.price,
        description: req.body.description,
        image: req.body.img1,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        productState: req.body.productState
    });


    console.log(restaurant)

    restaurant.save()
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

    var restaurant = new Restaurant({
        productName: req.body.productName,
        price: req.body.price,
        description: req.body.description,
        image: req.body.img1,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        productState: req.body.productState
    });

    const id = req.body.id;

    console.log(restaurant);

    restaurant.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
