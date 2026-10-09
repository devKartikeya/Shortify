const crypto = require("crypto");
const URLModel = require("./urls.model");
const User = require("../users/users.model");
const Clicks = require("../clicks/clicks.model");
const redisClient = require("../configurations/redis");
const parseUserAgent = require("../configurations/user-agent");

// Generate short code
function generateShortCode(length = 6) {
    return crypto
        .randomBytes(6)
        .toString("base64url")
        .slice(0, length);
}

// Create shortened URL
async function createShortUrl(
    originalUrl,
    userId = null
) {
    let parsedUrl;

    const isUserActive = await User.findOne({ _id: userId });

    console.log("isUserActive:", isUserActive);

    if (isUserActive.isActive == false) {
        throw new Error(
            "Your account is inactive. Cannot create short URL."
        );
    }

    try {
        parsedUrl =
            new globalThis.URL(originalUrl);
    } catch (error) {
        throw new Error(
            "Please provide a valid URL"
        );
    }

    if (
        parsedUrl.protocol !== "http:" &&
        parsedUrl.protocol !== "https:"
    ) {
        throw new Error(
            "Only HTTP and HTTPS URLs are allowed"
        );
    }

    const normalizedUrl = parsedUrl.toString();

    // Check if URL already exists
    const existingUrl = await URLModel.findOne({
        originalUrl: normalizedUrl
    });

    if (existingUrl) {
        return existingUrl;
    }

    // Generate a unique short code
    let shortCode;
    let existingShortCode;

    do {
        shortCode = generateShortCode();
        existingShortCode = await URLModel.findOne({
            shortCode
        });
    } while (existingShortCode);

    const url = await URLModel.create({
        originalUrl: normalizedUrl,
        shortCode,
        user: userId,
        isActive: true,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    return url;
}

// Get logged-in user's URLs
async function getMyLinks(userId) {
    const urls = await URLModel.find({
        user: userId
    }).sort({
        createdAt: -1
    });
    /* Also return all clicks analytics through Clicks model */
    const clickAnalytics = await Clicks.find({ shortCode: { $in: urls.map(url => url.shortCode) } });
    console.log("clickAnalytics:", clickAnalytics);
    return { urls, clickAnalytics };
}

// Redirect short URL
async function redirectToOriginalUrl(shortCode, req) {
    const cacheKey = `shortify:url:${shortCode}`;
    const clickKey = `shortify:clicks:${shortCode}`;
    const cachedUrl = await redisClient.get(cacheKey);
    if (cachedUrl) {
        await redisClient.incr(clickKey);
        return cachedUrl;
    }

    const url = await URLModel.findOne({
        shortCode
    });
    if (!url) {
        throw new Error(
            "Short URL not found"
        );
    }
    if (!url.isActive) {
        throw new Error(
            "This short URL is inactive"
        );
    }
    if (url.expiresAt && url.expiresAt < new Date()) {
        throw new Error(
            "This short URL has expired"
        );
    }
    await redisClient.set(
        cacheKey,
        url.originalUrl
    );

    await redisClient.incr(clickKey);

    // Log the click in the database
    return url.originalUrl;
}

async function deleteUrl(shortCode) {
    const url = await URLModel.findOneAndDelete({
        shortCode
    });
    return url;
}

module.exports = {
    createShortUrl,
    getMyLinks,
    redirectToOriginalUrl,
    deleteUrl
};