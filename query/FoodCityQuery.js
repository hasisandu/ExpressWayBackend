const mongoose = require('mongoose');

const FoodCitySchema = mongoose.Schema(
    {

            image: String,
            name: String,
            price: Number,
            description: String,
            productFeatures: String,
            discount: Number,
            discountState: Boolean,
            shopId: String,
            productState: Boolean,
            qty: Number
    }
);

module.exports = mongoose.model("FoodCity", FoodCitySchema);
