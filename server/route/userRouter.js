const { getAllUsers, createUser, getUserById, loginUser, refreshUser } = require("../controller/user.controller")
const auth = require("../middleware/auth.middleware")
const router = require("express").Router()

router
    .get("/", auth, getAllUsers)
    .get("/:id", auth, getUserById)
    .post("/signup", createUser)
    .post("/login", loginUser)
    .post("/refresh", refreshUser)

module.exports = router