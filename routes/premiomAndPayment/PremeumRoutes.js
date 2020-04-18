const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();


const Premium = require('../../query/express/paymentsAndPremium/PremiumPeriod');


router.get('/getAllPremiums', async (req, res) => {
    try {
        const list = await Premium.find();
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }

});

router.post('/savePremium', async (req, res) => {

    console.log(req.body)

    try {

        shopId = req.body.shopId;
        dateUntil = req.body.dateUntil;
        dateFrom = req.body.dateFrom;

        const premium = new Premium({
            shopId: shopId,
            trialState: true,
            dateUntil: dateUntil,
            dateFrom: dateFrom
        });

        const OBJ = await Premium.findOne({
            shopId: shopId
        });

        if (OBJ != null) {
            //update
        } else {
            premium.save()
                .then(item => {
                    res.send(item);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }

    } catch (e) {
        res.json({message: e});
    }

});


module.exports = router;
