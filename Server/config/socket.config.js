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
  console.log("connexion ios ok", socket.request.user._id);
  // workerId = socket.request.user._id;
  // console.log(workerId, "il est co lui");
  // socket.emit("workerId", workerId);
  // const ns = ios.of(`/${workerId}`);
  // ns.on("connect", async (nsSocket) => {
  //   try {
  //   } catch (e) {
  //     throw e;
  //   }
  // });

  // // not working yet,, if a worker disconnect of his scoket make him unavailable on the database
  // ns.on("disconnect", (socket) => {
  //   workerId = socket.request.user._id;
  //   socket.disconnect(true);
  //   updateAvailableToFalseById(workerId);
  // });
});

module.exports = ios;
