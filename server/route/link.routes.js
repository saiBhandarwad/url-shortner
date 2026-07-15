const {  getAllLinks, createLink, getLinkByShortCode, getLinkById } = require("../controller/link.controller")

const router = require("express").Router()

router
    .get("/", getAllLinks)
    .get("/:id", getLinkById)
    .post("/createLink", createLink)

module.exports = router