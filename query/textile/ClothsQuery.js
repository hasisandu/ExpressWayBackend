const mongoose = require('mongoose');

const ClothSchema = mongoose.Schema(
    {
        productId: String,
        productTitle: String,
        productType: String,
        madeFor: String,
        price: Number,
        discount: Number,
        discountState: Boolean,
        onlineAvailable: Boolean,
        productState: Boolean,
        productQTY: Number,
        description: String,
        bestSellerState: Boolean,
        Size: JSON,
        Color: JSON,
        image1: String,
        image2: String,
        image3: String
    }
);

module.exports = mongoose.model("cloth", ClothSchema)
