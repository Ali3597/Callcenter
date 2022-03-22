const {
  findLimitedCallsByWorkerId,
  countCallsByWorkerId,
} = require("../queries/calls.queries");

const {
  doWeKnowThisNumber,
  getCustomeByNumber,
} = require("../queries/customers.queries");

exports.calls = async (req, res, next) => {
  const { page } = req.body;
  skip = 10 * page - 10;
  workerId = req.user._id;
  console.log(workerId);
  const [calls, callsNumbers] = await Promise.all([
    findLimitedCallsByWorkerId(10, skip, workerId),
    countCallsByWorkerId(workerId),
  ]);

  res.send({ calls, callsNumbers });
};

exports.getCaller = async (req, res, next) => {
  customerNumber = req.body.number;
  customer = await doWeKnowThisNumber(customerNumber);
  res.send({ customer });
};
