const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    productid: {
        type : Number,
        required: true,
        unique: true
    },

    title: {
        type : String,
        required: true,
    },

    des: {
        type: String,
        required: true
    },

    cat: {
        type: String,
        enum: ["men", "women", "kids"],
    },

    brandname: {
        type: String,
    },

    size: {
        type: String,
        enum: ["S", "M", "L", "XL"],
    },

    quantity: {
        type: Number,
        required: true
    },

     

    price: {
        type: Number,
        required: true
    },

    dispercent: {
        type: Number,
        default: 0
    },

    tags: {
        type: Array,
        default: [],
        required: true
    }
});

module.exports = mongoose.model("product",productSchema)