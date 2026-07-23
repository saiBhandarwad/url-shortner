const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        link: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Link",
            required: true,
            index: true,
        },

        ipAddress: String,

        country: {
            type: String,
            default: "Unknown",
            index: true,
        },

        city: {
            type: String,
            default: "Unknown",
        },

        browser: {
            type: String,
            default: "Unknown",
            index: true,
        },

        operatingSystem: {
            type: String,
            default: "Unknown",
            index: true,
        },

        deviceType: {
            type: String,
            enum: ["Desktop", "Mobile", "Tablet", "Bot", "Unknown"],
            default: "Unknown",
            index: true,
        },

        referrer: String,

        userAgent: String,
    },
    {
        timestamps: true,
    }
);

analyticsSchema.index({ owner: 1, createdAt: -1 });
analyticsSchema.index({ owner: 1, country: 1 });
analyticsSchema.index({ owner: 1, browser: 1 });
analyticsSchema.index({ owner: 1, deviceType: 1 });
analyticsSchema.index({ link: 1, createdAt: -1 });
module.exports = mongoose.model("Analytics", analyticsSchema);