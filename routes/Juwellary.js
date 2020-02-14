const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const JewelleryShop = require('../query/JewelleryShop');

/* GET home page. */
router.get('/getProduct', async (req, res) => {
    try {
        const list = await JewelleryShop.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:productId', async (req, res) => {
    try {
        const list = await JewelleryShop.findById(req.params.productId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:productId', async (req, res) => {
    try {
        const removed = await JewelleryShop.delete(req.params.productId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllProduct/searchProduct', async (req, res) => {

    const name = req.body.name;
    const price = req.body.price;
    const discount = req.body.discount;
    const weight = req.body.weight;
    const discountState = req.body.discountState;
    try {
        const data = await JewelleryShop.find(
            {
                $or: [
                    {name: name},
                    {price: price},
                    {discount: discount},
                    {weight: weight},
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


    var jewelleryShop = new JewelleryShop({
        name: req.body.name,
        category: req.body.category,
        image: {
            type: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img3,
                img4: req.body.img4
            }
        },
        price: req.body.price,
        description: req.body.description,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        weight: req.body.weight,
        productState: req.body.productState
    });


    console.log(jewelleryShop)

    jewelleryShop.save()
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

    var jewelleryShop = new JewelleryShop({
        name: req.body.name,
        category: req.body.category,
        image: {
            type: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img3,
                img4: req.body.img4
            }
        },
        price: req.body.price,
        description: req.body.description,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        weight: req.body.weight,
        productState: req.body.productState
    });

    const id = req.body.id;


    console.log(jewelleryShop);

    jewelleryShop.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
