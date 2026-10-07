const redisClient = require("../configurations/redis");
const syncClickCounts = require("./syncClickCounts").syncClicksCount;

async function syncAllClickCounts() {
    let cursor = "0";

    do {
        const result = await redisClient.scan(
            cursor,
            {
                MATCH: "shortify:clicks:*",
                COUNT: 100
            }
        );

        cursor = result.cursor;

        for (const key of result.keys) {
            const shortCode =
                key.replace("shortify:clicks:", "");

            await syncClickCounts(shortCode);
        }

    } while (cursor !== "0");
}
module.exports = {
    syncAllClickCounts
};