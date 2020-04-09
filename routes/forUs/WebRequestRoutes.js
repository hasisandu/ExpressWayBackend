const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();


const WebRequest = require('../../query/express/forUs/WebRequestQuery');


router.get('/getAllWebRequests', async (req, res) => {
    try {
        const list = await WebRequest.find();
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});


router.post('/saveWebRequest', async (req, res) => {
    try {


        var webRequest = new WebRequest({
            businessName: req.body.businessName,
            contact: req.body.contact,
            date: req.body.date
        });

        let one = await WebRequest.findOne({businessName: req.body.businessName, contact: req.body.contact});
        console.log(one)
        if (one != null) {
            res.send(one);
        } else {
            webRequest.save()
                .then(item => {
                    res.send(item);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }

    } catch (e) {
        res.json({message: e})
    }
});

router.delete('/deleteWebRequest', async (req, res) => {

    try {
        const myquery = {_id: req.headers.id};
        const removed = await WebRequest.deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            res.send(err);
            res.send(obj.result);
        });
    } catch (e) {
        res.json({message: e})
    }


});

module.exports = router;
