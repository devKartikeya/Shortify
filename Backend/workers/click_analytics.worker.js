const {
    connectRabbitMQ,
    getRabbitMQChannel
} = require("../configurations/rabbitmq");
const Clicks = require("../clicks/clicks.model");
const URLModel = require("../urls/urls.model");
const parseUserAgent = require("../configurations/user-agent");

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

            console.log("Processing click analytics:", payload);

            // Log the analytics data
            // await logAnalyticsData();
        } catch (error) {
            console.error("Error processing click analytics:", error);
        } finally {
            channel.ack(message);
        }
    });

    console.log("Click analytics worker started");
}

async function logAnalyticsData(req, url) {
   
}

start();