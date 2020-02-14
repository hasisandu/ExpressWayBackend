const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const Computershop = require('../query/ComputerShopQuery');
const ComputerShopshopOtherProduct = require('../query/ComputerShopQuery');

/* GET home page. */
router.get('/getAllComputers', async (req, res) => {
    try {
        const list = await Computershop.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:computerId', async (req, res) => {
    try {
        const list = await Computershop.findById(req.params.computerId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:computerId', async (req, res) => {
    try {
        const removed = await Computershop.delete(req.params.computerId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllComputers/searchComputer', async (req, res) => {

    const name = req.body.name;
    const category = req.body.category;
    const brand = req.body.brand;
    const price = req.body.price;
    const discount = req.body.discount;
    const processor = req.body.processor;
    const storage = req.body.storage;
    const discountState = req.body.discountState;
    try {
        const data = await Computershop.find(
            {
                $or: [
                    {category: category},
                    {processor: processor},
                    {storage: storage},
                    {name: name},
                    {brand: brand},
                    {price: price},
                    {discount: discount},
                    {discountState: discountState}
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveComputer', async (req, res) => {


    var computershop = new Computershop({
        category: req.body.category,
        name: req.body.name,
        brand: req.body.brand,
        image: {
            type: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img3,
                img4: req.body.img4
            }
        },
        price: req.body.price,
        SKV: req.body.skv,
        description: {
            types: {
                processor: req.body.processor,
                memory: req.body.memory,
                storage: req.body.storage,
                graphicCard: req.body.graphicCard,
                display: req.body.display,
                camera: req.body.camera,
                operatingSystem: req.body.os,
                audio: req.body.audio,
                network: req.body.network
            }
        },
        warranty: req.body.warranty,
        shopId: req.body.shopid,
        discountStatus: req.body.discountStatus
    });


    console.log(computershop)

    computershop.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateComputer', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var computershop = new Computershop({
        category: req.body.category,
        name: req.body.name,
        brand: req.body.brand,
        image: {
            type: {
                img1: req.body.img1,
                img2: req.body.img2,
                img3: req.body.img3,
                img4: req.body.img4
            }
        },
        price: req.body.price,
        SKV: req.body.skv,
        description: {
            types: {
                processor: req.body.processor,
                memory: req.body.memory,
                storage: req.body.storage,
                graphicCard: req.body.graphicCard,
                display: req.body.display,
                camera: req.body.camera,
                operatingSystem: req.body.os,
                audio: req.body.audio,
                network: req.body.network
            }
        },
        warranty: req.body.warranty,
        shopId: req.body.shopid,
        discountStatus: req.body.discountStatus
    });

    const id = req.body.id;


    console.log(computershop);

    Computershop.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


//----------------------------------------------------------------

router.get('/getAllComputerParts', async (req, res) => {
    try {
        const list = await ComputerShopshopOtherProduct.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:computerPartId', async (req, res) => {
    try {
        const list = await ComputerShopshopOtherProduct.findById(req.params.computerPartId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:computerPartId', async (req, res) => {
    try {
        const removed = await ComputerShopshopOtherProduct.delete(req.params.computerPartId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllComputerParts/searchComputerParts', async (req, res) => {

    const name = req.body.name;
    const category = req.body.category;
    const brand = req.body.brand;
    const price = req.body.price;
    const discountState = req.body.discountState;
    try {
        const data = await ComputerShopshopOtherProduct.find(
            {
                $or: [
                    {category: category},
                    {name: name},
                    {brand: brand},
                    {price: price},
                    {discountState: discountState},
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveComputer', async (req, res) => {


    var computershopProduct = new ComputerShopshopOtherProduct({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
        discount: req.body.discount,
        detail: req.body.detail,
        image: req.body.image,
        qty: req.body.qty,
        shopId: req.body.shopId,
        discountStatus: req.body.discountState
    });


    console.log(computershopProduct)

    computershopProduct.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateComputerProduct', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var computershopProduct = new ComputerShopshopOtherProduct({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
        discount: req.body.discount,
        detail: req.body.detail,
        image: req.body.image,
        qty: req.body.qty,
        shopId: req.body.shopId,
        discountStatus: req.body.discountState
    });

    const id = req.body.id;


    console.log(computershopProduct);

    computershopProduct.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
