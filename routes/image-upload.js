const express = require('express');
const router = express.Router();

const upload = require('../service/file-upload');

const singleUpload = upload.single('image');

router.post('/image-upload', function (req, res) {
    console.log(req);
    singleUpload(req, res, function (error) {
        return res.json({'imageUrl': req.file.location})
    });
})

module.exports = router;
