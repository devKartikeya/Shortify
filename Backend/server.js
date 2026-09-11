const app = require("./app");
const connectDB = require("./configurations/database");
const redisClient = require("./configurations/redis");
const { syncAllClickCounts } = require("./clicks-counters/syncAllClickCounts");

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDB();
  await redisClient.connect();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  setInterval(() => {
    syncAllClickCounts();
  }, 60 * 1000);
}

startServer();