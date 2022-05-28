var Call = function (caller, holdingBridge) {
  this.holdingBridge = holdingBridge;
  this.mixingBridge = null;
  this.caller = caller;
  this.worker = null;
  this.channelWorker = null;
  this.start = null;

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

  this.startTimer = function () {
    this.start = Date.now();
  };

  this.isThisAnswered = function () {
    if (!this.start) {
      return false;
    }
    return true;
  };

  this.timeOfCall = function () {
    if (!this.isThisAnswered()) {
      return 0;
    }
    let milliDiff = Date.now() - this.start;
    return Math.floor(milliDiff / 1000);
  };

  this.weFoundAWorker = function (worker, channel) {
    this.worker = worker;
    this.channelWorker = channel;
  };
  this.createMixBridge = function (mixBridge) {
    this.mixingBridge = mixBridge;
  };
};

module.exports = Call;
