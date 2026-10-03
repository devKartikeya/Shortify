const { createClient } = require("redis");

const redisClient = createClient({
    // url: "redis://host.docker.internal:6379"
    url: process.env.REDIS_URL || "redis://redis:6379"
});

redisClient.on("error", (err) => {
    console.error("Failed to connect with Redis !", err);
});

module.exports = redisClient;