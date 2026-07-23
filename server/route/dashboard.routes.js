const { getDashboard } = require("../controller/dashboard.controller")

const router = require("express").Router()

router.
    get("/", getDashboard)

module.exports = router