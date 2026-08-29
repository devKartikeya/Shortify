const { createShortUrl } = require("./urls.service");

async function createShortUrlController(req, res) {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                success: false,
                message: "URL is required"
            });
        }

        // For now userId is null because this endpoint
        // also supports guest users.
        const url = await createShortUrl(originalUrl, null);

        return res.status(201).json({
            success: true,
            message: "URL shortened successfully",
            data: {
                originalUrl: url.originalUrl,
                shortCode: url.shortCode,
                shortUrl: `http://localhost:3000/${url.shortCode}`,
                clicks: url.clicks,
                createdAt: url.createdAt
            }
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createShortUrlController
};