var ari = require("ari-client");
const System = require("../asterisk/system");
///// all the variables of asterisk
ipAsterisk = process.env.ASTERISKIP;
PortAsterisk = process.env.ASTERISKPORT;
userAsterisk = process.env.ASTERISKUSER;
mdpAsterisk = process.env.ASTERISKPASSWORD;

ari
  .connect(
    "http://" + ipAsterisk + ":" + PortAsterisk,
    userAsterisk,
    mdpAsterisk
  )
  .then(function (client) {
    var system;

    function onStasisStart(event, channel) {
      system.onStasisStart(event, channel);
    }

    system = new System(client);
    client.on("StasisStart", onStasisStart);

    client.start("Callcenter");
  });

module.exports = ari;
