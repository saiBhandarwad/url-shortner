require("dotenv").config()
const Link = require("../model/link")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const { nanoid } = require("nanoid")
const { generateUniqueShortCode } = require("../utils/generateUniqueShortCode")

const getAllLinks = async (req, res) => {
    const userData = req.userData
    const links = await Link.find({ owner: userData.data.id })
    res.status(200).json(new ApiResponse(200, { links }))
}
const getLinkById = async (req, res) => {
    const {id} = req.params
    const link = await Link.findById({ _id: id })
    if(!link) throw new ApiError(404, "Not found")
    res.status(200).json(new ApiResponse(200, { links }))
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