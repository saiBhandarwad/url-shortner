const Analytics = require("../model/analytics.model");
const Link = require("../model/link.model");
const { formatAnalytics } = require("../utils/analytics");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getAnalytics = asyncHandler(async (req, res) => {
    const userId = req.userData.data.id;

    // write aggregations here
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);
    last7Days.setHours(0, 0, 0, 0);




    const [
        clicksByDay,
        audienceByCountry,
        devices,
        browsers,
        topLinks,
    ] = await Promise.all([
        Analytics.aggregate([
            {
                $match: {
                    owner: userId,
                    createdAt: {
                        $gte: last7Days,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                        },
                    },
                    clicks: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]),
        Analytics.aggregate([
            {
                $match: {
                    owner: userId,
                },
            },
            {
                $group: {
                    _id: "$country",
                    clicks: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    clicks: -1,
                },
            },
        ]),
        Analytics.aggregate([
            {
                $match: {
                    owner: userId,
                },
            },
            {
                $group: {
                    _id: "$deviceType",
                    value: {
                        $sum: 1,
                    },
                },
            },
        ]),
        Analytics.aggregate([
            {
                $match: {
                    owner: userId,
                },
            },
            {
                $group: {
                    _id: "$browser",
                    value: {
                        $sum: 1,
                    },
                },
            },
        ]),
        Link.find({
            owner: userId,
        })
            .sort({ clickCount: -1 })
            .limit(3)
            .select("originalUrl shortCode clickCount"),
    ]);
    const formattedClicks = formatAnalytics(clicksByDay, "value")
    const formattedCountries = formatAnalytics(audienceByCountry, "value")
    const formattedDevices = formatAnalytics(devices, "value")
    const formattedBrowsers = formatAnalytics(browsers, "value")


    return res.status(200).json(
        new ApiResponse(200, {
            clicksByDay: formattedClicks,
            audienceByCountry: formattedCountries,
            devices: formattedDevices,
            browsers: formattedBrowsers,
            topLinks,
        })
    );
});

module.exports = {
    getAnalytics,
};