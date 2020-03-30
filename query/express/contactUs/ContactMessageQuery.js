const mongoose = require('mongoose');

const ContactMessageSchema = mongoose.Schema(
    {
            senderEmail: String,
            senderName: String,
            senderMessage: String,
            senderTime: String,
            senderDate: String
    }
);

module.exports = mongoose.model("ContactMessageSchema", ContactMessageSchema)
