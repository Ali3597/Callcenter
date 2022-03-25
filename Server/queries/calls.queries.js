const Call = require("../database/models/call.model");
const Customer = require("../database/models/customer.model");

exports.findLimitedCallsByWorkerId = (limit, skip, workerId) => {
  return Call.find({ destination: workerId })
    .populate({ path: "customer", model: Customer })
    .sort({ date: -1 })
    .limit(limit)
    .skip(skip)
    .exec();
};

exports.countCallsByWorkerId = (workerId) => {
  return Call.find({ destination: workerId }).count().exec();
};

exports.createCallq = (call) => {
  // add time , date state
  const newCustomer = new Call({
    customer: call.customer,
    number: call.number,
    destination: call.destination,
  });
  return newCustomer.save();
};

exports.updateCallToAnsweredANdTimeById = async (callId, timeCall) => {
  console.log("on a update le callllll");
  return Call.findByIdAndUpdate(
    callId,
    {
      $set: {
        state: "answered",
        time: timeCall,
      },
    },
    { runValidators: true }
  ).exec();
};
