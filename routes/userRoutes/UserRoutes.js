const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;


const User = require('../../query/user/User');


router.post('/saveUser', async (req, res) => {

    var user = new User({
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        email: req.body.email.trim(),
        contact: req.body.contact.trim(),
        image: req.body.image,
    });
    try {
        const data = await User.findOne(
            {
                $or: [
                    {contact: req.body.contact},
                    {email: req.body.email}
                ]
            }
        );

        if (data != null) {
            res.send(data)
        } else {
            user.save()
                .then(item => {
                    res.send(item);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }


    } catch (e) {
    }
});


router.post('/updateUser', async (req, res) => {

    console.log(req.body._id);

    const filter = {_id: req.body._id};
    const update = {
        firstName: req.body.fName.trim(),
        lastName: req.body.lName.trim(),
        email: req.body.email.trim(),
        contact: req.body.contact.trim(),
        image: req.body.image,
    };

    let doc = await User.findOneAndUpdate(filter, update, {
        new: true
    });
    res.send(doc)
    console.log(filter);
});


router.post('/getUser', async (req, res) => {

    console.log(req.body.value);
    try {
        const data = await User.findOne({
            $or: [
                {email: req.body.value},
                {contact: req.body.value},
            ]
        });
        console.log(data)
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});


router.get('/getUser/byId', async (req, res) => {

    var query = {_id: req.headers.id}
    console.log(query)
    try {
        const data = await User.findOne(query);
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});

module.exports = router;
