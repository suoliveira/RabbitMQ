const amqp = require('amqplib');
const { buffer } = require('stream/consumers');
const sqlite3 = require('sqlite3').verbose();

async function processarPedido() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const db = new sqlite3.Database('loja.db');

    // Criar tabela de pedidos se não existir
    db.run(`CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente TEXT,
        produto TEXT,
        quantidade INTEGER,
        endereco TEXT
    )`);

    // Função para processar e registrar pedidos
    function callback(msg) {
        const pedido = JSON.parse(msg.content.toString());
        db.run(`INSERT INTO pedidos (cliente, produto, quantidade, endereco)
                VALUES (?, ?, ?, ?)`, [pedido.cliente, pedido.produto, pedido.quantidade, pedido.endereco]);
        console.log("Pedido registrado:", pedido);
        channel.ack(msg);
        channel.sendToQueue("pedidos_processados", Buffer.from(JSON.stringify(pedido)));
    }

    // Configurar o consumidor para receber mensagens da fila da loja online
    channel.consume('pedidos_loja_online', callback, { noAck: false });
    console.log('Aguardando pedidos...');
}

processarPedido();
