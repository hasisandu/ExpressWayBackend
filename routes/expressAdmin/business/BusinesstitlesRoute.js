const express = require('express');
const router = express.Router();


const BusinessTitleRoutes = require('../../../query/express/business/BusinessTitle');


router.post('/saveBusinessTitle', async (req, res) => {
    try {
        var businessTitle = new BusinessTitleRoutes({
            state: req.body.state,
            title: req.body.title,
        });

        let temp = await BusinessTitleRoutes.findOne({title: {$regex: req.body.title, $options: "i"}})

        if (temp != null) {
            res.send(temp);
        } else {
            businessTitle.save()
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

router.get('/getAllBusinessTitles', async (req, res) => {
    try {
        const list = await BusinessTitleRoutes.find({state: true});
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }
});

router.get('/deleteBusinessTitle', async (req, res) => {
    try {
        const list = await BusinessTitleRoutes.deleteOne({_id: req.headers.id});
        res.json(list);
    } catch (e) {
        res.json({message: e});
    }
});


module.exports = router;
