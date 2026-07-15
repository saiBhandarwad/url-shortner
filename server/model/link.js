const mongoose = require("mongoose")

const linkSchema = mongoose.Schema({

    originalUrl: {
        type: String
    },
    shortCode: {
        type: String
    },
    shortUrl: {
        type: String,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId
    },

    title: String,

    description: String,

    clickCount: Number,

    expiresAt: Date,

    password: String,

    isPasswordProtected: Boolean,

    isActive: Boolean,

    lastVisitedAt: Date,

})

module.exports = mongoose.model("link" , linkSchema)