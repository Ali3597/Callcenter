const socketio = require("socket.io");
const { server } = require("../app");
const { ensureAuthenticatedOnSocketHandshake } = require("./security.config");
let ios 
clients=[]
 const {updateAvailableToFalseById}= require ('../queries/workers.queries')


// ios = socketio(server, {
//       allowRequest: ensureAuthenticatedOnSocketHandshake,
//     });

// ios.on("connect",  (nsSocket) => { 
//           const workerId =  nsSocket.request.user._id
          
//           nsSocket.join(`/${workerId}`);
//           clients.push(workerId)
//           console.log(nsSocket.rooms)
//      nsSocket.on("disconnect",()=>{
//        updateAvailableToFalseById(workerId)
//      })
          
//   })
//   module.exports = ios



// const initNamespaces = async () => {
//   try {
//     // Lors du lancement du serveur les namespaces sont récupérés
//     // et stockés en mémoire dans une variable :
//     namespaces = await getNamespaces();
//     // Pour chacun des namespaces récupérés :
//     for (let namespace of namespaces) {
//       // Nous créons un namespace socket.io avec l’id
//       // du namespace :
//       const ns = ios.of(`/${namespace._id}`);
//       // Chacun des namespaces a un gestionnaire d’événement
//       // dans le cas où une socket se connecte :
//       ns.on("connect", async (nsSocket) => {
//         try {
//           //  Etape 3 (partie serveur) nsSocket est une socket connecté à un 
//           //  des namespaces lors de sa connexion au namespace, les rooms du 
//           //  namespace lui sont retournées :
//           const rooms = await findRoomPerNamespaceId(namespace._id);
//           nsSocket.emit("rooms", rooms);
//         } catch (e) {
//           throw e;
//         }
//       });
//     }
//   } catch (e) {
//     throw e;
//   }
// };


  ios = socketio(server, {
    // Etape 1 : le client se connecte et est authentifié
    allowRequest: ensureAuthenticatedOnSocketHandshake,
  });
  ios.on("connect", (socket) => {
    console.log("connexion ios ok");
    // Etape 2 le serveur lui envoie l'id du l'urtilisateur  récupérées lors
    // de sa connexion  / 
    // (ils sont récupérés au lancement du serveur socket.io) :
    workerId =  socket.request.user._id
    socket.emit("workerId", workerId);
    const ns = ios.of(`/${workerId}`)
    ns.on("connect", async (nsSocket) => {
              try {
               
                //  Etape 3 (partie serveur) nsSocket est une socket connecté à un 
                //  des namespaces lors de sa connexion au namespace, les rooms du 
                //  namespace lui sont retournées :
              
                console.log("okokok")
                // const rooms = await findRoomPerNamespaceId(namespace._id);
                // nsSocket.emit("rooms", rooms);
              } catch (e) {
                throw e;
              }
  });



  ns.on("disconnect", (socket) => {
    console.log("on est la")
    workerId =  socket.request.user._id
    socket.disconnect(true);
    updateAvailableToFalseById(workerId)
  });

  // initNamespaces();
})





module.exports = ios









// ios.on("disconnect",  (nsSocket) => { 
//   const workerId =  nsSocket.request.user._id
//   console.log(workerId)
//   updateAvailableToFalseById(workerId)
//   console.log("disconnect")
  
// })


 


