const mongoose = require('mongoose');

const BusinessTitle = mongoose.Schema(
    {
        state: Boolean,
        title: String
    }
);

module.exports = mongoose.model("BusinessTitle", BusinessTitle)
