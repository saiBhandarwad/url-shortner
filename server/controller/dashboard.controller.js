const { format } = require("date-fns");
const Analytics = require("../model/analytics.model");
const Link = require("../model/link.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { default: mongoose } = require("mongoose");

const getDashboard = asyncHandler(async (req, res) => {
    const userId = req.userData.data.id;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);
    last7Days.setHours(0, 0, 0, 0);

    const matchOwner = {
        $match: {
            owner: new mongoose.Types.ObjectId(userId),
        },
    };
    const matchLast7Days = {
        $match: {
            owner: new mongoose.Types.ObjectId(userId),
            createdAt: { $gte: last7Days },
        },
    };

    const [
        totalLinks,
        activeLinks,
        expiredLinks,
        totalClicksResult,
        todayClicks,
        recentLinks,
        clicksOverTime,
        topCountries

    ] = await Promise.all([
        // totalLinks,
        Link.countDocuments({ owner: new mongoose.Types.ObjectId(userId), }),

        // activeLinks,
        Link.countDocuments({
            owner: new mongoose.Types.ObjectId(userId),
            isActive: true,
        }),

        // expiredLinks,        
        Link.countDocuments({
            owner: new mongoose.Types.ObjectId(userId),
            expiresAt: { $lt: new Date() },
        }),
        // totalClicksResult,
        Link.aggregate([
            matchOwner,
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$clickCount",
                    },
                },
            },
        ]),

        // todayClicks,
        Analytics.countDocuments({
            owner: new mongoose.Types.ObjectId(userId),
            createdAt: {
                $gte: startOfToday,
            },
        }),

        // recentLinks,
        Link.find({ owner: new mongoose.Types.ObjectId(userId) })
            .sort({ createdAt: -1 })
            .limit(3)
            .select(
                "originalUrl shortCode clickCount isActive createdAt"
            ),
        // Clicks over last 7 days
        Analytics.aggregate([
            matchLast7Days,
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

        // Top countries
        Analytics.aggregate([
            matchOwner,
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
            {
                $limit: 5,
            },
            {
                $project: {
                    _id: 0,
                    country: "$_id",
                    clicks: 1,
                },
            },
        ]),
    ]);

    const totalClicks = totalClicksResult[0]?.total || 0
    const clicksMap = {};

    clicksOverTime.forEach((item) => {
        clicksMap[item._id] = item.clicks;
    });
    const formattedClicksOverTime = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(last7Days);
        date.setDate(last7Days.getDate() + i);
        const formattedDate = format(date, "yyyy-MM-dd");

        formattedClicksOverTime.push({
            date: formattedDate,
            day: date.toLocaleDateString("en-US", { weekday: "short" }), // Mon, Tue...
            clicks: clicksMap[formattedDate] || 0,
        });
    }


    return res.status(200).json(new ApiResponse(200, {
        totalLinks,
        activeLinks,
        expiredLinks,
        totalClicks,
        todayClicks,
        recentLinks,
        recentLinks,
        clicksOverTime: formattedClicksOverTime,
        topCountries
    }))

})

module.exports = { getDashboard }