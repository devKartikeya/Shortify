const amqp = require("amqplib");

let connection;
let channel;

async function connectRabbitMQ() {
    try {
        connection = await amqp.connect(
            process.env.RABBITMQ_URL || "amqp://localhost:5672"
        );

        channel = await connection.createChannel();

        await channel.assertQueue("email_queue", {
            durable: true
        });

        console.log("RabbitMQ connected successfully");
        console.log("Queue ready: email_queue");

        return channel;
    } catch (error) {
        console.error("RabbitMQ connection failed:", error);
        throw error;
    }
}

module.exports = {
    connectRabbitMQ
};