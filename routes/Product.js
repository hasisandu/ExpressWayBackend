const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;

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

router.get('/:bookId', async (req, res) => {
    try {
        const list = await Bookshop.findById(req.params.bookId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:productId', async (req, res) => {
    const myquery = {_id: req.params.productId};
    const removed = await Product.deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        res.send(err);
        res.send(obj.result);
    });

});


router.post('/getAllBooks/searchBooks', async (req, res) => {

    const name = req.body.name;
    const price = req.body.price;
    const discount = req.body.discount;
    const author = req.body.description;
    const Language = req.body.description;
    const publisher = req.body.description;
    const category = req.body.description;
    const discountState = req.body.discountState;
    try {
        const data = await Bookshop.find(
            {
                $or: [
                    {name: name},
                    {author: author},
                    {discount: discount},
                    {price: price},
                    {Language: Language},
                    {publisher: publisher},
                    {category: category},
                    {discountState: discountState}
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveProduct', async (req, res) => {


    var product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        productState: req.body.productState,
        title: req.body.title,
        shopId: req.body.shopId,
        discountStatus: req.body.discountStatus
    });

    product.save()
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.put('/updateBook', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

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


    console.log(bookshop);

    bookshop.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


//-------------------------------------------------------------------------------

/* GET home page. */
router.get('/getAllBookshopOtherProduct', async (req, res) => {
    try {
        const list = await BookshopOtherProduct.find();
        res.json(list);
    } catch (e) {
        res.json({message: err});
    }

});

router.get('/:otherProductId', async (req, res) => {
    try {
        const list = await BookshopOtherProduct.findById(req.params.otherProductId);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.delete('/:otherProductId', async (req, res) => {
    try {
        const removed = await BookshopOtherProduct.delete(req.params.otherProductId);
        res.json(removed);
    } catch (e) {
        res.json({message: err});
    }

});

router.post('/getAllBookshopOtherProduct/searchOtherProduct', async (req, res) => {

    const name = req.body.name;
    const price = req.body.price;
    const discount = req.body.discount;
    const discountState = req.body.discountState;


    try {
        const data = await BookshopOtherProduct.find(
            {
                $or: [
                    {name: name},
                    {discount: discount},
                    {price: price},
                    {discountState: discountState}
                ]
            }
        );
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

router.post('/saveBookshopOtherProduct', async (req, res) => {


    var otherProduct = new BookshopOtherProduct({
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


    console.log(otherProduct)

    otherProduct.save()
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});

router.put('/updateBook', async (req, res) => {

    console.log(req.body.name);
    console.log(req.body.description);

    var bookshopOtherProduct = new BookshopOtherProduct({
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


    console.log(bookshop);

    bookshopOtherProduct.updateOne({"_id": ObjectId(id)})
        .then(item => {
            res.send(item + " item saved to database");
        })
        .catch(err => {
            res.status(400).send(err + "unable to save to database");
        });
});


module.exports = router;
