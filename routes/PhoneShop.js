const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const PhoneShop = require('../query/PhoneShopQuery');

/* GET home page. */
router.get('/getAllPhones', async (req, res) => {
    try {
        const list = await PhoneShop.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:phoneId', async (req, res) => {
    try {
        const list = await PhoneShop.findById(req.params.phoneId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:phoneId', async (req, res) => {
    try {
        const removed = await PhoneShop.delete(req.params.phoneId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllPhones/searchPhones', async (req, res) => {

    const name = req.body.name;
    const brand = req.body.brand;
    const price = req.body.price;
    const discount = req.body.discount;
    const description = req.body.description;
    const modal = req.body.modal;
    const discountState = req.body.discountState;

    try {
        const data = await TextilesPost.find(
            {
                $or: [
                    {name: name},
                    {brand: brand},
                    {price: price},
                    {discount: discount},
                    {description: description},
                    {modal: modal},
                    {discountState: discountState}
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/savePhone', async (req, res) => {


    var phoneShop = new PhoneShop({
        brand: req.body.brand,
        name: req.body.name,
        modal: req.body.modal,
        price: req.body.price,
        discount: req.body.discount,
        discountState: req.body.discountState,
        description: req.body.description,
        productFeatures: req.body.productFeatures,
        shopId: req.body.shopId,
        productState: req.body.productState,
        image: {
            types: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img3
            }
        },
        qty: req.body.qty
    });


    console.log(phoneShop)

    phoneShop.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateTextiles', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var phoneShop = new PhoneShop({
        brand: req.body.brand,
        name: req.body.name,
        modal: req.body.modal,
        price: req.body.price,
        discount: req.body.discount,
        discountState: req.body.discountState,
        description: req.body.description,
        productFeatures: req.body.productFeatures,
        shopId: req.body.shopId,
        productState: req.body.productState,
        image: {
            types: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img3
            }
        },
        qty: req.body.qty
    });

    const id = req.body.id;


    console.log(phoneShop);

    phoneShop.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
