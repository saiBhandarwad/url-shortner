const Link = require("../model/link.model")
const recordAnalytics = require("../utils/recordAnalytics");

const getLinkByShortCode = async (req, res) => {
    const shortCode = req.params.shortCode
    console.log({ shortCode });

    if (!shortCode) throw new ApiError(400, "ShortCode is missing in request.")
    const link = await Link.findOne({ shortCode })
    if (!link) throw new ApiError(404, "No such shortCode available")
    if (!link.isActive) throw new ApiError(410, "This link is no longer active.");
    if (link.expiresAt && link.expiresAt < new Date()) {
        throw new ApiError(410, "This link has expired.");
    }
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