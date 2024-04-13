const amqp = require('amqplib');

async function setup() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Criar filas
    await channel.assertQueue('pedidos_loja_online');
    await channel.assertQueue('pedidos_processados');

    console.log("Filas criadas.");
}

setup();
