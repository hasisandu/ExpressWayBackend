const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema(
    {
            productName: String,
            price: Number,
            description: String,
            image: String,
            discount: Number,
            discountState: Boolean,
            shopId: String,
            productState: Boolean
    }
);

module.exports = mongoose.model("Restaurant", RestaurantSchema)
