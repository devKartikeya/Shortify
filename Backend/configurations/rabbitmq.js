const amqp = require("amqplib");

let connection;
let channel;

async function connectRabbitMQ() {
    try {
        connection = await amqp.connect(
            process.env.RABBITMQ_URL || "amqp://localhost:5672"
        );

        channel = await connection.createChannel();

        await channel.assertExchange("shortify_exchange", "direct", {
            durable: true
        });

        await channel.assertQueue("welcome_email_queue", { durable: true });

        await channel.bindQueue("welcome_email_queue", "shortify_exchange", "user.registered");

        console.log("RabbitMQ connected successfully");
        console.log("Queue ready: welcome_email_queue");

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