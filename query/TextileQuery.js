const mongoose = require('mongoose');

const SaveSchema = mongoose.Schema(
    {
        image1: {
            type: String,
            required: true
        },
        image2: {
            type: String,
            required: true
        },
        image3: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        shop: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        originplace: {
            type: String,
            required: true
        },
        avlblqty: {
            type: Number,
            required: true
        },
        discountState: {
            type: Boolean,
            required: true
        },


    }
);

module.exports = mongoose.model('Textile', SaveSchema);
