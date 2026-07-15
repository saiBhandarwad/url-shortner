require("dotenv").config()
const User = require("../model/user")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {

    try {
        const accessToken = req.headers['authorization'].split(" ")[1]
        const decoded = await jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY)
        
        next()
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }


    // const user = await User.findOne({ email: decoded.email })
    // const isUserAuthenticated = await bcrypt.compare(password, decoded.password)
    // const accessToken = await jwt.sign({ data: user }, process.env.JWT_SECRET_KEY, { expiresIn: 60 })
    // if (isUserAuthenticated) res.status(200).send({ accessToken, message: "user logged in successfully" })
    // else res.status(400).send("invalid token")

}

module.exports = auth