const mongoose = require('mongoose');

const PetShopSchema = mongoose.Schema(
    {
            name: String,
            price: Number,
            discount: Number,
            discountState: Boolean,
            shopId: String,
            description: String,
            image: String,
            qty: Number,
            productState: Boolean
    }
);

module.exports = mongoose.model("PetShop", PetShopSchema)
