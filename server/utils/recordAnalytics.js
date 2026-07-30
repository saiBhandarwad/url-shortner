const Analytics = require("../model/analytics.model");
const UAParser = require("ua-parser-js");
const logger = require("../utils/logger");

const recordAnalytics = async (req, link) => {
    const parser = new UAParser(req.headers["user-agent"]);

    const browser = parser.getBrowser().name || "Unknown";
    const os = parser.getOS().name || "Unknown";
    const device = parser.getDevice().type || "Desktop";
    const referrer = req.headers.referer || "Direct";

    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
        req.socket.remoteAddress;

    let geoData = {};

    try {
        const response = await fetch(`https://ipwho.is/${ip}`);
        const data = await response.json();

        if (data.success) {
            geoData = {
                // =========================
                // Geo Information
                // =========================
                continent: data.continent,
                continentCode: data.continent_code,

                country: data.country,
                countryCode: data.country_code,

                region: data.region,
                regionCode: data.region_code,

                city: data.city,

                latitude: data.latitude,
                longitude: data.longitude,

                postal: data.postal,

                callingCode: data.calling_code,

                capital: data.capital,

                isEU: data.is_eu,

                flag: {
                    emoji: data.flag?.emoji,
                    emojiUnicode: data.flag?.emoji_unicode,
                    image: data.flag?.img,
                },

                // =========================
                // Network
                // =========================
                connection: {
                    asn: data.connection?.asn,
                    org: data.connection?.org,
                    isp: data.connection?.isp,
                    domain: data.connection?.domain,
                },

                // =========================
                // Timezone
                // =========================
                timezone: {
                    id: data.timezone?.id,
                    abbr: data.timezone?.abbr,
                    isDst: data.timezone?.is_dst,
                    offset: data.timezone?.offset,
                    utc: data.timezone?.utc,
                },
            };
        }
    } catch (err) {
        logger.error({
            message: "IP lookup failed",
            error: err.message,
            stack: err.stack,
        });
    }

    try {
        await Analytics.create({
            owner: link.owner,
            link: link._id,

            ipAddress: ip,

            browser,

            operatingSystem: os,

            deviceType:
                device.charAt(0).toUpperCase() +
                device.slice(1),

            referrer,

            userAgent: req.headers["user-agent"],

            ...geoData,
        });

        logger.info({
            message: "Visitor",

            shortCode: link.shortCode,

            owner: link.owner,

            ip,

            browser,

            operatingSystem: os,

            deviceType: device,

            referrer,

            ...geoData,
        });
    } catch (err) {
        logger.error({
            message: "Failed to record analytics",

            error: err.message,

            stack: err.stack,

            shortCode: link.shortCode,

            owner: link.owner,
        });
    }
};

module.exports = recordAnalytics;