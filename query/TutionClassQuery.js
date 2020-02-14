const mongoose = require('mongoose');

const BabyCareSchema = mongoose.Schema(
    {
        image: {
            type: {
                img1: String,
                img2: String,
                img3: String
            }
        },
        price: Number,
        description: String,
        productFeatures: String,
        discount: Number,
        discountState: Boolean,
        shopid: String,
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
