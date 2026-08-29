const {
    createShortUrl,
    redirectToOriginalUrl
} = require("./urls.service");


// Create short URL
async function createShortUrlController(req, res) {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl) {
            return res.status(400).json({
                success: false,
                message: "URL is required"
            });
        }
        const url = await createShortUrl(
            originalUrl,
            null
        );

        return res.status(201).json({
            success: true,
            message: "URL shortened successfully",
            data: {
                originalUrl: url.originalUrl,
                shortCode: url.shortCode,
                shortUrl:
                    `http://localhost:3000/${url.shortCode}`,
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

// Redirect short URL
async function redirectUrlController(req, res) {
    try {
        const { shortCode } = req.params;
        const originalUrl =
            await redirectToOriginalUrl(shortCode);
        return res.redirect(originalUrl);

    } catch (error) {
        return res.status(404).send(`
            <h1>Short URL Not Found</h1>
            <p>${error.message}</p>
        `);
    }
}
module.exports = {
    createShortUrlController,
    redirectUrlController
};