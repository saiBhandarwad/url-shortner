const Link = require("../model/link")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const {nanoid} = require("nanoid")
const getLinkById = async (req, res) => {
    const id = req.params.id
    if(!id) throw new ApiError(400, "Link id is missing in request.")
    const link = await Link.findById(id)
    res.status(200).json(new ApiResponse(200, {link}))
}
const getAllLinks = async (req, res) => {
    const links = await Link.find({})
    res.status(200).json(new ApiResponse(200, {links}))
}

const createLink = async (req, res) => {
    const {originalUrl} = req.body
    if(!originalUrl) throw new ApiError
    const shortUrl = nanoid()
    const link = await Link.create({originalUrl, shortUrl})

    res.status(200).json(new ApiResponse(200, {link}, "Short url is created successfully."))
}
module.exports = {
    getLinkById, getAllLinks, createLink
}