const mongoose = require('mongoose');


const UserSchema = mongoose.Schema(
    {
            firstName: String,
            lastName: String,
            email: String,
            contact: String,
            image: String
    }
);

module.exports = mongoose.model("user", UserSchema)
