const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const Spa = require('../query/SpaQuery');

/* GET home page. */
router.get('/getAllSpaServices', async (req, res) => {
    try {
        const list = await Spa.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:spaServiceId', async (req, res) => {
    try {
        const list = await Spa.findById(req.params.spaServiceId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:serviceId', async (req, res) => {
    try {
        const removed = await Spa.delete(req.params.serviceId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllSpaServices/searchServices', async (req, res) => {

    const name = req.body.name;
    const price = req.body.price;
    try {
        const data = await Spa.find(
            {
                $or: [
                    {name: name},
                    {price: price},
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveSpa', async (req, res) => {


    var spa = new Spa({
        serviceName: req.body.serviceName,
        image: {
            types: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img3
            }
        },
        price: req.body.price,
        discount: req.body.price,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        serviceState: req.body.serviceState
    });


    console.log(spa)

    spa.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateSpaService', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var spa = new Spa({
        serviceName: req.body.serviceName,
        image: {
            types: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img3
            }
        },
        price: req.body.price,
        discount: req.body.price,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        serviceState: req.body.serviceState
    });

    const id = req.body.id;


    console.log(spa);

    spa.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
