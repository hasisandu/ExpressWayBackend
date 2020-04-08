const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var MongoClient = require('mongodb').MongoClient;
const CancelUI = require('../query/CancelUiQuery')
/*/////////////////////////////////////////////////////////////*/
router.get('/getCancelUiDetail', async (req, res) => {
    try {

        var txtNumber = req.headers.number;
        var txtEmail = req.headers.email;

        const Data = await CancelUI.findOne({contactNumber: txtNumber, email: txtEmail});
        res.json(Data);
    } catch (e) {
        res.json({message: e});
    }

});

router.post('/saveCancelUi', async (req, res) => {
    try {
        var cancelUI = new CancelUI({
            contactNumber: req.body.number,
            email: req.body.email,
        });


        const data = await CancelUI.findOne({contactNumber: req.body.number, email: req.body.email});
        console.log(data)
        if (data != null) {
            res.send(data);
        } else {
            cancelUI.save()
                .then(item => {
                    res.send(item);
                })
                .catch(err => {
                    res.status(400).send(err + "unable to save to database");
                });
        }
    } catch (e) {
        res.json({message: e})
    }


});
module.exports = router;
