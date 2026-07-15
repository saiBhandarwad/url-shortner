require("dotenv").config()
const connectDB = require("./config/db")
const express = require("express")
const app = express()
const PORT = 8000
const mongo_url = process.env.MONGO_URL
const userRouter = require("./route/userRouter")
const linkRouter = require("./route/linkRouter")
const cookieParser = require("cookie-parser")
// connecting to mongoDB database
connectDB(mongo_url)
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/links", linkRouter)

// handles error
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log("server started and listening on the port :", PORT)
}) 