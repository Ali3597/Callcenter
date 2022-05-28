var Call = function (caller, holdingBridge) {
  this.holdingBridge = holdingBridge;
  this.mixingBridge = null;
  this.caller = caller;
  this.worker = null;
  this.channelWorker = null;

  this.originate = async function () {
    // put the channel     on the holding bridge waiting for a worker to be choosen
    this.holdingBridge.addChannel(
      { channel: this.caller.id },
      function (err) {
        if (err) {
          throw err;
        }
        this.holdingBridge.startMoh(function (err) {});
      }.bind(this)
    );
  };
  this.originate();

  this.weFoundAWorker = function (worker, channel) {
    this.worker = worker;
    this.channelWorker = channel;
  };
  this.createMixBridge = function (mixBridge) {
    this.mixingBridge = mixBridge;
  };
};

module.exports = Call;
