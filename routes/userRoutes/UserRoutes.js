const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;


const User = require('../../query/user/User');


router.post('/saveUser', async (req, res) => {

    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contact: req.body.contact,
        image: req.body.image,
    });
    try {
        const data = await User.find(
            {
                $or: [
                    {contact: req.body.contact},
                    {email: req.body.email}
                ]
            }
        );
        if (data.length > 0) {
            console.log(data);
            res.json(data);
        } else {
            user.save()
                .then(item => {
                    res.send(item);
                })
                .catch(err => {
                    res.status(400).send(err + "unable to save to database");
                });
        }

    } catch (e) {
        res.json({message: e});
    }
});


router.post('/getUser', async (req, res) => {

    var query = {userName: req.body.userName, password: req.body.password}

    try {
        const data = await User.find(query);

        console.log(data)
        if (data.length > 0) {
            console.log('done')
        } else {
            console.log('cant')
        }
        res.json(data);
    } catch (e) {
        res.json({message: e});
    }
});


module.exports = router;
