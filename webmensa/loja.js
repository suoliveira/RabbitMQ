const amqp = require('amqplib');

async function enviarPedido() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const pedido = {
        cliente: 'ClienteX',
        produto: 'ProdutoY',
        quantidade: 1,
        endereco: 'Rua A, 123'
    };

    // Enviar pedido para a fila da loja online
    channel.sendToQueue('pedidos_loja_online', Buffer.from(JSON.stringify(pedido)));

    console.log("Pedido enviado:", pedido);

    await new Promise(resolve => setTimeout(resolve, 1000));
    await connection.close();
}

enviarPedido();
