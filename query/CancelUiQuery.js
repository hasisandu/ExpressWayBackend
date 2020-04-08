const mongoose = require('mongoose');

const Cancel = mongoose.Schema(
    {
        contactNumber: String,
        email: String
    }
);

module.exports = mongoose.model("cancelUi", Cancel)
