const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


aws.config.update({
    secretAccessKey: 'AgCFB93i9to8r1qcHc0WIYCikyY/hePTPSFxFVuw',
    accessKeyId: 'AKIAI4IHSIT4H3OEXL3A',
    region: 'us-east-2'
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'expressimage1',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: 'TESTING_META_DATA'});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;
