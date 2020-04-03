const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
            name: String,
        description: String,
        price: String,
        discount: String,
        image1: String,
        image2: String,
        featuredState: String,
        title: String,
        shopId: String,
        availability: String,
        discountStatus: String,
        productState: Boolean,
        specs: JSON
    }
);

module.exports = mongoose.model("product", productSchema)
