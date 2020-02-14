const mongoose = require('mongoose');

const LoversShopSchema = mongoose.Schema(
    {
            productName: String,
            image: String,
            price: Number,
            description: String,
            discount: Number,
            discountState: Boolean,
            shopId: String,
            productState: Boolean,
            qty: Number
    }
);

module.exports = mongoose.model("LoversShop", LoversShopSchema)
