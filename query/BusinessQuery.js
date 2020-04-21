const mongoose = require('mongoose');

const Business = mongoose.Schema(
    {
        image1: String,
        image2: String,
        image3: String,
        image4: String,
        shopName: String,
        businessTitle: String,
        longitude: Number,
        latitude: Number,
        city: String,
        address: String,
        contact1: String,
        shopState: Boolean,
        openTime: String,
        endTime: String,
        twentyFour: String,
        website: String,
        redDate: String,
        redTime: String,
        mainContact: String,
        mainEmail: String,
        paidState: Boolean,
        userName: String,
        password: String,
        faceBookLink: String,
        twitterLink: String,
        instagramLink: String,
        youtubeLink: String,
        district: String,
    }
);

module.exports = mongoose.model("Business", Business)
