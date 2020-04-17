const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;



const Business = require('../query/BusinessQuery');

router.get('/getAllBusiness', async (req, res) => {

    try {
        const list = await Business.find({shopState: true});
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});


router.get('/getCount', async (req, res) => {
    try {
        var query = {businessTitle: req.headers.shoptitle, shopState: true};
        const list = await Business.find(query);
        res.json(list.length);
    } catch (e) {
        res.json({message: e});
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
                {shopState: true}
            ]
        });
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/find/byTitle', async (req, res) => {
    try {
        const list = await Business.find({
            $and: [
                {businessTitle: {$regex: req.headers.businesstype, $options: "i"}},
                {city: {$regex: req.headers.txt, $options: "i"}},
                {shopState: true}
            ]
        });
        res.json(list);
    } catch (e) {
        res.json({message: e});
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



router.get('/getAllShops/searchShops', async (req, res) => {
    try {
        const shopId = req.headers.registersellerid;
        const registerDate = req.headers.registerdate;
        const query = {registerSellerId: registerSellerId, registerDate: registerDate, shopState: true};
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
        const query = {mainContact: number, mainEmail: email, shopState: true};

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
            twentyFour: req.body.twentyFour,
            website: req.body.website,
            redDate: req.body.redDate,
            redTime: req.body.redTime,
            mainContact: req.body.mainContact,
            mainEmail: req.body.mainEmail,
            paidState: req.body.paidState,
            userName: req.body.userName,
            password: req.body.password,
        });
        business.save()
            .then(item => {
                res.send(item);
            })
            .catch(err => {
                res.status(400).send(err);
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
        const mobileShopCount = await Business.count({
            shopState: true,
            businessTitle: {$regex: 'Mobile Shop', $options: "i"}
        });
        const saloonAndSpaCount = await Business.count({
            shopState: true,
            businessTitle: {$regex: 'Spa & Health Care', $options: "i"}
        });
        const vehicleYardCount = await Business.count({
            shopState: true,
            businessTitle: {$regex: 'Vehicle shop', $options: "i"}
        });
        const pharmacyCount = await Business.count({
            shopState: true,
            businessTitle: {$regex: 'Pharmacy', $options: "i"}
        });
        const restaurantCount = await Business.count({
            shopState: true,
            businessTitle: {$regex: 'Restaurant', $options: "i"}
        });


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


router.post('/EnablePermison', async (req, res) => {
    console.log('ok')
    try {

        var myquery = {_id: req.body.id};
        var newvalues = {$set: {shopState: true}};
        let business = Business.updateOne(myquery, newvalues, function (err, res) {
        });
        console.log(business)
        res.send(business);
    } catch (e) {
        res.json({message: e})
    }

});


module.exports = router;
