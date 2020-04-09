const mongoose = require('mongoose');

const WebRequestQuery = mongoose.Schema(
    {
        businessName: String,
        contact: String,
        date: String
    }
);

module.exports = mongoose.model("WebRequestQuery", WebRequestQuery)
