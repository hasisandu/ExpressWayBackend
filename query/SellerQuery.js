const mongoose = require('mongoose');

const SellerQuery = mongoose.Schema(
    {
            nic: String,
            name: String,
            contact: String,
            address: String,
            password: String,
            isActive: Boolean,
    }
);

module.exports = mongoose.model("seller", SellerQuery)
