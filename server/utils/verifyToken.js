const jwt = require("jsonwebtoken");
const ApiError = require("./ApiError");

const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(
            token,
            process.env.REFRESH_SECRET_KEY
        );
    } catch {
        throw new ApiError(
            401,
            "Invalid or expired refresh token"
        );
    }
};

module.exports = verifyRefreshToken;