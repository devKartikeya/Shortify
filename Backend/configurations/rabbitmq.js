const amqp = require("amqplib");

let connection;
let channel;

async function connectRabbitMQ() {
    try {
        connection = await amqp.connect(
            "amqps://stgyggyj:rV0DCsBbEQLZxXI1vSKYGNATICPLGKiO@puffin.rmq2.cloudamqp.com/stgyggyj"
        );

        channel = await connection.createChannel();

        await channel.assertExchange("shortify_exchange", "direct", {
            durable: true
        });

        await channel.assertQueue("welcome_email_queue", { durable: true });
        await channel.assertQueue("click_analytics_queue", { durable: true });

        await channel.bindQueue("welcome_email_queue", "shortify_exchange", "user.registered");
        await channel.bindQueue("click_analytics_queue", "shortify_exchange", "url.clicked");

        console.log("RabbitMQ connected successfully");
        console.log("Queue ready: welcome_email_queue");
        console.log("Queue ready: click_analytics_queue");

        return channel;
    } catch (error) {
        console.error("RabbitMQ connection failed:", error);
        throw error;
    }
}

function getRabbitMQChannel() {
    return channel;
}

module.exports = {
    connectRabbitMQ,
    getRabbitMQChannel
};