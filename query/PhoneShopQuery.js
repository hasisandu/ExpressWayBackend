const mongoose = require('mongoose');

const PhoneShopSchema = mongoose.Schema(
    {
        brand: String,
        name: String,
        modal: String,
        price: Number,
        discount: Number,
        discountState: Boolean,
        description: String,
        productFeatures: String,
        shopId: String,
        productState: Number,
        image1: String,
        image2: String,
        image3: String,
        qty: Number
    }
);

module.exports = mongoose.model("PhoneShop", PhoneShopSchema)
