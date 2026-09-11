const redisClient = require("../configurations/redis");
const URLModel = require("../urls/urls.model");

async function syncClicksCount(shortCode) {
    const clickKey = `shortify:clicks:${shortCode}`;
    // Atomically get the current count and reset it to 0
    const pendingClicks = await redisClient.getSet(
        clickKey,
        "0"
    );

    if (!pendingClicks) {
        return;
    }
    const clicks = Number(pendingClicks);
    if (clicks <= 0) {
        return;
    }
    // Add pending clicks to MongoDB
    await URLModel.updateOne(
        { shortCode },
        {
            $inc: {
                clicks
            }
        }
    );
}

module.exports = {
    syncClicksCount
};