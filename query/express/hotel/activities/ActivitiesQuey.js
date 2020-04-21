const mongoose = require('mongoose');

const Activities = mongoose.Schema(
    {
        image1: String,
        image2: String,
        image3: String,
        image4: String,
        image5: String,
        city: String,
        district: String,
        activityName: String,
        contact1: String,
        email: String,
        web: String,
        faceBookLink: String,
        twitterLink: String,
        instagramLink: String,
        youtubeLink: String,
        fromPrice: Number,
        featureStated: Boolean,
        ActivityCatagery: String,
        heightlights: Array,
        address: String,
        description: String,
        longitude: Number,
        latitude: Number,
        businessTitle: String,
        activityState: Boolean,
        regDate: String,
        regTime: String,
        mainContact: String,
        mainEmail: String,
        paidState: String,
        userName: String,
        password: String
    }
);

module.exports = mongoose.model("Activities", Activities);

