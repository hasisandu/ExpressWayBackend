const mongoose = require('mongoose');

const MobileSchema = mongoose.Schema(
    {
        image1: String,
        image2: String,
        image3: String,
        discount: Number,
        discountState: Boolean,
        shopId: String,
        brand: String,
        title: String,
        price: Number,
        color: JSON,
        specification: JSON,
        warranty: String,
        productId: String,
        onlineAvailable: Boolean,
        productState: Boolean,
        productQTY: Number,
        description: String,
        bestSellerState: Boolean
    }
);

module.exports = mongoose.model("Mobile", ClothSchema)
