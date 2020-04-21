const express = require('express');
const router = express.Router();

const ActivityRoute = require('../../query/express/hotel/activities/ActivitiesQuey');

router.get('/getAllActivities', async (req, res) => {

    try {
        const list = await ActivityRoute.find();
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/getAllActivities/isAvailable', async (req, res) => {

    try {
        const list = await ActivityRoute.find({activityState: true});
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.post('/saveActivity', async (req, res) => {


    try {
        let Activity = new ActivityRoute({
            image1: req.body.image1,
            image2: req.body.image2,
            image3: req.body.image3,
            image4: req.body.image4,
            image5: req.body.image5,
            city: req.body.city,
            district: req.body.district,
            activityName: req.body.activityName,
            contact1: req.body.contact1,
            email: req.body.email,
            web: req.body.web,
            faceBookLink: req.body.faceBookLink,
            twitterLink: req.body.twitterLink,
            instagramLink: req.body.instagramLink,
            youtubeLink: req.body.youtubeLink,
            fromPrice: req.body.fromPrice,
            featureStated: req.body.featureStated,
            ActivityCatagery: req.body.ActivityCatagery,
            heightlights: req.body.heightlights,
            address: req.body.address,
            description: req.body.description,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            businessTitle: req.body.businessTitle,
            activityState: req.body.activityState,
            regDate: req.body.regDate,
            regTime: req.body.regTime,
            mainContact: req.body.mainContact,
            mainEmail: req.body.mainEmail,
            paidState: req.body.paidState,
            userName: req.body.userName,
            password: req.body.password,
        });
        Activity.save()
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
