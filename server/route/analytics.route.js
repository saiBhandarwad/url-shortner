const router = require("express").Router();
const { getAnalytics } = require("../controller/analytics.controller");

router.get("/", getAnalytics);

module.exports = router;