const crypto = require("crypto");
const URLModel = require("./urls.model");


// Generate a random short code
function generateShortCode(length = 6) {
    return crypto
        .randomBytes(6)
        .toString("base64url")
        .slice(0, length);
}


// Create shortened URL
async function createShortUrl(originalUrl, userId = null) {

    // Validate URL
    let parsedUrl;

    try {
        parsedUrl = new globalThis.URL(originalUrl);
    } catch (error) {
        throw new Error("Please provide a valid URL");
    }

    // Only allow HTTP and HTTPS
    if (
        parsedUrl.protocol !== "http:" &&
        parsedUrl.protocol !== "https:"
    ) {
        throw new Error(
            "Only HTTP and HTTPS URLs are allowed"
        );
    }


    // Generate unique short code
    let shortCode;
    let existingUrl;

    do {
        shortCode = generateShortCode();

        existingUrl = await URLModel.findOne({
            shortCode
        });

    } while (existingUrl);


    // Save URL
    const url = await URLModel.create({
        originalUrl: parsedUrl.toString(),
        shortCode,
        user: userId
    });


    return url;
}


module.exports = {
    createShortUrl
};