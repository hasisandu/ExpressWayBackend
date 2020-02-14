const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const PetShop = require('../query/PetShopsQuery');

/* GET home page. */
router.get('/getAllPets', async (req, res) => {
    try {
        const list = await PetShop.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:petId', async (req, res) => {
    try {
        const list = await PetShop.findById(req.params.petId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:petId', async (req, res) => {
    try {
        const removed = await PetShop.delete(req.params.petId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllPets/searchPets', async (req, res) => {

    const name = req.body.name;
    const price = req.body.price;
    const discount = req.body.discount;
    const description = req.body.description;
    const discountState = req.body.discountState;
    try {
        const data = await PetShop.find(
            {
                $or: [
                    {name: name},
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

router.post('/savePets', async (req, res) => {


    var petShop = new PetShop({
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        description: req.body.description,
        image: req.body.img1,
        qty: req.body.qty,
        productState: req.body.productState
    });


    console.log(petShop)

    petShop.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updatePets', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var petShop = new PetShop({
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        discountState: req.body.discountState,
        shopId: req.body.shopId,
        description: req.body.description,
        image: req.body.img1,
        qty: req.body.qty,
        productState: req.body.productState
    });

    const id = req.body.id;


    console.log(Textile);

    petShop.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
