const { redisClient } = require("../config/redis");

const rateLimiter = ({limit = 100, windowSeconds = 60,} = {}) => {
    return async (req, res, next) => {
        try {
            const ip = req.ip;

            const windowId = Math.floor(
                Date.now() / (windowSeconds * 1000)
            );

            const key = `rate-limit:${ip}:${windowId}`;

            // Increment this IP's request count
            const requests = await redisClient.incr(key);

            // Set expiry only for the first request
            if (requests === 1) {
                await redisClient.expire(key, windowSeconds);
            }

            res.setHeader("X-RateLimit-Limit", limit);
            res.setHeader(
                "X-RateLimit-Remaining",
                Math.max(0, limit - requests)
            );

            if (requests > limit) {
                return res.status(429).json({
                    success: false,
                    message: "Too many requests. Please try again later.",
                });
            }

            next();
        } catch (error) {
            console.error("Rate limiter error:", error);

            // Fail closed: reject requests if rate limiting cannot be checked.
            return res.status(503).json({
                success: false,
                message: "Service temporarily unavailable",
            });
        }
    };
};

module.exports = rateLimiter;