import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const chat: Array<any> = [];

io.on("connection", (client) => {
  console.log(`Client connected ${client.id}`);

  client.on("join", (userId) => {
    client.join(userId);
    console.log(`User with ID: ${client.id} joined room: ${userId}`);
  });

  client.on("sendMessage", (data) => {
    chat.push(data);
    console.log(data);
    client.to(data.idRoom).emit("sendMessage", data);
    client.to(data.idRoom).emit("receivedMessage", data);
  });

  client.on("getUserOnline", (data) => {
    chat.push(data);
    client.to(data.idRoom).emit("getUserOnline", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
