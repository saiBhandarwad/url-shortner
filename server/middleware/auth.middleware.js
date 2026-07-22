require("dotenv").config()
const User = require("../model/user.model")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const ApiError = require("../utils/ApiError")

const verifyJWT = async (req, res, next) => {

    try {
        const accessToken = req.headers['authorization'].split(" ")[1]
        if(!accessToken) throw new ApiError(400, "token is missing in the request.")
        const decoded = await jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY)
        req.userData = decoded
        next()
    } catch (error) {
        throw new ApiError(403, 'Invalid or expired token.')
    }

}

module.exports = verifyJWT