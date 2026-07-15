const { getLinkById, getAllLinks, createLink } = require("../controller/linkController")

const router = require("express").Router()

router
    .get("/", getAllLinks)
    .get("/:id", getLinkById)
    .post("/createLink", createLink)

module.exports = router