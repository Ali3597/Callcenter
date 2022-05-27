var ari = require("ari-client");
const System = require("../asterisk/system");
///// all the variables of asterisk
ipAsterisk = "192.168.1.17";
PortAsterisk = "8088";
userAsterisk = "asterisk";
mdpAsterisk = "asterisk";

ari
  .connect(
    "http://" + ipAsterisk + ":" + PortAsterisk,
    userAsterisk,
    mdpAsterisk
  )
  .then(function (client) {
    var system;

    function onStasisStart(event, channel) {
      console.log("sisis la famille");
      system.onStasisStart(event, channel);
    }

    system = new System(client);
    client.on("StasisStart", onStasisStart);

    client.start("Callcenter");
  });

module.exports = ari;
