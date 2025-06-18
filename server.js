
require('dotenv').config();

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));

io.on("connection", socket => {
  console.log("Usuário conectado:", socket.id);

  socket.on("offer", data => socket.broadcast.emit("offer", data));
  socket.on("answer", data => socket.broadcast.emit("answer", data));
  socket.on("ice", data => socket.broadcast.emit("ice", data));
});

// server.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});