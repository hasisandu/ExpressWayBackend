const mongoose = require('mongoose');

const SaloonProductSchema = mongoose.Schema(
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

const SaloonSchema = mongoose.Schema(
    {
        name: String,
        type: String,
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
