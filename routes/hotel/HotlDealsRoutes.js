const express = require('express');
const router = express.Router();

const HotDeals = require('../../query/express/hotel/hotdeals/HotDealsQuery');

router.get('/getAllHotDeals', async (req, res) => {

    try {
        const list = await HotDeals.find();
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/getAllHotDeals/limited', async (req, res) => {

    try {
        const list = await HotDeals.find().limit(10);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});
1

router.post('/uploadHotDeals', async (req, res) => {

    try {
        let hotDeals = new HotDeals({
            hotelId: req.body.hotelId,
            hotelImage: req.body.hotelImage,
            district: req.body.district,
            city: req.body.city,
            date: req.body.date,
            description: req.body.description
        });
        hotDeals.save()
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

module.exports = router;
