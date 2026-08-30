const crypto = require("crypto");
const URLModel = require("./urls.model");

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

    let shortCode;
    let existingUrl;
    do {
        shortCode = generateShortCode();
        existingUrl = await URLModel.findOne({
            shortCode
        });
    } while (existingUrl);
    const url = await URLModel.create({
        originalUrl:
            parsedUrl.toString(),
        shortCode,
        user: userId
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
    return urls;
}

// Redirect short URL
async function redirectToOriginalUrl(shortCode) {
    const url = await URLModel.findOne({
        shortCode
    });

    if (!url) {
        throw new Error(
            "Short URL not found"
        );
    }
    // Increment click count
    url.clicks += 1;
    await url.save();
    return url.originalUrl;

}

module.exports = {
    createShortUrl,
    getMyLinks,
    redirectToOriginalUrl
};