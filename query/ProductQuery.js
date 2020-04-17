const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
            name: String,
            description: String,
            price: Number,
            discount: Number,
            image1: String,
            image2: String,
            featuredState: String,
            title: String,
            shopId: String,
            availability: String,
            discountStatus: String,
            productState: Boolean,
            date: String,
            city: String
    }
);

module.exports = mongoose.model("product", productSchema)
