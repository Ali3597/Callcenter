const socketio = require("socket.io");
const server = require("../bin/www");
const { ensureAuthenticatedOnSocketHandshake } = require("./security.config");
let ios;

ios = socketio(server, {
  //authentication
  cors: {
    origin: process.env.ALLOWFRONT,
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowRequest: ensureAuthenticatedOnSocketHandshake,
});
ios.on("connect", (socket) => {
  workerId = socket.request.user._id;

  socket.join(`${workerId}`);
});

module.exports = ios;
