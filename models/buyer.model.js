const mongoose = require("mongoose");

const BuyerSchema = new mongoose.Schema(
    {
        userEmail: {
            type: String,
            required: true,
        },
        paymentReference: {
            type: String,
            required: true,
            unique: true
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: Boolean,
            default: false,
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Buyer", BuyerSchema);
