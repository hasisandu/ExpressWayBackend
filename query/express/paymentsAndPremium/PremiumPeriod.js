const mongoose = require('mongoose');

const Premium = mongoose.Schema(
    {
        shopId: String,
        trialState: Boolean,
        dateUntil: String,
        dateFrom: String
    }
);

module.exports = mongoose.model("Premium", Premium)
