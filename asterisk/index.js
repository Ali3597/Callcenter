const {updateAvailableToOccupiedById,updateAvailableToTrueAndLastHangUp}= require('../queries/workers.queries')
const {chooseAWorker}= require ("../controllers/asterisk.controller")
const {waitforme} = require (('../controllers/functions.controller'))

ios = require('../config/socket.config')
var ari = require('ari-client');
var util = require('util');
ipAsterisk= "192.168.1.15"
PortAsterisk="8088"
userAsterisk="asterisk"
mdpAsterisk="asterisk"

   
ari.connect('http://'+ipAsterisk+':'+ PortAsterisk,userAsterisk, mdpAsterisk)
.then(function(client) {
    
    let queue =[]

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


   async function findOrCreateHoldingBridge(channel) {
  
    
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
        
        
      });

    
    });
    
    console.log("on ush ")
    queue.push(channel)
    console.log(queue.length)
   
    
    channel.on('StasisEnd', function(event, channel) {

      console.log("cest partie")
      removeChannelofQueue(queue,channel)
     
      //si la chaine qui appelle sort de lappli on lenleve du tableau
    });

 
  nextOnTheQueue(holdingBridge)

  }

  
     
  function removeChannelofQueue(queue,channel) {
    console.log("debut")
    console.log(queue.length)
    console.log(channel.caller.number)
    console.log(queue.indexOf(channel))
    if (queue.indexOf(channel)>=0){
    queue.splice(queue.indexOf(channel), 1)
    console.log(queue.length)
    console.log("on remove ")
    }
  }

  async function nextOnTheQueue(holdingBridge) {
   
    console.log("on est dans la queue ")
    console.log(queue.length)
    if(queue.length){
      thischannel=queue[0]
      console.log("queue.lenght")
      console.log(queue.length)

      let socket

      TheOnetoCAllId= await chooseAWorker()
 
      
      if (TheOnetoCAllId==false){
        safeHangup(thischannel)
      }else if (TheOnetoCAllId != true){
        console.log("on est passé")
        console
        removeChannelofQueue(queue,thischannel)
      
      nextOnTheQueue(holdingBridge)
      socket=ios.of(`/${TheOnetoCAllId}`)

      socket.emit("call", thischannel.caller.number);
      socketCloseCall(socket,thischannel)
      
    await  updateAvailableToOccupiedById(TheOnetoCAllId)

      var dialed = client.Channel();
  
      thischannel.on('StasisEnd', function(event, thischannel) {

        socket.emit("closeCall", "ok");
        safeHangup(dialed);
        //si la chaine qui appelle sort de lappli on lenleve du tableau
      });
    
      dialedAttribute(client,TheOnetoCAllId,thischannel,dialed,socket,holdingBridge)
    

    }
    
  }
    
  }
  function socketCloseCall(socket,aChannel){
    socket.sockets.forEach(element => {
      element.on("closeCall",()=>{
        safeHangup(aChannel)    
      })  
    });
  }
  
  function dialedAttribute(client,TheOnetoCAllId,thischannel,dialed,socket,holdingBridge){
    dialed.on('ChannelDestroyed',  async function(event, dialed) {
      await  updateAvailableToTrueAndLastHangUp(TheOnetoCAllId)
      nextOnTheQueue(holdingBridge)
      safeHangup(thischannel);
    });
  
    dialed.on('StasisStart', function(event, dialed) {

      joinMixingBridge(thischannel, dialed, holdingBridge);

      socket.emit("respond");
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
    channel.hangup(function(err) {
      // ignore error
    });
  }
 
  // handler for dialed channel entering Stasis
  function joinMixingBridge(channel, dialed, holdingBridge) {
    
    var mixingBridge = client.Bridge();
 
    dialed.on('StasisEnd', function(event, dialed) {
      dialedExit(dialed, mixingBridge,holdingBridge);
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
  function dialedExit(dialed, mixingBridge,holdingBridge) {
    
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
      
 
      mixingBridge.addChannel(
          {channel: [channel.id, dialed.id]}, function(err) {
        if (err) {
          throw err;
        }
      });
    });
  }

 
 
  client.on('StasisStart', stasisStart);
 
  client.start('Callcenter');


})



module.exports = ari











       



