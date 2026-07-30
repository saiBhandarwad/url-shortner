const logger = require("../utils/logger");

const requestLogger = (req, res, next) => {
    logger.info({
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
    });

    next();
};

module.exports = requestLogger;