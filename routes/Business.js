const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;



const Business = require('../query/BusinessQuery');

router.get('/getAllBusiness', async (req, res) => {

    try {
        const list = await Business.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});


router.get('/getCount', async (req, res) => {
    try {
    var query = {businessTitle: req.headers.shoptitle};
        const list = await Business.find(query);
        res.json(list.length);
    } catch (e) {
        res.json({message: err});
    }

});

/*/////////////////////////////////////////////////////////////*/

router.get('/getTextileShops', async (req, res) => {
    try {
        var txt = req.headers.txt;

        const list = await Business.find({
            $and: [
                {businessTitle: {$regex: "Textiles", $options: "i"}},
                {city: {$regex: txt, $options: "i"}},
            ]
        });
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/find/byTitle', async (req, res) => {
    try {
        const list = await Business.find({
            $and: [
                {businessTitle: {$regex: req.headers.businesstype, $options: "i"}},
                {city: {$regex: req.headers.txt, $options: "i"}},
            ]
        });
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/getShop/:shopId', async (req, res) => {
    try {
        const list = await Business.findById(req.params.shopId);
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

router.get('/getAllShops/searchShops', async (req, res) => {
    try {
        const shopId = req.headers.registersellerid;
        const registerDate = req.headers.registerdate;
        const query = {registerSellerId: registerSellerId, registerDate: registerDate};
        const data = await Business.find(query);
        res.json(data.length);
    } catch (e) {
        res.json({message: e});
    }
});

router.get('/getBusinessByUser', async (req, res) => {
    try {

        let number = req.headers.number;
        let email = req.headers.email;
        const query = {mainContact: number, mainEmail: email};

        const data = await Business.findOne(query);
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});


router.get('/getUser/byUserName', async (req, res) => {
    try {
        let user = req.headers.username;
        const data = await Business.findOne({userName: {$regex: user, $options: "i"}});

        if (data != null) {
            res.send(true)
        } else {
            res.send(false)
        }


    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveBusiness', async (req, res) => {

    try {
        var business = new Business({
            image1: req.body.image1,
            image2: req.body.image2,
            image3: req.body.image3,
            image4: req.body.image4,
            businessTitle: req.body.businessTitle,
            shopName: req.body.shopName,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            city: req.body.city,
            address: req.body.address,
            contact1: req.body.contact1,
            shopState: req.body.shopState,
            openTime: req.body.openTime,
            endTime: req.body.endTime,
            website: req.body.website,
            redDate: req.body.redDate,
            redTime: req.body.redTime,
            mainContact: req.body.mainContact,
            mainEmail: req.body.mainEmail,
            paidState: req.body.paidState,
        });
        business.save()
            .then(item => {
                res.send(item);
            })
            .catch(err => {
                res.status(400).send(err + "unable to save to database");
            });
    } catch (e) {
        res.json({message: e})
    }

});

router.post('/updateBusinessContact', async (req, res) => {

    try {
        const filter = {mainContact: req.body.oldnumber};
        const update = {
            mainContact: req.body.number.trim(),
            mainEmail: req.body.number.trim()
        };

        let doc = await Business.update({multi: true});
        res.send(doc)
    } catch (e) {
        res.json({message: e})
    }

});


router.get('/updateBusinessContact', async (req, res) => {
    try {
        Business
            .find({_id: '5e809b2b4686c72c4a97e666'})
            .populate('clientId', {name: 1}).exec(function (err, clientTask) {
            if (!clientTask) {
                res.status(404).json({message: 'Client task not found'})
            }
        });
    } catch (e) {
        res.json({message: e})
    }

});

router.get('/getAllBusinessCount', async (req, resp) => {

    try {
        const mobileShopCount = await Business.count({businessTitle: {$regex: 'Mobile Shop', $options: "i"}});
        const saloonAndSpaCount = await Business.count({businessTitle: {$regex: 'Spa & Health Care', $options: "i"}});
        const vehicleYardCount = await Business.count({businessTitle: {$regex: 'Vehicle shop', $options: "i"}});
        const pharmacyCount = await Business.count({businessTitle: {$regex: 'Pharmacy', $options: "i"}});
        const restaurantCount = await Business.count({businessTitle: {$regex: 'Restaurant', $options: "i"}});


        resp.send({
            mobileShopCount: mobileShopCount,
            saloonAndSpaCount: saloonAndSpaCount,
            vehicleYardCount: vehicleYardCount,
            pharmacyCount: pharmacyCount,
            restaurantCount: restaurantCount
        })

    } catch (e) {
        resp.send(e)
    }


});

router.get('/getBusinessCountByCity/forAdmin', async (req, res) => {

    try {
        let dataListCount = await Business.count({
            $and: [
                {businessTitle: {$regex: req.headers.title, $options: "i"}},
                {city: {$regex: req.headers.city, $options: "i"}},
            ]
        });
        res.send({count: dataListCount});
    } catch (e) {
        res.json({message: e})
    }

});


module.exports = router;
