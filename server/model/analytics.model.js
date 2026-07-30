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

        ipAddress: {
            type: String,
            index: true,
        },

        // =========================
        // Geo Location
        // =========================

        continent: {
            type: String,
            default: "Unknown",
            index: true,
        },

        continentCode: {
            type: String,
            default: "Unknown",
        },

        country: {
            type: String,
            default: "Unknown",
            index: true,
        },

        countryCode: {
            type: String,
            default: "Unknown",
        },

        region: {
            type: String,
            default: "Unknown",
            index: true,
        },

        regionCode: {
            type: String,
            default: "Unknown",
        },

        city: {
            type: String,
            default: "Unknown",
            index: true,
        },

        latitude: Number,

        longitude: Number,

        postal: String,

        callingCode: String,

        capital: String,

        isEU: Boolean,

        flag: {
            emoji: String,
            emojiUnicode: String,
            image: String,
        },

        // =========================
        // Network
        // =========================

        connection: {
            asn: Number,
            org: String,
            isp: String,
            domain: String,
        },

        // =========================
        // Timezone
        // =========================

        timezone: {
            id: String,
            abbr: String,
            isDst: Boolean,
            offset: Number,
            utc: String,
        },

        // =========================
        // Device Information
        // =========================

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

        // =========================
        // Request Information
        // =========================

        referrer: {
            type: String,
            default: "Direct",
        },

        userAgent: String,
    },
    {
        timestamps: true,
    }
);

// =========================
// Indexes
// =========================

analyticsSchema.index({ owner: 1, createdAt: -1 });

analyticsSchema.index({ owner: 1, country: 1 });

analyticsSchema.index({ owner: 1, region: 1 });

analyticsSchema.index({ owner: 1, city: 1 });

analyticsSchema.index({ owner: 1, browser: 1 });

analyticsSchema.index({ owner: 1, operatingSystem: 1 });

analyticsSchema.index({ owner: 1, deviceType: 1 });

analyticsSchema.index({ owner: 1, continent: 1 });

analyticsSchema.index({ owner: 1, "connection.isp": 1 });

analyticsSchema.index({ owner: 1, "timezone.id": 1 });

analyticsSchema.index({ link: 1, createdAt: -1 });

module.exports = mongoose.model("Analytics", analyticsSchema);