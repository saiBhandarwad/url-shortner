require("dotenv").config()
const User = require("../model/user")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { generateAccessToken, generateRefreshToken } = require("../utils/token")
const { setRefreshCookie } = require("../utils/cookie")
const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponse")
const verifyRefreshToken = require("../utils/verifyToken")


const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const isEmailPresent = await User.findOne({ email })

    if (isEmailPresent) throw new ApiError(400, "Email Already Present")
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashedPassword })
    const refreshToken = generateRefreshToken(user)
    user.refreshToken = refreshToken
    await user.save()
    const accessToken = generateAccessToken(user)
    setRefreshCookie(res, refreshToken)
    res.status(201).json(new ApiResponse(201, { accessToken }, "user created successfully"))
})
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password")
    return res.status(200).json(new ApiResponse(200, { users }))
})
const getUserById = asyncHandler(async (req, res) => {
    const id = req.params.id
    if (!id) throw new ApiError(400, "user id is missing in request")
    const user = await User.findById(id).select("-password")
    if (!user) throw new ApiError(401, "Invalid user id")
    return res.status(200).json(new ApiResponse(200, { user }))
}
)
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!(email && password)) throw new ApiError(400, "credentials are insufficient, email or password missing in request")
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(401, "Invalid credentials")
    }
    const isUserAuthenticated = await bcrypt.compare(password, user?.password)
    const refreshToken = generateRefreshToken(user)
    const accessToken = generateAccessToken(user)
    if (isUserAuthenticated) {
        user.refreshToken = refreshToken;
        await user.save();
        setRefreshCookie(res, refreshToken)
        return res.status(200).json(new ApiResponse(200, { accessToken }, "user logged in successfully"))
    }
    else {
        throw new ApiError(401, "Invalid credentials")
    }
})
const refreshUser = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new ApiError(401, "Refresh token missing. ")

    const user = await User.findOne({ refreshToken })
    if (!user) {
        throw new ApiError(401, "Invalid refresh token. ")
    }

    const decoded = verifyRefreshToken(refreshToken)
    if (decoded.data.id !== user._id.toString()) {
        throw new ApiError(401, "Token mismatch")
    }
    const newRefreshToken = generateRefreshToken(user)
    user.refreshToken = newRefreshToken;
    await user.save();
    setRefreshCookie(res, newRefreshToken)
    const accessToken = generateAccessToken(user)
    return res.status(200).json(new ApiResponse(200, { accessToken }, "user logged in successfully"))
})

const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.userData.data.id)
        .select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { user },
            "Current user fetched successfully."
        )
    );
};


module.exports = {
    getUserById, getAllUsers, createUser, loginUser, refreshUser, getCurrentUser
}