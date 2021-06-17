const {findAllTheAvailableWorkers,findAllTheOccupiedWorkers,updateAvailableToOccupiedById,updateAvailableToTrueById}= require('../queries/workers.queries')
ios = require('../config/socket.config')
var ari = require('ari-client');
var util = require('util');
ipAsterisk= "192.168.223.53"
PortAsterisk="8088"
userAsterisk="asterisk"
mdpAsterisk="asterisk"
let queue = []



        //     idCaller= await callAWorker()
//     socket=ios.of(`/${idCaller}`)
//     socket.emit("call", ["customer",idCaller]);
//     socket.sockets.forEach(element => {
//       element.on("closeCall",()=>{
//         safeHangup(channel)    
//       })  
//     });

        
ari.connect('http://'+ipAsterisk+':'+ PortAsterisk,userAsterisk, mdpAsterisk)
.then(function(client) {
    let idCaller
    let socket

  function stasisStart(event, channel) {
    // ensure the channel is not a dialed channel
    var dialed = event.args[0] === 'dialed';

    
    if (!dialed) {
      channel.answer(function(err) {
        
        if (err) {
          throw err;
        }
 
        console.log('Channel %s has entered our application', channel.name);
 
        findOrCreateHoldingBridge(channel);
      });
    }
  
    
  }

  async  function waitForWorkers() {
    let TheOnetoCAllId
    availableWorkers= await findAllTheAvailableWorkers()
    if (availableWorkers.length){
      theDAte=Date.now()
    availableWorkers.forEach(element => {
      if (element.lastHangUp<theDAte){
        theDAte=element.lastHangUp
        TheOnetoCAllId=element._id
      } 
    })
    return TheOnetoCAllId
  }
    else{
      occupiedWorkers= await findAllTheOccupiedWorkers()
      if(!occupiedWorkers.length){
        TheOnetoCAllId=false
      }else{
        TheOnetoCAllId=true
      }
      return TheOnetoCAllId

    }
  }
  

  async  function chooseAWorker() {
    TheOnetoCAllId=true
    while(TheOnetoCAllId==true){
      TheOnetoCAllId =   waitForWorkers()
      setTimeout(function() {
        console.log("waiting")
      }
      , 5000)  
}
 return TheOnetoCAllId
   
 }


   async function findOrCreateHoldingBridge(channel) {
    console.log("id debut")
    console.log(channel.id)
    console.log("id fin")
    queue.push(channel.id)
    
  client.bridges.list(function(err, bridges) {


    var holdingBridge = bridges.filter(function(candidate) {
      return candidate.bridge_type === 'holding';
    })[0];

    if (holdingBridge) {
      console.log('Using existing holding bridge %s', holdingBridge.id);

      originate(channel, holdingBridge);
    } else {
      client.bridges.create({type: 'holding'}, function(err, holdingBridge) {
        if (err) {
          throw err;
        }

        console.log('Created new holding bridge %s', holdingBridge.id);

        originate(channel, holdingBridge);
      });
    }
  });
}

  async function originate(channel, holdingBridge) {
    holdingBridge.addChannel({channel: channel.id}, function(err) {
      if (err) {
        throw err;
      }
 
      holdingBridge.startMoh(function(err) {
        // ignore error
      });

    
    });

    console.log("On attend la")
    test=await chooseAWorker()
    console.log(test)
    console.log("on a passé la ")
 
    var dialed = client.Channel();
 
    channel.on('StasisEnd', function(event, channel) {
      safeHangup(dialed);
    });
 
    dialed.on('ChannelDestroyed', function(event, dialed) {
      // 
      safeHangup(channel);
    });
 
    dialed.on('StasisStart', function(event, dialed) {
      joinMixingBridge(channel, dialed, holdingBridge);
    });
 
    dialed.originate(
      {endpoint: "PJSIP/worker", app: 'Callcenter', appArgs: 'dialed'},
      function(err, dialed) {
        if (err) {
          throw err;
        }
    });
  }

  function safeHangup(channel) {
    console.log('Hanging up channel %s', channel.name);
    // socket.emit("closeCall", "ok");
    channel.hangup(function(err) {
      // ignore error
    });
  }
 
  // handler for dialed channel entering Stasis
  function joinMixingBridge(channel, dialed, holdingBridge) {
    
    var mixingBridge = client.Bridge();
 
    dialed.on('StasisEnd', function(event, dialed) {
      dialedExit(dialed, mixingBridge);
    });
 
    dialed.answer(function(err) {
      if (err) {
        throw err;
      }
    });
 
    mixingBridge.create({type: 'mixing'}, function(err, mixingBridge) {
      if (err) {
        throw err;
      }
 
      console.log('Created mixing bridge %s', mixingBridge.id);
 
      moveToMixingBridge(channel, dialed, mixingBridge, holdingBridge);
    });
  }
 
  // handler for the dialed channel leaving Stasis
  function dialedExit(dialed, mixingBridge) {
    console.log(
      'Dialed channel %s has left our application, destroying mixing bridge %s',
      dialed.name, mixingBridge.id);
 
    mixingBridge.destroy(function(err) {
      if (err) {
        throw err;
      }
    });
  }
 
  // handler for new mixing bridge ready for channels to be added to it
  function moveToMixingBridge(channel, dialed, mixingBridge, holdingBridge) {
    console.log('Adding channel %s and dialed channel %s to bridge %s',
        channel.name, dialed.name, mixingBridge.id);
 
    holdingBridge.removeChannel({channel: channel.id}, function(err) {
      if (err) {
        throw err;
      }
      console.log("debut")
      console.log(queue)
      queue = queue.filter(item => item !== channel.id)
      console.log(queue)
      console.log("fin")
 
      mixingBridge.addChannel(
          {channel: [channel.id, dialed.id]}, function(err) {
        if (err) {
          throw err;
        }
      });
    });
  }

  // ios.on("closeCall",()=>{
  //   console.log("emit marche iu")
  //   channel.hangup(function(err) {
  //     // ignore error
  //   });
  // })
 
  client.on('StasisStart', stasisStart);
 
  client.start('Callcenter');


})



module.exports = ari




// socket.sockets.forEach(element => {
//   element.on("closeCall",()=>{
//     safeHangup(channel)    
//   })  
// });

// console.log("id debut")
// console.log(channel.id)
// console.log("id fin")
// queue.push(channel.id)
//     // updateAvailableToOccupiedById(idCaller)






       



