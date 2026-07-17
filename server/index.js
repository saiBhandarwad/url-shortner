require("dotenv").config()
const connectDB = require("./config/db")
const express = require("express")
const cors = require("cors");
const app = express()
const PORT = 8000
const mongo_url = process.env.MONGO_URL
const userRouter = require("./route/user.routes")
const linkRouter = require("./route/link.routes")
const cookieParser = require("cookie-parser")
const auth = require("./middleware/auth.middleware")
const { getLinkByShortCode } = require("./route/redirect.routes")
// connecting to mongoDB database
connectDB(mongo_url)
// middlewares
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// routes
app.get("/:shortCode", getLinkByShortCode)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/links", auth, linkRouter)

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