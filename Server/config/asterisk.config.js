const {updateAvailableToOccupiedById,updateAvailableToTrueAndLastHangUp}= require('../queries/workers.queries')
const {doWeKnowThisNumber} = require('../queries/customers.queries')
const {chooseAWorker}= require ("../controllers/asterisk.controller")
const {millisToMinutesAndSeconds} = require (('../controllers/functions.controller'))
const{createCall,updateCallToAnsweredANdTimeById} = require ('../queries/calls.queries')
ios = require('./socket.config')
var ari = require('ari-client');
var util = require('util');
///// all the variables of asterisk 
ipAsterisk= "192.168.1.21"
PortAsterisk="8088"
userAsterisk="asterisk"
mdpAsterisk="asterisk"

   
ari.connect('http://'+ipAsterisk+':'+ PortAsterisk,userAsterisk, mdpAsterisk)
.then(function(client) {
    // when ari is connected initiate the queue of or app
    let queue =[]

    // 

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

    //put the channel on hold
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
    //put the channel on the holding bridge waiting for a worker to be choosen 
    holdingBridge.addChannel({channel: channel.id}, function(err) {
      if (err) {
        throw err;
      }
    
 
      holdingBridge.startMoh(function(err) {
        
        
      });

    
    });
    
   // push the new channel on the queue 
    queue.push(channel)
    
    
    channel.on('StasisEnd', function(event, channel) {

      // if the customer close the call remove it form the queue
      removeChannelofQueue(queue,channel)
     
      
    });


  nextOnTheQueue(holdingBridge)

  }

  
  // remove a customer channel of a queue 
  function removeChannelofQueue(queue,channel) {
    let i =0
    queue.forEach(element => {

      if (element.id==channel.id){
        queue.splice(i, 1)
      }
      i++
    });

   
  }
// activate all the events to take care of the first element of the queue
  async function nextOnTheQueue(holdingBridge) {
// ensure there is someone on the queue
    if(queue.length){
      thischannel=queue[0]


      let socket
      // Choose a worker available 
      TheOnetoCAll= await chooseAWorker()
 
      // if all of our workers are unavailable
      if (TheOnetoCAll==false){
        safeHangup(thischannel)
      // if we find a worker available we get on the  TheOnetoCAll variable  we get all the datas of the worker 
      // if there aren't workers available but there a re some occupied( on call ) we do nothing and let the customer on the queue
      }else if (TheOnetoCAll != true){
// now we hava found a worker we remove the customer of the queue 
        removeChannelofQueue(queue,thischannel)
 // we relaunch this funtion in case to verify if  there are more customers on the queue and still worker availabale 
      nextOnTheQueue(holdingBridge)
 // create the socket with the name of the worker id 
      socket=ios.of(`/${TheOnetoCAll._id}`)
// emit to the client side that we have a call 
      socket.emit("call", thischannel.caller.number);
  // listen if the worker close the call by the the web interface on the client side
      socketCloseCall(socket,thischannel)
   // pass the worker to occupied 
    await  updateAvailableToOccupiedById(TheOnetoCAll._id)
    // create the call on the database to updtae the call log
   thisCAll= await putCallInData(thischannel,TheOnetoCAll)

        // Create a channel for the worker 
      var dialed = client.Channel();
  
      thischannel.on('StasisEnd', function(event, thischannel,TheOnetoCAll) {
       
       // if the customer close the call close the worker phone and emit a socket to ajust the client side 
        socket.emit("closeCall", "ok");
        //close the worker phone too
        safeHangup(dialed);
        
      });
    // initiate the worker phone to connect it to the customer phone 
      dialedAttribute(client,TheOnetoCAll,thischannel,dialed,socket,holdingBridge,thisCAll)
    

    }
    
  }
    
  }

   // create the call on the database to updtae the call log
  async function putCallInData(thischannel,TheOnetoCAll){
    customer = await  doWeKnowThisNumber(thischannel.caller.number);
    if (customer==null){
      customerId= null
  }else{
      customerId=customer._id
  }
    myArray=[
      customerId,
      thischannel.caller.number,
      TheOnetoCAll._id
    ]

     callID =await   createCall(myArray)
     return callID
  }

  // listen if the worker close the call by the the web interface on the client side
  function socketCloseCall(socket,aChannel){
    socket.sockets.forEach(element => {
      element.on("closeCall",()=>{
        safeHangup(aChannel)    
      })  
    });
  }
  

  
  function dialedAttribute(client,TheOnetoCAll,thischannel,dialed,socket,holdingBridge,thisCAll){
// add all the event listenr on the worker pone to ensure all the cases are prepared 
    dialed.on('ChannelDestroyed',  async function(event, dialed) {
      // WHen the worker phone is closed pass it to available and updtae the date of his las hang up 
      await  updateAvailableToTrueAndLastHangUp(TheOnetoCAll._id)
      // now that he is available verify if tere is a customer on the queue
      nextOnTheQueue(holdingBridge)
      // close the customer phone 
      safeHangup(thischannel);
    });
  
    dialed.on('StasisStart', async function(event, dialed) {
    // connect the customer and the worker phone 
      joinMixingBridge(thischannel, dialed, holdingBridge,thisCAll);
     // socket to tell on the client side that the worker have respons 
      socket.emit("respond");
    });
  // call the worker 
    dialed.originate(
      {endpoint: TheOnetoCAll.number, app: 'Callcenter', appArgs: 'dialed'},
      function(err, dialed) {
        if (err) {
          throw err;
        }
    });
  }
// close a channel 
  function safeHangup(channel) {
    

    console.log('Hanging up channel %s', channel.name);
    channel.hangup(function(err) {
      // ignore error
    });
  }
 
  // handler for dialed channel entering Stasis
  function joinMixingBridge(channel, dialed, holdingBridge,thisCAll) {
    // create the bridge where we will have the communication between our worker and our customer 
    var mixingBridge = client.Bridge();
    
    dialed.on('StasisEnd', function(event, dialed) {
      // when the worker phone is closed  updtae the time of the call and whnge the state of the call to answered
     counter= millisToMinutesAndSeconds(Date.now()-thisCAll.date)
      updateCallToAnsweredANdTimeById(thisCAll._id,counter)
      // desttroy the mixing bridge 
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
      // move the ttwo channels ont the mixing bridge 
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











       



