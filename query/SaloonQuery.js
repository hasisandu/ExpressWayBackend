const mongoose = require('mongoose');

const SaloonProductSchema = mongoose.Schema(
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

const SaloonSchema = mongoose.Schema(
    {
        name: String,
        image: String,
        price: Number,
        discount: Number,
        discountState: Boolean,
        description: String,
        shopId: String,
        productState: Boolean
    }
);

module.exports = mongoose.model("Saloon", SaloonProductSchema)
module.exports = mongoose.model("SaloonProduct", SaloonSchema)
