const {
  findLimitedCallsByWorkerId,
  countCallsByWorkerId,
  createCallq,
  findLimitedCalls,
  countCalls,
  countCallsByCustomerId,
  findLimitedCallsByCustomerId,
} = require("../queries/calls.queries");

const {
  doWeKnowThisNumber,
  getCustomeByNumber,
} = require("../queries/customers.queries");
const mongoose = require("mongoose");
const limit = 5;

exports.calls = async (req, res, next) => {
  try {
    let { page, order, sort, searchCustomer, searchWorker } = req.body;
    skip = limit * page - limit;
    workerId = req.user._id;
    if (order == "ASC") {
      order = 1;
    } else {
      order = -1;
    }
    const [calls, callsNumbers] = await Promise.all([
      findLimitedCalls(limit, skip, sort, order, searchCustomer, searchWorker),
      countCalls(searchCustomer, searchWorker),
    ]);

    res.send({
      items: calls.length > 0 ? calls : null,
      count: callsNumbers.length > 0 ? callsNumbers[0].totalCount : 0,
    });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.myCalls = async (req, res, next) => {
  try {
    let { page, order, sort, search } = req.body;
    skip = limit * page - limit;
    workerId = req.user._id;
    if (order == "ASC") {
      order = 1;
    } else {
      order = -1;
    }
    const [calls, callsNumbers] = await Promise.all([
      findLimitedCallsByWorkerId(limit, skip, workerId, sort, order, search),
      countCallsByWorkerId(workerId, search),
    ]);

    res.send({
      items: calls.length > 0 ? calls : null,
      count: callsNumbers.length > 0 ? callsNumbers[0].totalCount : 0,
    });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.createCall = async (req, res, next) => {
  try {
    const workerId = req.user._id;
    const newCall = await createCallq(req.body, workerId);
    res.send({ call });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.callsWorker = async (req, res, next) => {
  try {
    let { page, order, sort, search } = req.body;
    skip = limit * page - limit;
    const workerId = req.params.workerId;
    if (order == "ASC") {
      order = 1;
    } else {
      order = -1;
    }
    const [calls, callsNumbers] = await Promise.all([
      findLimitedCallsByWorkerId(
        limit,
        skip,
        new mongoose.Types.ObjectId(workerId),
        sort,
        order,
        search
      ),
      countCallsByWorkerId(new mongoose.Types.ObjectId(workerId), search),
    ]);

    res.send({
      items: calls.length > 0 ? calls : null,
      count: callsNumbers.length > 0 ? callsNumbers[0].totalCount : 0,
    });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.callsCustomer = async (req, res, next) => {
  try {
    let { page, order, sort } = req.body;
    skip = limit * page - limit;
    const customerId = req.params.customerId;
    if (order == "ASC") {
      order = 1;
    } else {
      order = -1;
    }
    const [calls, callsNumbers] = await Promise.all([
      findLimitedCallsByCustomerId(
        limit,
        skip,
        new mongoose.Types.ObjectId(customerId),
        sort,
        order
      ),
      countCallsByCustomerId(new mongoose.Types.ObjectId(customerId)),
    ]);

    res.send({
      items: calls.length > 0 ? calls : null,
      count: callsNumbers.length > 0 ? callsNumbers[0].totalCount : 0,
    });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};
exports.getCaller = async (req, res, next) => {
  try {
    console.group("sisisilafamile");
    customerNumber = req.body.number;
    console.log(customerNumber, "customer number");
    console.log(typeof customerNumber, "que l type la faille");
    customer = await doWeKnowThisNumber(customerNumber);
    console.log(customer, "on la la");
    res.send({ customer });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};
