const app = require("./app");
const cron = require('./utilities/cleanUpOldLogs');
// const redisClient = require("./configurations/redis");
const connectDB = require("./configurations/database");
const { connectRabbitMQ } = require("./configurations/rabbitmq");
const { syncAllClickCounts } = require("./clicks/syncAllClickCounts");
const client = require("./configurations/redis");

const PORT = process.env.PORT || 3000;

/* Start the server after establishing database and Redis connections */
async function startServer() {
  await connectDB();
  await client.connect();
  await connectRabbitMQ();

  await client.set('foo', 'bar');
  const result = await client.get('foo');
  console.log(result)  // >>> bar

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });



  /* Periodically synchronize click counts from Redis to the database every 60 seconds */
  setInterval(() => {
    syncAllClickCounts();
  }, 60 * 1000);

  setInterval(cron, 2 * 60 * 1000); /* Run the cron job every 2 minutes */
}

startServer();