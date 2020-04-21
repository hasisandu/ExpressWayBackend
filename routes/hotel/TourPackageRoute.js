const express = require('express');
const router = express.Router();

const TourPackage = require('../../query/express/hotel/tourpackage/TourPackage');

router.get('/getAllTourPackages', async (req, res) => {

    try {
        const list = await TourPackage.find();
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/getAllTourPackages/isAvailable', async (req, res) => {

    try {
        const list = await TourPackage.find({packageState: true});
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.post('/saveTourPackage', async (req, res) => {


    try {
        let package = new TourPackage({
            image1: req.body.image1,
            image2: req.body.image2,
            image3: req.body.image3,
            image4: req.body.image4,
            image5: req.body.image5,
            city: req.body.city,
            tourName: req.body.tourName,
            contact1: req.body.contact1,
            contact2: req.body.contact2,
            email: req.body.email,
            web: req.body.web,
            faceBookLink: req.body.faceBookLink,
            twitterLink: req.body.twitterLink,
            instagramLink: req.body.instagramLink,
            youtubeLink: req.body.youtubeLink,
            fromPrice: req.body.fromPrice,
            featureStated: req.body.featureStated,
            duration: req.body.duration,
            tourType: req.body.tourType,
            tourCatagery: req.body.tourCatagery,
            groupSize: req.body.groupSize,
            languages: req.body.languages,
            heightlights: req.body.heightlights,
            address: req.body.address,
            description: req.body.description,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            businessTitle: req.body.businessTitle,
            packageState: req.body.packageState,
            regDate: req.body.regDate,
            regTime: req.body.regTime,
            mainContact: req.body.mainContact,
            mainEmail: req.body.mainEmail,
            paidState: req.body.paidState,
            userName: req.body.userName,
            password: req.body.password
        });
        package.save()
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
