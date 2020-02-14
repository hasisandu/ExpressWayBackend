const mongoose = require('mongoose');

const JewelleryShopSchema = mongoose.Schema(
    {
        name: String,
        category: String,
        image: {
            type: {
                img1: String,
                img2: String,
                img3: String,
                img4: String
            }
        },
        price: Number,
        description: String,
        discount: Number,
        discountState: Boolean,
        shopId: String,
        weight: Number,
        productState: Boolean
    }
);

module.exports = mongoose.model("JewelleryShop", JewelleryShopSchema)
