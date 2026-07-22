const {  getAllLinks, createLink, getLinkByShortCode, getLinkById } = require("../controller/link.controller")

const router = require("express").Router()

router
    .post("/", getAllLinks)
    // .post("/search", searchLinks)
    .get("/:id", getLinkById)
    .post("/createLink", createLink)

module.exports = router