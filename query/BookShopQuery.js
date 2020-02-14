const mongoose = require('mongoose');

const BookShopSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        price: Number,
        discount: Number,
        detail: {
            types: {
                author: String,
                language: String,
                translator: String
            }
        },
        image: String,
        qty: Number,
        category: String,
        publisher: String,
        publishYear: String,
        pages: Number,
        ISBN: String,
        shopId: String,
        discountStatus: Boolean
    }
);

const BookShopOtherProductSchema = mongoose.Schema(
    {
        name: String,
        description: String,
        price: Number,
        discount: Number,
        detail: String,
        image: String,
        qty: Number,
        shopId: String,
        discountStatus: Boolean
    }
);

module.exports = mongoose.model("Bookshop", BookShopSchema)
module.exports = mongoose.model("BookshopOtherProduct", BookShopOtherProductSchema)
