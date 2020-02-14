const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const Saloon = require('../query/SaloonQuery');
const SaloonProduct = require('../query/SaloonQuery');

/* GET home page. */
router.get('/getAllSaloonServices', async (req, res) => {
    try {
        const list = await Saloon.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:saloonId', async (req, res) => {
    try {
        const list = await Saloon.findById(req.params.saloonId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:saloonId', async (req, res) => {
    try {
        const removed = await Saloon.delete(req.params.saloonId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllSaloonServices/searchSalons', async (req, res) => {

    const serviceName = req.body.name;
    const price = req.body.price;

    try {
        const data = await Saloon.find(
            {
                $or: [
                    {serviceName: serviceName},
                    {price: price}
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveSalons', async (req, res) => {


    var saloon = new Saloon({
        serviceName: req.body.serviceName,
        image: {
            types: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img3
            }
        },
        price: req.body.price,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        serviceState: req.body.serviceState
    });


    console.log(saloon)

    saloon.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateSalon', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var saloon = new Saloon({
        serviceName: req.body.serviceName,
        image: {
            types: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img3
            }
        },
        price: req.body.price,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        serviceState: req.body.serviceState
    });

    const id = req.body.id;


    console.log(saloon);

    saloon.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

//--------------------------------------------------------------------------


/* GET home page. */
router.get('/getAllSaloonProducts', async (req, res) => {
    try {
        const list = await SaloonProduct.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:productId', async (req, res) => {
    try {
        const list = await SaloonProduct.findById(req.params.productId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:productId', async (req, res) => {
    try {
        const removed = await SaloonProduct.delete(req.params.productId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllSaloonProducts/searchSalonProducts', async (req, res) => {

    const productName = req.body.name;
    const price = req.body.price;
    const description = req.body.description;

    try {
        const data = await SaloonProduct.find(
            {
                $or: [
                    {name: productName},
                    {price: price},
                    {description: description}
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveSalonProduct', async (req, res) => {


    var saloonProduct = new SaloonProduct({
        name: req.body.name,
        image: req.body.img1,
        price: req.body.price,
        discount: req.body.discount,
        discountState: req.body.discountState,
        description: req.body.description,
        shopId: req.body.shopId,
        productState: req.body.productState
    });


    console.log(saloonProduct)

    saloonProduct.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateSalonProduct', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var saloonProduct = new SaloonProduct({
        name: req.body.name,
        image: req.body.img1,
        price: req.body.price,
        discount: req.body.discount,
        discountState: req.body.discountState,
        description: req.body.description,
        shopId: req.body.shopId,
        productState: req.body.productState
    });

    const id = req.body.id;


    console.log(saloon);

    saloonProduct.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
