const mongoose = require('mongoose');

const SpaQuerySchema = mongoose.Schema(
    {
        serviceName: String,
        image: {
            types: {
                img1: String,
                img2: String,
                img3: String
            }
        },
        price: Number,
        discount: Number,
        description: String,
        discountState: Boolean,
        shopId: String,
        serviceState: Boolean
    }
);

module.exports = mongoose.model("Spa", SpaQuerySchema)
