const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;


/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const Seller = require('../query/SellerQuery');

/* GET home page. */
router.get('/getAllSeller', async (req, res) => {

    try {
        const list = await Seller.find();

        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/getSeller', async (req, res) => {
    console.log("oooooo");

    const Nic = req.headers.nic;
    const Password = req.headers.password;
    var query = {nic: Nic, password: Password};
    try {
        const list = await Seller.find(query);
        console.log(list);
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

router.post('/saveSeller', async (req, res) => {
    console.log('Coled');
    var seller = new Seller({
        nic: req.body.sellerDTO.nic,
        name: req.body.sellerDTO.name,
        contact: req.body.sellerDTO.contact,
        address: req.body.sellerDTO.address,
        password: req.body.sellerDTO.password,
        isActive: req.body.sellerDTO.isActive
    });

    console.log(req.body.sellerDTO.password)
    seller.save()
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateSeller', async (req, res) => {

    var seller = new Seller({
        nic: req.body.sellerDTO.nic,
        name: req.body.sellerDTO.name,
        contact: req.body.sellerDTO.contact,
        address: req.body.sellerDTO.address,
        password: req.body.sellerDTO.password,
        isActive: req.body.sellerDTO.isActive
    });
    ObId = req.body.sellerDTO.id;
    const list = await Seller.findById(ObId);
    if (!list) {
        res.status(404).send();
    } else {

        list.isActive = seller.isActive;

        list.save(function (err, updatudObject) {
            if (err) {
                console.log(err);
            } else {
                res.send(updatudObject);
            }
        });
    }


    /*seller.updateOne({"_id": ObjectId(ObId)}, {$set: seller}, function (err, result) {
        console.log(result)
    });*/
});


module.exports = router;
