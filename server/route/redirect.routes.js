const { redisClient } = require("../config/redis");
const Link = require("../model/link.model")
const recordAnalytics = require("../utils/recordAnalytics");

const getLinkByShortCode = async (req, res) => {
    const shortCode = req.params.shortCode
    if (!shortCode) throw new ApiError(400, "ShortCode is missing in request.")
    // check in redis
    const cachedUrl = await redisClient.get(`link:${shortCode}`);
    if (cachedUrl) {
        console.log("Redis CACHE HIT");
        return res.redirect(cachedUrl);
    }
    console.log("Redis CACHE MISS");

    const link = await Link.findOne({ shortCode })
    if (!link) throw new ApiError(404, "No such shortCode available")
    if (!link.isActive) throw new ApiError(410, "This link is no longer active.");
    if (link.expiresAt && link.expiresAt < new Date()) {
        throw new ApiError(410, "This link has expired.");
    }
    // store in redis for future fast cache response
    await redisClient.set(
        `link:${shortCode}`,
        link.originalUrl,
        {
            EX: 3600
        }
    );
    await Link.updateOne(
        { _id: link._id },
        {
            $inc: { clickCount: 1 },
            $set: {
                lastVisitedAt: new Date()
            }
        }
    );
    // Record analytics (IP, Location of user, browser, device, referrer, timestamp).
    await recordAnalytics(req, link)
    return res.redirect(link.originalUrl)
}

module.exports = {
    getLinkByShortCode
}