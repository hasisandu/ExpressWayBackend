const mongoose = require('mongoose');

const JewelleryShopSchema = mongoose.Schema(
    {
        name: String,
        category: String,
        image1: String,
        image2: String,
        image3: String,
        image4: String,
        price: Number,
        description: String,
        discount: Number,
        discountState: Boolean,
        shopId: String,
        weight: Number,
        productState: Boolean
    }
);

module.exports = mongoose.model("JewelleryShop", JewelleryShopSchema)
