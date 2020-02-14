const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const Studio = require('../query/StudiosQuery');

/* GET home page. */
router.get('/getAllStudioServices', async (req, res) => {
    try {
        const list = await Studio.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:serviceId', async (req, res) => {
    try {
        const list = await Studio.findById(req.params.serviceId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:serviceId', async (req, res) => {
    try {
        const removed = await Studio.delete(req.params.serviceId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllStudioServices/searchService', async (req, res) => {

    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    try {
        const data = await Studio.find(
            {
                $or: [
                    {name: name},
                    {price: price},
                    {description: description},
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveStudioService', async (req, res) => {


    var studio = new Studio({
        serviceName: req.body.serviceName,
        image: {
            types: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img2
            }
        },
        price: req.body.price,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        serviceState: req.body.serviceState
    });


    console.log(studio)

    studio.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateStudioService', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var studio = new Studio({
        serviceName: req.body.serviceName,
        image: {
            types: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img2
            }
        },
        price: req.body.price,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        serviceState: req.body.serviceState
    });

    const id = req.body.id;


    console.log(studio);

    studio.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
