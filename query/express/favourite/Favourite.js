const mongoose = require('mongoose');

const Favourite = mongoose.Schema(
    {
            userId: String,
            ProductId: String,
            ProductImage: String,
            date: String,
            time: String,
            productName: String,
            price: String,
            title: String,
    }
);

module.exports = mongoose.model("Favourite", Favourite)
