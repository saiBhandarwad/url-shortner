const winston = require("winston");
const path = require("path");
const fs = require("fs");

const logDir = path.join(__dirname, "../logs");

// Create logs folder if it doesn't exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
    level: "info",

    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),

    transports: [
        new winston.transports.Console(),
        // Store all logs
        new winston.transports.File({
            filename: path.join(logDir, "combined.log"),
        }),

        // Store only errors
        new winston.transports.File({
            filename: path.join(logDir, "error.log"),
            level: "error",
        }),
    ],
});

// Print logs in terminal while developing
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        })
    );
}

module.exports = logger;