const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
    link: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Link",
        required: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    ip: String,

    browser: String,

    device: String,

    os: String,

    country: String,

    city: String,

    referrer: String,

    clickedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Analytics", analyticsSchema);