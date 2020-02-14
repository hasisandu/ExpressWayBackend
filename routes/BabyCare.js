const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const BabyCare = require('../query/BabyCareQuery');

/* GET home page. */
router.get('/getAllBabyCareProducts', async (req, res) => {
    try {
        const list = await BabyCare.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:productId', async (req, res) => {
    try {
        const list = await BabyCare.findById(req.params.productId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:productId', async (req, res) => {
    try {
        const removed = await BabyCare.delete(req.params.productId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllBabyCareProducts/searchBabyCare', async (req, res) => {

    const name = req.body.name;
    const brand = req.body.brand;
    const price = req.body.price;
    const discount = req.body.discount;
    const description = req.body.description;
    const discountState = req.body.discountState;
    try {
        const data = await BabyCare.find(
            {
                $or: [
                    {name: name},
                    {brand: brand},
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

router.post('/saveBabyCare', async (req, res) => {

    var babyCare = new BabyCare({
        name: req.body.name,
        image: {
            type: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img3
            }
        },
        price: req.body.price,
        description: req.body.description,
        qty: req.body.qty,
        productState: req.body.productState,
        productFeatures: req.body.features,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        specification: {
            types: {
                brand: req.body.brand,
                volume: req.body.volume,
                weight: req.body.weight
            }
        }
    });


    console.log(babyCare)

    babyCare.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateBabyCare', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    const updatebabyCare = new BabyCare({
        name: req.body.name,
        image: {
            type: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img3
            }
        },
        price: req.body.price,
        description: req.body.description,
        qty: req.body.qty,
        productState: req.body.productState,
        productFeatures: req.body.features,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        specification: {
            types: {
                brand: req.body.brand,
                volume: req.body.volume,
                weight: req.body.weight
            }
        }
    });

    const id = req.body.id;


    console.log(updatebabyCare);

    updatebabyCare.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
