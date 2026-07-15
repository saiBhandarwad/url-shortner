const jwt = require("jsonwebtoken")

// helper functions
const generateAccessToken = (user) => {
    return jwt.sign({ data: { email: user.email, id: user._id } }, process.env.ACCESS_SECRET_KEY, { expiresIn: "5m" })
}
const generateRefreshToken = (user) => {
    return jwt.sign({ data: { email: user.email, id: user._id } }, process.env.REFRESH_SECRET_KEY, { expiresIn: "7d" })
}


module.exports = { 
    generateAccessToken, generateRefreshToken
}