const mongoose = require('mongoose');

const ShopSchema = mongoose.Schema(
    {
            name: String,
            description: String,
            price: Number,
            discount: Number,
            image1: String,
            image2: String,
            image3: String,
            productState: Boolean,
            title: String,
            shopId: String,
            discountStatus: Boolean
    }
);

module.exports = mongoose.model("Shop", ShopSchema)
