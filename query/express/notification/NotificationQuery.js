const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema(
    {
            senderUserId: String,
            reserveId: String,
            senderUserName: String,
            time: String,
            NotificationState: Boolean,
            senderImage: String,
            message: String,
            date: String
    }
);

module.exports = mongoose.model("NotificationScheema", NotificationSchema)
