const mongoose = require('mongoose');

const ComputerShopSchema = mongoose.Schema(
    {
            category: String,
            name: String,
            brand: String,
            image1: String,
            image2: String,
            image3: String,
            image4: String,
            price: Number,
            SKV: String,
            processor: String,
            memory: String,
            storage: String,
            graphicCard: String,
            display: String,
            camera: String,
            operatingSystem: String,
            audio: String,
            network: String,
            warranty: String,
            shopId: String,
            discountStatus: Boolean,
            type: String
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
        type: String,
        shopId: String,
        discountStatus: Boolean
    }
);

module.exports = mongoose.model("Computershop", ComputerShopSchema)
module.exports = mongoose.model("ComputerShopshopOtherProduct", ComputerShopOtherProductSchema)
