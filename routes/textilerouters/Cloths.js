const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const Cloths = require('../../query/textile/ClothsQuery');

/* GET home page. */
router.get('/getAllCloths', async (req, res) => {
    try {
        const list = await Cloths.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:clothId', async (req, res) => {
    try {
        const list = await BabyCare.findById(req.params.clothId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:productId', async (req, res) => {
    const myquery = {_id: req.params.productId};

    const removed = await BabyCare.deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        res.send(err);
        res.send(obj.result);
    });
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

router.post('/savecloth', async (req, res) => {

    var clothTemp = new Cloths({
        productId: req.body.productId,
        productTitle: req.body.productTitle,
        productType: req.body.productType,
        madeFor: req.body.madeFor,
        price: req.body.price,
        discount: req.body.discount,
        discountState: req.body.discountState,
        onlineAvailable: req.body.onlineAvailable,
        productState: req.body.productState,
        productQTY: req.body.productQTY,
        description: req.body.description,
        bestSellerState: req.body.bestSellerState,
        Size: req.body.Size,
        Color: req.body.Color,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3
    });


    clothTemp.save()
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateBabyCare', async (req, res) => {

    const updatebabyCare = new BabyCare({
        name: req.body.name,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        price: req.body.price,
        description: req.body.description,
        qty: req.body.qty,
        productState: req.body.productState,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        brand: req.body.brand,
        volume: req.body.volume,
        weight: req.body.weight
    });

    const id = req.body.id;

    updatebabyCare.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
