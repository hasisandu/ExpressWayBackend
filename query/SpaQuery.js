const mongoose = require('mongoose');

const SpaQuerySchema = mongoose.Schema(
    {
        serviceName: String,
        image1: String,
        image2: String,
        image3: String,
        price: Number,
        discount: Number,
        description: String,
        discountState: Boolean,
        shopId: String,
        serviceState: Boolean
    }
);

module.exports = mongoose.model("Spa", SpaQuerySchema)
