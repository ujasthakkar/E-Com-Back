const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    
    userid: {
        type: Object,
        required: true
    },

    productid: {
        type: Object,
        required: true,
    },

    shippingdetails: {
        type: String,
    },

    dateoforder: {
        type: Date,
        required: true
    },

    status: {
        enum: ["present", "past"]
    },

    totalprice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("order", orderSchema);