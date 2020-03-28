const mongoose = require('mongoose');

const BusinessSchema = mongoose.Schema(
    {
        id: String,
        image1: String,
        image2: String,
        image3: String,
        image4: String,
        ownerNIC: String,
        ownerName: String,
        shopName: String,
        businessTitle: String,
        longitude: Number,
        latitude: Number,
        city: String,
        address: String,
        contact1: String,
        contact2: String,
        shopState: Boolean,
        openTime: String,
        endTime: String,
        openState: Boolean,
        registerID: String,
        website: String,
        userName: String,
        password: String,
        registerDate: String,
        registerSellerId: String,
    }
);

module.exports = mongoose.model("BusinessSchema", BusinessSchema)
