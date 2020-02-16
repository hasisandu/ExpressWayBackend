const mongoose = require('mongoose');

const WineStoreQuerySchema = mongoose.Schema(
    {
            name: String,
            featuredState: Boolean,
            weight: String,
            country: String,
            age: Number,
            category: String,
            image: String,
            price: Number,
            Varietal: String,
            description: String,
            discount: Number,
            qty: Number,
            discountState: Boolean,
            shopId: String,
            ProductState: Boolean

    }
);

module.exports = mongoose.model("WineStore", WineStoreQuerySchema)
