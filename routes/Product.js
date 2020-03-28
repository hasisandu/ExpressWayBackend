const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();


router.post('/upload', (req, res) => {
    res.send({image: req.file});
});


/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/


const Product = require('../query/ProductQuery');


/* GET home page. */
router.get('/getAllProducts', async (req, res) => {
    console.log("ok");
    try {
        const list = await Product.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

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

    let shop = req.headers.shopid;
    const query = {shopId: shop};
    try {
        const data = await Product.find(query);
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/deleteProduct', async (req, res) => {

    const myquery = {_id: req.headers.productid};
    const removed = await Product.deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        res.send(err);
        res.send(obj.result);
    });

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
});


router.post('/saveProduct', async (req, res) => {

    console.log(req.body);

    var product = new Product({
        name: req.body.productName,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        image1: req.body.image1,
        image2: req.body.image2,
        featuredState: req.body.featuredState,
        title: req.body.title,
        shopId: req.body.shopId,
        availability: req.body.availability,
        discountStatus: req.body.discountState,
        specs: req.body.specs
    });


    product.save()
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.put('/updateProduct', async (req, res) => {


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
});


//-------------------------------------------------------------------------------


module.exports = router;
