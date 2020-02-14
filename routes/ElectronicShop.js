const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const ElectronicShop = require('../query/ElectronicShopQuery');
const ElectronicShopOtherProduct = require('../query/ElectronicShopQuery');

/* GET home page. */
router.get('/getAllElectronics', async (req, res) => {
    try {
        const list = await ElectronicShop.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:electronicId', async (req, res) => {
    try {
        const list = await ElectronicShop.findById(req.params.electronicId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:electronicId', async (req, res) => {
    try {
        const removed = await ElectronicShop.delete(req.params.electronicId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllElectronics/searchElectronic', async (req, res) => {

    const name = req.body.name;
    const brand = req.body.brand;
    const price = req.body.price;
    const category = req.body.category;
    const description = req.body.description;
    const discount = req.body.discount;
    const discountState = req.body.discountState;

    try {
        const data = await ElectronicShop.find(
            {
                $or: [
                    {name: name},
                    {brand: brand},
                    {price: price},
                    {category: category},
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

router.post('/saveElectronic', async (req, res) => {


    var electronicShop = new ElectronicShop({
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
        description: req.body.description,
        discount: req.body.discount,
        warranty: req.body.warranty,
        shopId: req.body.shopId,
        discountStatus: req.body.discountState
    });


    console.log(electronicShop)

    electronicShop.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateElectronic', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var electronicShop = new ElectronicShop({
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
        description: req.body.description,
        discount: req.body.discount,
        warranty: req.body.warranty,
        shopId: req.body.shopId,
        discountStatus: req.body.discountState
    });

    const id = req.body.id;


    console.log(ElectronicShop);

    ElectronicShop.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

//------------------------------------------------------------------------------


/* GET home page. */
router.get('/getAllOtherElectronics', async (req, res) => {
    try {
        const list = await ElectronicShopOtherProduct.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:otherelectroid', async (req, res) => {
    try {
        const list = await ElectronicShopOtherProduct.findById(req.params.otherelectroid);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:otherelectroid', async (req, res) => {
    try {
        const removed = await ElectronicShopOtherProduct.delete(req.params.otherelectroid);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllOtherElectronics/searchOtherElectronic', async (req, res) => {

    const name = req.body.name;
    const brand = req.body.brand;
    const price = req.body.price;
    const category = req.body.category;
    const description = req.body.description;
    const discount = req.body.discount;
    const discountState = req.body.discountState;

    try {
        const data = await ElectronicShopOtherProduct.find(
            {
                $or: [
                    {name: name},
                    {brand: brand},
                    {price: price},
                    {category: category},
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

router.post('/saveOtherElectronic', async (req, res) => {


    var electronicShopOtherProduct = new ElectronicShopOtherProduct({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        detail: req.body.detail,
        image: req.body.img1,
        qty: req.body.qty,
        shopId: req.body.shopId,
        discountStatus: req.body.discountState
    });


    console.log(electronicShopOtherProduct)

    electronicShopOtherProduct.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateOtherElectronic', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var electronicShopOtherProduct = new ElectronicShopOtherProduct({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        detail: req.body.detail,
        image: req.body.img1,
        qty: req.body.qty,
        shopId: req.body.shopId,
        discountStatus: req.body.discountState
    });

    const id = req.body.id;


    console.log(electronicShopOtherProduct);

    electronicShopOtherProduct.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
