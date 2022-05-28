var Call = require("./call");
const {
  chooseAWorkerAndPassHimOccupied,
} = require("../controllers/asterisk.controller");

const {
  updateAvailableToTrueAndLastHangUp,
} = require("../queries/workers.queries");
const ios = require("../config/socket.config");

var System = function (client) {
  this.client = client;
  this.queue = [];
  this.socket = ios;

  this.onStasisStart = function (event, channel) {
    // ensure the channel is not a dialed channel
    var dialed = event.args[0] === "dialed";
    console.log("allo");
    if (!dialed) {
      channel.answer(
        async function (err) {
          if (err) {
            throw err;
          }
          console.log("Channel %s has entered our application", channel.name);
          newBridge = await this.CreateHoldingBridge();
          this.queue.push(new Call(channel, newBridge));
          // if the customer close the call remove it form the queue
          channel.on(
            "StasisEnd",
            function (event, channel) {
              this.removeCallofQueue(channel);
            }.bind(this)
          );
          this.nextOnQueue();
        }.bind(this)
      );
    }
  };

  this.CreateHoldingBridge = async function () {
    return await client.bridges.create(
      { type: "holding" },
      function (err, holdingBridge) {
        if (err) {
          throw err;
        }
        console.log("Created new holding bridge %s", holdingBridge.id);
      }
    );
  };

  this.removeCallofQueue = function (channel) {
    this.queue = this.queue.filter((call) => call.caller.id !== channel.id);
  };

  this.safeHangup = function (channel) {
    console.log("Hanging up channel %s", channel.name);
    channel.hangup(function (err) {
      // ignore error
    });
  };

  this.nextOnQueue = async function () {
    // ensure there is someone on the queue

    if (this.queue.length) {
      const nextCall = this.queue[0];
      TheWorkertoCall = await chooseAWorkerAndPassHimOccupied();

      if (!TheWorkertoCall) {
        // no one available we hang up the caller
        this.safeHangup(nextCall.caller);
      } else if (TheWorkertoCall != true) {
        // remove th ecaller from the queue
        this.removeCallofQueue(nextCall.caller);
        // Create a channel for the worker
        var dialed = this.client.Channel();
        nextCall.weFoundAWorker(TheWorkertoCall, dialed);
        nextCall.caller.on(
          "StasisEnd",
          function (event) {
            // if the customer close the call close the worker phone and emit a socket to ajust the client side

            this.socket
              .in(nextCall.worker._id.toHexString())
              .emit("closeCall", "ok");
            // nextCall.socket.emit("closeCall", "ok");
            //close the worker phone too
            this.safeHangup(dialed);
          }.bind(this)
        );
        this.dialedAttribute(nextCall);
        this.nextOnQueue();
      }
    }
  };

  this.dialedAttribute = function (call) {
    // add all the event listenr on the worker pone to ensure all the cases are prepared
    call.channelWorker.on(
      "ChannelDestroyed",
      async function () {
        // WHen the worker phone is closed pass it to available and updtae the date of his las hang up
        await updateAvailableToTrueAndLastHangUp(call.worker._id);
        // now that he is available verify if tere is a customer on the queue
        this.nextOnQueue();
        // close the customer phone
        this.safeHangup(call.caller);
      }.bind(this)
    );
    call.channelWorker.on(
      "StasisStart",
      async function (event, dialed) {
        // socket to tell on the client side that the worker have respons
        this.socket.in(call.worker._id.toHexString()).emit("respond");
        // call.socket.emit("respond");
        // connect the customer and the worker phone
        this.joinMixingBridge(call);
      }.bind(this)
    );
    this.socketWebCall(call);
    // call the worker
    call.channelWorker.originate(
      { endpoint: call.worker.number, app: "Callcenter", appArgs: "dialed" },
      function (err, dialed) {
        if (err) {
          throw err;
        }
      }
    );
  };

  this.joinMixingBridge = async function (call) {
    // create the bridge where we will have the communication between our worker and our customer
    var mixingBridge = this.client.Bridge();
    call.createMixBridge(mixingBridge);
    call.channelWorker.on(
      "StasisEnd",
      function (event, dialed) {
        // when the worker phone is closed  updtae the time of the call and whnge the state of the call to answered
        this.dialedExit(call);
      }.bind(this)
    );

    call.channelWorker.answer(function (err) {
      if (err) {
        throw err;
      }
    });

    await mixingBridge.create(
      { type: "mixing" },
      function (err, mixingBridge) {
        if (err) {
          throw err;
        }

        console.log("Created mixing bridge %s", mixingBridge.id);
        // move the ttwo channels ont the mixing bridge
        this.moveToMixingBridge(call);
      }.bind(this)
    );
  };

  this.socketWebCall = function (call) {
    // emit to the client side that we have a call
    this.socket
      .in(call.worker._id.toHexString())
      .emit("call", call.caller.caller.number);
    // console.log(this.socket.sockets.sockets.fo);
    this.socket.sockets.sockets.forEach((element) => {
      element.on("closeCall", (data) => {
        console.log("la data ezst bien la en fait", data);
        if (data === call.worker.id) {
          this.safeHangup(call.caller);
        }
      });
    });

    //   .on(
    //   "closeCall",
    //   function (data) {
    //     console.log("on close vraiment le call");
    //     if (data == call.worker._id.toHexString()) {
    //       this.safeHangup(call.caller);
    //     }
    //   }.bind(this)
    // );
    // call.socket.emit("call", call.caller.number);
    // listen if the worker close the call by the the web interface on the client side
    // call.socket.sockets.forEach((element) => {
    //   element.on("closeCall", () => {
    //     this.safeHangup(call.caller);
    //   });
    // });
  };

  // handler for the dialed channel leaving Stasis
  this.dialedExit = function (call) {
    console.log(
      "Dialed channel %s has left our application, destroying mixing bridge %s",
      call.channelWorker.name,
      call.mixingBridge.id
    );

    call.mixingBridge.destroy(function (err) {
      if (err) {
        throw err;
      }
    });
  };

  // handler for new mixing bridge ready for channels to be added to it
  this.moveToMixingBridge = function (call) {
    console.log(
      "Adding channel %s and dialed channel %s to bridge %s",
      call.caller.name,
      call.channelWorker.name,
      call.mixingBridge.id
    );

    call.holdingBridge.removeChannel(
      { channel: call.caller.id },
      function (err) {
        if (err) {
          throw err;
        }

        call.mixingBridge.addChannel(
          { channel: [call.caller.id, call.channelWorker.id] },
          function (err) {
            if (err) {
              throw err;
            }
          }
        );
      }
    );
  };
};

module.exports = System;
