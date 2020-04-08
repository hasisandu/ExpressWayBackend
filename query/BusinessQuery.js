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
            website: String,
            redDate: String,
            redTime: String,
            mainContact: String,
            mainEmail: String,
            paidState: Boolean
    }
);

module.exports = mongoose.model("Business", Business)
