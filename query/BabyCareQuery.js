const mongoose = require('mongoose');

const BabyCareSchema = mongoose.Schema(
    {
        name: String,
        image: {
            type: {
                img1: String,
                img2: String,
                img3: String
            }
        },
        price: Number,
        description: String,
        qty: Number,
        productState: Boolean,
        productFeatures: String,
        discount: Number,
        discountState: Boolean,
        shopId: String,
        specification: {
            types: {
                brand: String,
                volume: String,
                weight: String
            }
        }
    }
);

module.exports = mongoose.model("BabyCare", BabyCareSchema)
