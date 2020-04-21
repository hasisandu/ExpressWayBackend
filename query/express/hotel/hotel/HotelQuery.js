const mongoose = require('mongoose');

const Hotel = mongoose.Schema(
    {
            image1: String,
            image2: String,
            image3: String,
            image4: String,
            proprtyType: String,
            hotelName: String,
            facilities: Array,
            address: String,
            email: String,
            contact1: String,
            contact2: String,
            web: String,
            bookingLink: String,
            fbLink: String,
            twitterLink: String,
            instaLink: String,
            discription: String,
            stars: String,
            district: String,
            city: String,
            longitude: Number,
            latitude: Number,
        businessTitle: String,
        hotelState: Boolean,
        twentiForHour: String,
        regDate: String,
        regTime: String,
        mainContact: String,
        mainEmail: String,
        paidState: Boolean,
        userName: String,
        password: String,
        avrgPrice: Number,
        featuredState: Boolean
    }
);

module.exports = mongoose.model("Hotel", Hotel);

