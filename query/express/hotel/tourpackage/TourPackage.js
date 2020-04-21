const mongoose = require('mongoose');

const TourPackage = mongoose.Schema(
    {
        image1: String,
        image2: String,
        image3: String,
        image4: String,
        image5: String,
        city: String,
        tourName: String,
        contact1: String,
        contact2: String,
        email: String,
        web: String,
        faceBookLink: String,
        twitterLink: String,
        instagramLink: String,
        youtubeLink: String,
        fromPrice: Number,
        featureStated: Boolean,
        duration: String,
        tourType: String,
        tourCatagery: String,
        groupSize: String,
        languages: String,
        heightlights: Array,
        address: String,
        description: String,
        longitude: Number,
        latitude: Number,
        businessTitle: String,
        packageState: Boolean,
        regDate: String,
        regTime: String,
        mainContact: String,
        mainEmail: String,
        paidState: String,
        userName: String,
        password: String
    }
);

module.exports = mongoose.model("TourPackage", TourPackage);

