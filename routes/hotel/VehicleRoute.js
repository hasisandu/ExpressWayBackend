const express = require('express');
const router = express.Router();

const PropertyType = require('../../query/express/hotel/propertytype/PropertyTypeQuery');

router.get('/getAllProperties', async (req, res) => {

    try {
        const list = await PropertyType.find();
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/getAllProperties/isAvailable', async (req, res) => {

    try {
        const list = await PropertyType.find({propertyState: true});
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.post('/saveHotelProperty', async (req, res) => {
    try {
        let property = new PropertyType({
            propertyState: req.body.propertyState,
            propertyName: req.body.propertyName,
            image: req.body.image
        });
        property.save()
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
