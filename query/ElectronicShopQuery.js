const mongoose = require('mongoose');

const ElectronicShopSchema = mongoose.Schema(
    {
        category: String,
        name: String,
        brand: String,
        image: {
            type: {
                img1: String,
                img2: String,
                img3: String,
                img4: String
            }
        },
        price: Number,
        description: String,
        discount: Number,
        warranty: String,
        shopId: String,
        discountStatus: Boolean
    }
);

const ElectronicShopOtherSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        price: Number,
        discount: Number,
        detail: String,
        image: String,
        qty: Number,
        shopId: String,
        discountStatus: Boolean
    }
);

module.exports = mongoose.model("ElectronicShop", ElectronicShopSchema)
module.exports = mongoose.model("ElectronicShopOtherProduct", ElectronicShopOtherSchema)
