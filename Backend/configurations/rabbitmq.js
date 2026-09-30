const amqp = require("amqplib");

let connection;
let channel;

async function connectRabbitMQ() {
    try {
        connection = await amqp.connect(
            process.env.RABBITMQ_URL || "ampq://localhost:5672"
        );
        channel = await connection.createChannel();

        console.log("RabbitMQ Connected Successfully !");
        return channel;
    } catch (error) {
        console.log("RabbitMQ Connection Failed ! ", error);
        throw error;
    }
}

module.exports = {
    connectRabbitMQ
};