const mongoose = require('mongoose');


const Vehicle = mongoose.Schema(
    {
        image1: String,
        image2: String,
        image3: String,
        image4: String,
        vehicleType: String,
        facilities: Array,
        contact1: String,
        contact2: String,
        description: String,
        district: String,
        city: String,
        longitude: Number,
        latitude: Number,
        jobType: String,
        vehicleName: String,
        regDate: String,
        regTime: String,
        mainContact: String,
        mainEmail: String,
        paidState: Boolean,
        VehicelState: Boolean,
        userName: String,
        password: String,
        fbLink: String,
        twitterLink: String,
        instaLink: String,
        driverLicense: String,
        name: String,
        email: String,
        age: String,
        address: String,
        availableLang: String,
        passengers: Number,
        door: Number,
        suitcase: Number,
        airCondition: String,
        transemison: String
    }
);

module.exports = mongoose.model("Vehicle", Vehicle);
