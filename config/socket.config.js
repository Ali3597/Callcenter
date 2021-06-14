const socketio = require("socket.io");
const { server } = require("../app");
const { ensureAuthenticatedOnSocketHandshake } = require("./security.config");
var ari = require('ari-client');
var util = require('util');
const {clientLoaded }= require('../asterisk/index')
ipAsterisk= "192.168.1.24"
PortAsterisk="8088"
userAsterisk="asterisk"
mdpAsterisk="asterisk"


ios = socketio(server, {
      allowRequest: ensureAuthenticatedOnSocketHandshake,
    });

const ns = ios.of(`/`)
module.exports = ns
// ari.connect('http://'+ipAsterisk+':'+ PortAsterisk,userAsterisk, mdpAsterisk, clientLoaded)
ns.on("connect",  (nsSocket) => { 
          const workerId =  nsSocket.request.user._id
          nsSocket.join(`/${workerId}`);
          
  })


    
    
 


