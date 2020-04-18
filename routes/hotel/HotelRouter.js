const express = require('express');
const router = express.Router();

const Hotel = require('../../query/express/hotel/hotel/HotelQuery');

router.get('/getAllHotels', async (req, res) => {

    try {
        const list = await Hotel.find();
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/getAllHotels/isAvailable', async (req, res) => {

    try {
        const list = await Hotel.find({hotelState: true});
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.post('/uploadHotelData', async (req, res) => {

    console.log(req.body)

    try {
        let hotel = new Hotel({
            image1: req.body.image1,
            image2: req.body.image2,
            image3: req.body.image3,
            image4: req.body.image4,
            proprtyType: req.body.proprtyType,
            hotelName: req.body.hotelName,
            facilities: req.body.facilities,
            address: req.body.address,
            email: req.body.email,
            contact1: req.body.contact1,
            contact2: req.body.contact2,
            web: req.body.web,
            bookingLink: req.body.bookingLink,
            fbLink: req.body.fbLink,
            twitterLink: req.body.twitterLink,
            instaLink: req.body.instaLink,
            discription: req.body.discription,
            stars: req.body.stars,
            district: req.body.district,
            city: req.body.city,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            businessTitle: req.body.businessTitle,
            hotelState: req.body.hotelState,
            twentiForHour: req.body.twentiForHour,
            regDate: req.body.regDate,
            regTime: req.body.regTime,
            mainContact: req.body.mainContact,
            mainEmail: req.body.mainEmail,
            paidState: req.body.paidState,
            userName: req.body.userName,
            password: req.body.password,
            avrgPrice: req.body.avrgPrice
        });
        hotel.save()
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
