const Analytics = require("../model/analytics.model");
const Link = require("../model/link.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getDashboard = asyncHandler(async (req, res) => {
    const userId = req.userData.data.id;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const [
        totalLinks,
        activeLinks,
        expiredLinks,
        totalClicksResult,
        todayClicks,
        recentLinks,

    ] = await Promise.all([
        Link.countDocuments({ owner: userId }),

        Link.countDocuments({
            owner: userId,
            isActive: true,
        }),

        Link.countDocuments({
            owner: userId,
            expiresAt: { $lt: new Date() },
        }),

        Link.aggregate([
                        {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$clickCount",
                    },
                },
            },
        ]),
        Analytics.countDocuments({
            owner: userId,
            createdAt: {
                $gte: startOfToday,
            },
        }),

        Link.find({ owner: userId })
            .sort({ createdAt: -1 })
            .limit(3)
            .select(
                "originalUrl shortCode clickCount isActive createdAt"
            ),
    ]);
    console.log({ totalClicksResult });
    
    const totalClicks = totalClicksResult[0]?.total || 0
    return res.status(200).json(new ApiResponse(200, {
        totalLinks,
        activeLinks,
        expiredLinks,
        totalClicks,
        todayClicks,
        recentLinks,
        "clicksOverTime": [
            {
                "date": "2026-07-17",
                "clicks": 180
            }
        ],
        "topCountries": [
            {
                "country": "India",
                "clicks": 2400
            }
        ],
        "recentLinks": [],
    }))

})

module.exports = { getDashboard }