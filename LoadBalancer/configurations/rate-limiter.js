const { rateLimit } = require("express-rate-limit");

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: "Too many requests, try later on !",
    statusCode: 429
});

module.exports = rateLimiter;