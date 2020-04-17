const mongoose = require('mongoose');

const ApplyForm = mongoose.Schema(
    {

            longitude: Number,
            latitude: Number,
            city: String,
            address: String,
            contact: String,
            redDate: String,
            redTime: String,
            mainContact: String,
            mainEmail: String,
            userName: String,
            password: String
    }
);

module.exports = mongoose.model("ApplyForm", ApplyForm)
