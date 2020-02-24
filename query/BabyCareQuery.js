const mongoose = require('mongoose');

const BabyCareSchema = mongoose.Schema(
    {
            name: String,
            image1: String,
            image2: String,
            image3: String,
            price: Number,
            description: String,
            qty: Number,
            productState: Boolean,
            discount: Number,
            discountState: Boolean,
            shopId: String,
            brand: String,
            volume: String,
            weight: String
    }
);

module.exports = mongoose.model("BabyCare", BabyCareSchema)
