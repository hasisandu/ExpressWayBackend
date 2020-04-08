const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();


const ContactMessage = require('../../query/express/contactUs/ContactMessageQuery');


router.get('/getAllContacts', async (req, res) => {
    try {
        const list = await Notification.find();
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.post('/saveContactMessage', async (req, res) => {

    try {
        var contactMessage = new ContactMessage({
            senderEmail: req.body.senderEmail,
            senderName: req.body.senderName,
            senderMessage: req.body.senderMessage,
            senderTime: req.body.senderTime,
            senderDate: req.body.senderDate
        });
        contactMessage.save()
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

router.delete('/deleteNotification', async (req, res) => {

    try {
        const myquery = {_id: req.headers.id};
        const removed = await Notification.deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            res.send(err);
            res.send(obj.result);
        });

    } catch (e) {
        res.json({message: e})
    }
});




//-------------------------------------------------------------------------------


module.exports = router;
