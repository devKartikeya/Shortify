const {
    connectRabbitMQ,
    getRabbitMQChannel
} = require("../configurations/rabbitmq");
const Clicks = require("../clicks/clicks.model");
const URLModel = require("../urls/urls.model");
const mongoose = require("mongoose");
const getGeoLocation = require("../utilities/geo-location");

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb://kartikeya2122008_db_user:XIpjPCfVNzudfLmO@ac-dqrvras-shard-00-00.tipdh27.mongodb.net:27017,ac-dqrvras-shard-00-01.tipdh27.mongodb.net:27017,ac-dqrvras-shard-00-02.tipdh27.mongodb.net:27017/URL-Shortener?ssl=true&replicaSet=atlas-c2yrv0-shard-0&authSource=admin&appName=Cluster0";
    
    await mongoose.connect(MONGO_URI);
    console.log('Connected successfully with the Database: By Worker');
  } catch (err) {
    console.error('Failed to connect with the Database:', err);
    process.exit(1);
  }
};

connectDB();

async function start() {
    await connectRabbitMQ();

    const channel = getRabbitMQChannel();

    /* This will ensure that the worker processes one message at a time, which is important for logging analytics data to avoid overwhelming the database. (Backpressure) */
    /* What is Backpressure? Backpressure is a mechanism to control the rate at which messages are consumed from a queue, preventing the system from being overwhelmed. */
    channel.prefetch(1);

    channel.consume("click_analytics_queue", async (message) => {
        if (!message) return;

        try {
            const payload = JSON.parse(
                message.content.toString()
            );

            /* The Payload is simply the originalUrl, for example- "kartikeyamishra.vercel.app" */

            console.log("Processing click analytics:", payload);

            // Log the analytics data
            logAnalyticsData(payload);
        } catch (error) {
            console.error("Error processing click analytics:", error);
        } finally {
            channel.ack(message);
        }
    });

    console.log("Click analytics worker started");
}

async function logAnalyticsData(payload) {
    const url = await URLModel.findOne({ originalUrl: payload.originalUrl });
    const geo = await getGeoLocation(payload.ip);
    const click = await Clicks.create({
        urlId: url._id,
        shortCode: url.shortCode,
        clickedAt: new Date(),

        ip: payload.ip || null,
        userAgent: payload.userAgent || null,

        device: {
            type: payload.parser.deviceType,
            os: payload.parser.os,
            browser: payload.parser.browser,
        },
        geo: {
            country: geo.country,
            region: geo.region,
            city: geo.city,
        },
        referrer: payload.referrer || null,
    });
    console.log("Click logged:", click);
}

start();