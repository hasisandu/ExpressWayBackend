const mongoose = require('mongoose');


const UserNamAndPassword = mongoose.Schema(
    {
        userName: String,
        password: String,
    }
);

module.exports = mongoose.model("UserNamAndPassword", UserNamAndPassword);
