const express = require('express');
const router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;


const UserNamePassword = require('../../query/user/UserNameAndPassword');


router.post('/saveUserNameAndPassword', async (req, res) => {
    try {
        var userNameAndPassword = new UserNamePassword({
            userName: req.body.userName.toLowerCase(),
            password: req.body.password.trim()
        });
        userNameAndPassword.save()
            .then(item => {
                res.send(item);
            })
            .catch(err => {
                res.status(400).send(err);
            });
    } catch (e) {
    }
});

router.get('/registerUser/getbyUserName', async (req, res) => {

    console.log(req.headers)
    try {
        let user = req.headers.username.toLowerCase();
        const data = await UserNamePassword.findOne({userName: user});
        if (data != null) {
            res.send(true)
        } else {
            res.send(false)
        }


    } catch (e) {
        res.json({message: e});
    }
});

module.exports = router;
