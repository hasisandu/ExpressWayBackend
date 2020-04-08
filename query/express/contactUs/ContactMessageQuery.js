const mongoose = require('mongoose');

const ContactMessage = mongoose.Schema(
    {
        senderEmail: String,
        senderName: String,
        senderMessage: String,
        senderTime: String,
        senderDate: String
    }
);

module.exports = mongoose.model("ContactMessage", ContactMessage)
