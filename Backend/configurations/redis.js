const { createClient } = require("redis");

const redisClient = createClient({
    // url: "redis://host.docker.internal:6379"
    url: "redis://localhost:6379"
});

redisClient.on("error", (err) => {
    console.error("Failed to connect with Redis !", err);
});

module.exports = redisClient;