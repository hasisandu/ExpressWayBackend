const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();


const Notification = require('../../query/express/notification/NotificationQuery');


router.get('/getAllNotifications', async (req, res) => {
    let query = {reserveId: req.headers.userid}
    try {
        const list = await Notification.find(query);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});
/*/!* GET home page. *!/
router.get('/getAllProducts/byShopId/:shopId', async (req, res) => {


    const query = {shopId: req.params.shopId}

    try {
        const list = await Product.find(query);
        console.log(list);
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/getProduct/:ProductId', async (req, res) => {

    try {
        const list = await Product.findById(req.params.ProductId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/find/byshopId', async (req, res) => {
    let shop = req.headers.id;
    const query2 = {shopId: shop};
    console.log(query2)
    try {
        const data = await Product.find(query2);

        res.json(data);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/getProduct/searchProduct', async (req, res) => {

    let txt = req.headers.searchtext;

    const name = txt;
    const description = txt;
    const price = txt;
    const discount = txt;
    const Language = txt;
    const title = txt;
    const specs = {txt: txt};
    try {
        const data = await Product.find(
            {
                $or: [
                    {name: / /},
                    {description: /Fuq/},
                    {price: /Fuq/},
                    {discount: /Fuq/},
                    {Language: /Fuq/},
                    {title: /Fuq/},
                    {specs: /Fuq/},
                ]
            }
        );

        res.json(data);


    } catch (e) {
        res.json({message: e});
    }
});*/


router.post('/saveNotification', async (req, res) => {

    console.log(req.body);

    var notification = new Notification({
        senderUserId: req.body.senderUserId,
        reserveId: req.body.reserveId,
        senderUserName: req.body.senderUserName,
        time: req.body.time,
        NotificationState: req.body.NotificationState,
        senderImage: req.body.senderImage,
        message: req.body.message,
        date: req.body.date
    });


    notification.save()
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.delete('/deleteNotification', async (req, res) => {

    const myquery = {_id: req.headers.id};
    console.log(myquery)
    const removed = await Notification.deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        res.send(err);
        res.send(obj.result);
    });

});

/*router.put('/updateProduct', async (req, res) => {


    var bookshop = new Bookshop({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        detail: {
            types: {
                author: req.body.author,
                language: req.body.language,
                translator: req.body.translator
            }
        },
        image: req.body.image,
        qty: req.body.qty,
        category: req.body.category,
        publisher: req.body.publisher,
        publishYear: req.body.publisher,
        pages: req.body.pages,
        ISBN: req.body.isbn,
        shopId: req.body.shopId,
        discountStatus: req.body.discountState
    });

    const id = req.body.id;


    bookshop.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});*/


//-------------------------------------------------------------------------------


module.exports = router;
