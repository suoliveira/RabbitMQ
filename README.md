# RabbitMQ

- No segundo experimento conectamos com o banco de dados para onde irá enviar as informações do pedido, que são sempre as mesmas descritas no código loja.js.

- Criamos duas filas uma para receber o pedido e outra para quando o pedido estiver em envio.

- No arquivo primeiroConsumidor.js ele cria a tabela no banco de dados e espera a loja.js enviar algum pedido, assim que o pedido é enviado o segundoConsumidor.js recebe as informações que foram repassadas pelo primeiroConsumidor e coloca o pedido em enviado.

  
