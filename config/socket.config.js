const socketio = require("socket.io");
const { server } = require("../app");
const { ensureAuthenticatedOnSocketHandshake } = require("./security.config");
let ios ;
const {updateAvailableToFalseById}= require ('../queries/workers.queries')


  ios = socketio(server, {
//authentication
    allowRequest: ensureAuthenticatedOnSocketHandshake,
  });
  ios.on("connect", (socket) => {
    console.log("connexion ios ok");
    workerId =  socket.request.user._id
    socket.emit("workerId", workerId);
    const ns = ios.of(`/${workerId}`)
    ns.on("connect", async (nsSocket) => {
              try {
              
                console.log("okokok")
          
              } catch (e) {
                throw e;
              }
  });


// not working yet,, if a worker disconnect of his scoket make him unavailable on the database 
  ns.on("disconnect", (socket) => {
    console.log("on est la")
    workerId =  socket.request.user._id
    socket.disconnect(true);
    updateAvailableToFalseById(workerId)
  });

})





module.exports = ios









// ios.on("disconnect",  (nsSocket) => { 
//   const workerId =  nsSocket.request.user._id
//   console.log(workerId)
//   updateAvailableToFalseById(workerId)
//   console.log("disconnect")
  
// })


 


