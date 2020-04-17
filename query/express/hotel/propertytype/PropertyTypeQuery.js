const mongoose = require('mongoose');

const PropertyTypes = mongoose.Schema(
    {
        propertyState: Boolean,
        propertyName: String,
        image: String
    }
);

module.exports = mongoose.model("PropertyTypes", PropertyTypes)
