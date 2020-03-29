const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const Business = require('../query/BusinessQuery');

/* GET home page. */
router.get('/getAllBusiness', async (req, res) => {

    try {
        const list = await Business.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});


router.get('/getCount', async (req, res) => {

    var query = {businessTitle: req.headers.shoptitle};
    try {
        const list = await Business.find(query);
        res.json(list.length);
    } catch (e) {
        res.json({message: err});
    }

});

/*/////////////////////////////////////////////////////////////*/

router.get('/getTextileShops', async (req, res) => {
    var query = {businessTitle: "Textiles "};
    try {
        const list = await Business.find(query);
        console.log(list);
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/find/byTitle', async (req, res) => {
    var query = {businessTitle: req.headers.businesstitle};
    try {
        const list = await Business.find(query);
        console.log(list);
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

/*/////////////////////////////////////////////////////////////*/


/*/:shopId*/
router.get('/getShop/:shopId', async (req, res) => {
    console.log(req.params.shopId);
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

    const shopId = req.headers.registersellerid;
    const registerDate = req.headers.registerdate;
    const query = {registerSellerId: registerSellerId, registerDate: registerDate};
    try {
        const data = await Business.find(query);
        res.json(data.length);
    } catch (e) {
        res.json({message: e});
    }
});

router.get('/getBusinessByUser', async (req, res) => {

    let user = req.headers.username;
    let password = req.headers.password;


    const query = {userName: user, password: password};
    try {
        const data = await Business.findOne(query);
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});


router.get('/getUser/byUserName', async (req, res) => {

    let user = req.headers.username;
    const query = {userName: user};
    try {
        const data = await Business.findOne(query);

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
    var business = new Business({
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        image4: req.body.image4,
        ownerNIC: req.body.ownerNIC,
        ownerName: req.body.ownerName,
        businessTitle: req.body.businessTitle,
        shopName: req.body.shopName,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        city: req.body.city,
        address: req.body.address,
        contact1: req.body.contact1,
        contact2: req.body.contact2,
        shopState: req.body.shopState,
        openTime: req.body.openTime,
        endTime: req.body.endTime,
        openState: req.body.openState,
        website: req.body.website,
        userName: req.body.userName,
        password: req.body.password,
        registerDate: req.body.registerDate,
        mainContact: req.body.mainContact,
    });
    console.log(req.body.ownerNIC)
    business.save()
        .then(item => {
            res.send(item);
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
