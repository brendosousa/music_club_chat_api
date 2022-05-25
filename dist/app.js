"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
var PORT = process.env.PORT || 3001;
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
var chat = [];
io.on("connection", function (client) {
    console.log("Client connected ".concat(client.id));
    client.on("join", function (userId) {
        client.join(userId);
        console.log("User with ID: ".concat(client.id, " joined room: ").concat(userId));
    });
    client.on("sendMessage", function (data) {
        chat.push(data);
        console.log(data);
        client.to(data.idRoom).emit("sendMessage", data);
        client.to(data.idRoom).emit("receivedMessage", data);
    });
    client.on("getUserOnline", function (data) {
        chat.push(data);
        client.to(data.idRoom).emit("getUserOnline", data);
    });
});
server.listen(PORT, function () {
    console.log("Server started at ".concat(PORT));
});
