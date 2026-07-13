const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        unique: true,
    },
    avtar: {
        type: String,
    },
    role: {
        type: String,
    },
    isVerified: {
        type: String
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date
    }
}, { timeStamp: true })

module.exports = mongoose.model("user", userSchema)