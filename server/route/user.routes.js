const { getAllUsers, createUser, getUserById, loginUser, refreshUser, getCurrentUser } = require("../controller/user.controller")
const verifyJWT = require("../middleware/auth.middleware")
const router = require("express").Router()

router
    // .get("/", auth, getAllUsers)
    .get("/me", verifyJWT, getCurrentUser)
    .get("/:id", verifyJWT, getUserById)
    .post("/signup", createUser)
    .post("/login", loginUser)
    .post("/refresh", refreshUser)

module.exports = router