const mongoose = require('mongoose');

const MobileSchema = mongoose.Schema(
    {
        image1: String,
        image2: String,
        image3: String,
        productId: String,
        productTitle: String,
        brand: String,
        price: Number,
        discount: Number,
        shopId: String,
        discountState: Boolean,
        color: JSON,
        warranty: String,
        onlineAvailable: Boolean,
        productState: Boolean,
        productQTY: Number,
        description: String,
        bestSellerState: Boolean,
        specification: JSON
    }
);

module.exports = mongoose.model("Computer", ClothSchema)
