const mongoose = require('mongoose');

const ComputerShopSchema = mongoose.Schema(
    {
        category: String,
        name: String,
        brand: String,
        image: {
            type: {
                img1: String,
                img2: String,
                img3: String,
                img4: String
            }
        },
        price: Number,
        SKV: String,
        description: {
            types: {
                processor: String,
                memory: String,
                storage: String,
                graphicCard: String,
                display: String,
                camera: String,
                operatingSystem: String,
                audio: String,
                network: String
            }
        },
        warranty: String,
        shopId: String,
        discountStatus: Boolean
    }
);

const ComputerShopOtherProductSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        price: Number,
        brand: String,
        category: String,
        discount: Number,
        detail: String,
        image: String,
        qty: Number,
        shopId: String,
        discountStatus: Boolean
    }
);

module.exports = mongoose.model("Computershop", ComputerShopSchema)
module.exports = mongoose.model("ComputerShopshopOtherProduct", ComputerShopOtherProductSchema)
