const mongoose = require('mongoose');

const ElectronicShopSchema = mongoose.Schema(
    {
            category: String,
            name: String,
            brand: String,
            image1: String,
            image2: String,
            image3: String,
            img4: String,
            price: Number,
            description: String,
            discount: Number,
            warranty: String,
            shopId: String,
            type: String,
            discountStatus: Boolean
    }
);

const ElectronicShopOtherSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        price: Number,
        discount: Number,
        image: String,
        qty: Number,
        shopId: String,
        type: String,
        discountStatus: Boolean
    }
);

module.exports = mongoose.model("ElectronicShop", ElectronicShopSchema)
module.exports = mongoose.model("ElectronicShopOtherProduct", ElectronicShopOtherSchema)
