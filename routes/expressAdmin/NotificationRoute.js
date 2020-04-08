const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();


const Notification = require('../../query/express/notification/NotificationQuery');


router.get('/getAllNotifications', async (req, res) => {
    try {
        let query = {reserveId: req.headers.userid}

        const list = await Notification.find(query);
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.get('/getNotificationCount', async (req, res) => {
    try {
        let query = {reserveId: req.headers.user}
        console.log(query)
        const list = await Notification.count(query);
        res.json({count: list});
    } catch (e) {
        res.json({message: e});
    }

});

router.post('/saveNotification', async (req, res) => {
    try {
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

module.exports = router;
