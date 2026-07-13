require("dotenv").config()
const User = require("../model/user")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { generateAccessToken, generateRefreshToken } = require("../utils/token")
const { setRefreshCookie } = require("../utils/cookie")
const asyncHandler = require("../utils/asyncHandler")

const createUserHandler = async (req, res) => {
    const { name, email, password } = req.body
    console.log(1);
    
    const isEmailPresent = await User.findOne({ email })

    if (isEmailPresent) return res.status(400).send({ succeeded: false, message: "Email Already Present" })
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({ name, email, password: hashedPassword })
    console.log(2);
    const refreshToken = generateRefreshToken(user)
    console.log(3);
    user.refreshToken = refreshToken
    await user.save()
    console.log(4);
    const accessToken = generateAccessToken(user)
    setRefreshCookie(res, refreshToken)
    res.status(201).send({ succeeded: true, message: "user created successfully", accessToken })
}
const loginUserHandler = async (req, res) => {
    const { email, password } = req?.body
    if (!(email && password)) return res.status(400).send({ succeeded: false, message: "credentials are insufficient, email or password missing in request" })
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).send({
            succeeded: false,
            message: "Invalid credentials"
        });
    }
    const isUserAuthenticated = await bcrypt.compare(password, user?.password)
    const refreshToken = generateRefreshToken(user)
    const accessToken = generateAccessToken(user)
    if (isUserAuthenticated) {
        user.refreshToken = refreshToken;
        await user.save();

        setRefreshCookie(res, refreshToken)
        return res.status(200).send({ succeeded: true, accessToken, message: "user logged in successfully" })
    }
    else {
        res.status(401).send({ succeeded: false, message: "invalid credentials" })
    }
}
const refreshUserHandler = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).send({ succeeded: false, message: "Refresh token missing. " })

    const user = await User.findOne({ refreshToken })
    if (!user) {
        return res.status(401).send({ succeeded: false, message: "Invalid refresh token. " })
    }
    let decoded;

    try {
        decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_KEY
        );
    } catch (err) {
        return res.status(401).send({
            succeeded: false,
            message: "Invalid or expired refresh token"
        });
    }
    if (decoded.data.id !== user._id.toString()) {
        return res.status(401).send({
            succeeded: false,
            message: "Token mismatch"
        });
    }
    const newRefreshToken = generateRefreshToken(user)
    user.refreshToken = newRefreshToken;
    await user.save();
    setRefreshCookie(res, refreshToken)
    const accessToken = generateAccessToken(user)
    res.status(200).send({ succeeded: true, accessToken, message: "user logged in successfully" })
}
const getAllUsersHandler = async (req, res) => {
    const users = await User.find({}).select("-password")
    res.status(200).send({ succeeded: true, users })
}
const getUserByIdHandler = async (req, res) => {
    const id = req.params.id
    if (!id) return res.status(400).send({ succeeded: false, message: "enter user id" })
    const user = await User.findById(id).select("-password")
    res.status(200).send({ succeeded: true, user })
}

const createUser = asyncHandler(createUserHandler)
const getAllUsers = asyncHandler(getAllUsersHandler)
const getUserById = asyncHandler(getUserByIdHandler)
const loginUser = asyncHandler(loginUserHandler)
const refreshUser = asyncHandler(refreshUserHandler)
module.exports = {
    getUserById, getAllUsers, createUser, loginUser, refreshUser
}