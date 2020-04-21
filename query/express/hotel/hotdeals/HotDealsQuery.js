const mongoose = require('mongoose');

const HotDeals = mongoose.Schema(
    {
            hotelId: String,
            hotelImage: String,
            district: String,
            city: String,
            date: String,
            description: String
    }
);

module.exports = mongoose.model("HotDeals", HotDeals);

