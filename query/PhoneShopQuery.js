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
        image: {
            types: {
                img1: String,
                img2: String,
                img3: String
            }
        },
        qty: Number
    }
);

module.exports = mongoose.model("PhoneShop", PhoneShopSchema)
