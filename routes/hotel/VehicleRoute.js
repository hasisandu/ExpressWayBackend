const express = require('express');
const router = express.Router();

const Vehicle = require('../../query/express/hotel/Vehicle/VehicleQuery');

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

router.post('/saveVehicle', async (req, res) => {
    try {
        let vehicle = new Vehicle({
            image1: req.body.image1,
            image2: req.body.image2,
            image3: req.body.image3,
            image4: req.body.image4,
            vehicleType: req.body.vehicleType,
            facilities: req.body.facilities,
            contact1: req.body.contact1,
            contact2: req.body.contact2,
            description: req.body.description,
            district: req.body.district,
            city: req.body.city,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            jobType: req.body.jobType,
            vehicleName: req.body.vehicleName,
            regDate: req.body.regDate,
            regTime: req.body.regTime,
            mainContact: req.body.mainContact,
            mainEmail: req.body.mainEmail,
            paidState: req.body.paidState,
            VehicelState: req.body.VehicelState,
            userName: req.body.userName,
            password: req.body.password,
            fbLink: req.body.fbLink,
            twitterLink: req.body.twitterLink,
            instaLink: req.body.instaLink,
            driverLicense: req.body.driverLicense,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            address: req.body.address,
            availableLang: req.body.availableLang,
            passengers: Number(req.body.passengers),
            door: Number(req.body.door),
            suitcase: Number(req.body.suitcase),
            airCondition: req.body.airCondition,
            transemison: req.body.transemison,
            heibrid: req.body.heibrid,
            featuredState: req.body.featuredState
        });
        vehicle.save()
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
