const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;


/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const TextilesPost = require('../query/TextileQuery');

/* GET home page. */
router.get('/getAllTextiles', async (req, res) => {
    try {
        const list = await TextilesPost.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:textileId', async (req, res) => {
    try {
        const list = await TextilesPost.findById(req.params.textileId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:textileId', async (req, res) => {
    try {
        const removed = await TextilesPost.delete(req.params.textileId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllTextiles/searchTextile', async (req, res) => {

    const name = req.body.name;
    const brand = req.body.brand;
    const price = req.body.price;
    const discount = req.body.discount;
    const description = req.body.description;
    const size = req.body.size;
    const origin = req.body.origin;
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
                    {size: size},
                    {origin: origin},
                    {discountState: discountState}
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveTextiles', async (req, res) => {


    var Textile = new TextilesPost({
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        discount: req.body.discount,
        shop: req.body.shop,
        description: req.body.description,
        color: req.body.color,
        originplace: req.body.originplace,
        avlblqty: req.body.avlblqty,
        discountState: req.body.discountState,
    });


    console.log(Textile)

    Textile.save()
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

    var Textile = new TextilesPost({
        image: {
            type: {
                img1: req.body.image.img1,
                img2: req.body.image.img2,
                img3: req.body.image.img3
            }
        },
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        discount: req.body.discount,
        shop: req.body.shop,
        description: req.body.description,
        color: req.body.color,
        originplace: req.body.originplace,
        avlblqty: req.body.avlblqty,
        discountState: req.body.discountState,
    });

    const id = req.body.id;


    console.log(Textile);

    Textile.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
