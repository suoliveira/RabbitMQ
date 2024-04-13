const amqp = require('amqplib');

async function enviarPedidoParaLogistica() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Função para enviar pedidos processados para o sistema de envio/logística
    function callback(msg) {
        const pedido = JSON.parse(msg.content.toString());
        console.log("Pedido enviado para o sistema de envio:", pedido);
        channel.ack(msg);
    }

    // Configurar o consumidor para receber mensagens da fila de pedidos processados
    channel.consume('pedidos_processados', callback, { noAck: false });

    console.log('Aguardando pedidos processados...');
}

enviarPedidoParaLogistica();
