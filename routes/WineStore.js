const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const WineStore = require('../query/wineStoreQuery');

/* GET home page. */
router.get('/getAllLiquors', async (req, res) => {
    try {
        const list = await WineStore.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:liquorId', async (req, res) => {
    try {
        const list = await WineStore.findById(req.params.liquorId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:liquorId', async (req, res) => {
    try {
        const removed = await WineStore.delete(req.params.liquorId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllLiquors/searchLiquors', async (req, res) => {

    const name = req.body.name;
    const featuredState = req.body.brand;
    const weight = req.body.price;
    const country = req.body.discount;
    const age = req.body.description;

    try {
        const data = await WineStore.find(
            {
                $or: [
                    {name: name},
                    {featuredState: featuredState},
                    {weight: weight},
                    {country: country},
                    {age: age},
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveLiquor', async (req, res) => {


    var wineStore = new WineStore({
        name: req.body.name,
        featuredState: req.body.featuredState,
        weight: req.body.weight,
        country: req.body.country,
        age: req.body.age,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        Varietal: req.body.Varietal,
        description: req.body.description,
        discount: req.body.discount,
        qty: req.body.qty,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        ProductState: req.body.ProductState

    });


    console.log(wineStore)

    wineStore.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateLiquor', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var wineStore = new WineStore({
        name: req.body.name,
        featuredState: req.body.featuredState,
        weight: req.body.weight,
        country: req.body.country,
        age: req.body.age,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        Varietal: req.body.Varietal,
        description: req.body.description,
        discount: req.body.discount,
        qty: req.body.qty,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        ProductState: req.body.ProductState

    });

    const id = req.body.id;


    console.log(wineStore);

    wineStore.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
