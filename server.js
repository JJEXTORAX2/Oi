// Importar as dependências
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Configurar o aplicativo Express
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Rota para a página principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Configurar eventos de Socket.IO
io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  // Quando uma mensagem é recebida
  socket.on('chat message', (msg) => {
    console.log('Mensagem recebida: ' + msg);

    // Enviar a mensagem para todos os usuários conectados
    io.emit('chat message', msg);
  });

  // Quando um usuário desconecta
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// Iniciar o servidor
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
