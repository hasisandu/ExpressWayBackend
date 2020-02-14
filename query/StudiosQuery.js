const mongoose = require('mongoose');

const StudioQuerySchema = mongoose.Schema(
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
        discountState: Boolean,
        shopId: String,
        serviceState: Boolean
    }
);

module.exports = mongoose.model("Studio", StudioQuerySchema)
