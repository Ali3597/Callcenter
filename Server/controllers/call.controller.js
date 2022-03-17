const {
  findLimitedCallsByWorkerId,
  countCallsByWorkerId,
} = require("../queries/calls.queries");
const {
  pageCalculator,
  range,
  titleMessage,
  properStringDate,
} = require("./functions.controller");
const callTableFormat = ["Nom", "Numero", "date", "statut", "temps", "action"];

exports.callsDashboard = async (req, res, next) => {
  console.log("on est laaaaaaaaa");
  page = req.params.page;
  skip = 10 * page - 10;
  workerId = req.user._id;
  console.log(workerId, "le worker");
  const [calls, callsNumbers] = await Promise.all([
    findLimitedCallsByWorkerId(10, skip, workerId),
    countCallsByWorkerId(workerId),
  ]);
  //   pageNumberCalls = pageCalculator(callsNumbers, 10);
  //   titleCalls = titleMessage("calls", calls);

  res.send({ calls: calls });
};
