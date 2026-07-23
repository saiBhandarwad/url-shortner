require("dotenv").config()
const Link = require("../model/link.model")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const { nanoid } = require("nanoid")
const { generateUniqueShortCode } = require("../utils/generateUniqueShortCode")
const Analytics = require("../model/analytics.model")

const getAllLinks = async (req, res) => {
    const { id } = req.userData.data
    const { search } = req.body || "";
    const { page } = req.body.pagination || 1;
    const { limit } = req.body.pagination || 10;
    const skip = (page - 1) * limit;
    const filter = { owner: id };
    if (search.trim()) {
        filter.$or = [
            {
                originalUrl: {
                    $regex: search,
                    $options: "i",
                },
            },
            {
                shortCode: {
                    $regex: search,
                    $options: "i",
                },
            }
        ];
    }
    const totalRecords = await Link.countDocuments(filter);
    const links = await Link.find(filter)
        .skip(skip)
        .limit(limit);
    const totalPages = Math.ceil(totalRecords / limit);
    res.status(200).json(
        new ApiResponse(200, {
            links,
            pagination: {
                totalRecords,
                currentPage: page,
                totalPages,
                limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        })
    );
}
const getLinkById = async (req, res) => {
    const { id } = req.params
    const link = await Link.findById({ _id: id })
    if (!link) throw new ApiError(404, "Not found")
    await Analytics.create({
        link: link._id,
        owner: link.owner,

        ipAddress: req.ip,

        browser: req.useragent?.browser,

        os: req.useragent?.os,

        device: req.useragent?.isMobile
            ? "Mobile"
            : req.useragent?.isTablet
                ? "Tablet"
                : "Desktop",

        userAgent: req.headers["user-agent"],

        referrer: req.headers.referer || "Direct",

        language: req.headers["accept-language"],

        clickedAt: new Date(),
    });
    res.status(200).json(new ApiResponse(200, { link }))
}



const createLink = async (req, res) => {
    const { originalUrl } = req.body
    const userData = req.userData
    if (!originalUrl) throw new ApiError(400, "Original URL is required.");
    const shortCode = await generateUniqueShortCode()
    const link = await Link.create({ originalUrl, shortCode, owner: userData.data.id, isActive: true, clickCount: 0 })
    res.status(201).json(new ApiResponse(201, { link }, "Short URL created successfully."))
}
module.exports = {
    getAllLinks, createLink, getLinkById
}