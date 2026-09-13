const app = require("./app");
const connectDB = require("./configurations/database");
const redisClient = require("./configurations/redis");
const { syncAllClickCounts } = require("./clicks-counters/syncAllClickCounts");

const PORT = process.env.PORT || 3000;

/* Start the server after establishing database and Redis connections */
async function startServer() {
  await connectDB();
  await redisClient.connect();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  /* Periodically synchronize click counts from Redis to the database every 60 seconds */
  setInterval(() => {
    syncAllClickCounts();
  }, 60 * 1000);
}

startServer();