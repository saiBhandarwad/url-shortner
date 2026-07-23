const Analytics = require("../model/analytics.model")
const UAParser = require("ua-parser-js");

const recordAnalytics = async (req, link) => {
    const parser = new UAParser(req.headers["user-agent"]);

    const browser = parser.getBrowser().name || "Unknown";

    const os = parser.getOS().name || "Unknown";

    const device = parser.getDevice().type || "Desktop";

    const referrer = req.headers.referer || "Direct";

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    console.log({ data });
    const country = data.country
    const city = data.city

    await Analytics.create({
        owner: link.owner,
        link: link._id,

        ipAddress: ip,
        country,
        city,
        browser,

        operatingSystem: os,

        deviceType:
            device.charAt(0).toUpperCase() +
            device.slice(1),

        referrer,

        userAgent: req.headers["user-agent"],
    });
};

module.exports = recordAnalytics