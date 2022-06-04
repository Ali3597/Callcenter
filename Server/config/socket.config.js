const socketio = require("socket.io");
const { server } = require("../app");
const { ensureAuthenticatedOnSocketHandshake } = require("./security.config");
let ios;
const { updateAvailableToFalseById } = require("../queries/workers.queries");

ios = socketio(server, {
  //authentication
  cors: {
    origin: "http://localhost:3000",
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
