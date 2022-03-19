const Customer = require("../database/models/customer.model");
const Call = require("../database/models/call.model");
const Request = require("../database/models/request.model");

exports.createCustomer = async (array) => {
  const newCustomer = new Customer({
    name: array[0],
    number: array[1],
    email: array[2],
  });

  // Worker.findByIdAndUpdate(userId,{$set:{state : "unavailable"}},{runValidators: true  } ).exec()
  test = await newCustomer.save();
  Call.updateMany(
    { number: array[1] },
    { $set: { customer: test._id } }
  ).exec();
};

exports.findLimitedCustomers = (limit, skip) => {
  return Customer.find({}).limit(limit).skip(skip).exec();
};

exports.findCustomerById = (customerId) => {
  return Customer.findOne({ _id: customerId }).exec();
};

exports.getCustomeByNumber = (customerNumber) => {
  return Customer.findOne({ number: customerNumber }).exec();
};

exports.countCustomers = () => {
  return Customer.find({}).count().exec();
};

exports.doWeKnowThisNumber = (customerNumber) => {
  return Customer.findOne({ number: customerNumber }).exec();
};

exports.findCustomerByName = (customerName) => {
  return Customer.findOne({ name: customerName }).exec();
};

exports.deleteCustomerById = async (customerId) => {
  Customer.findByIdAndDelete(customerId).exec();
  Call.updateMany(
    { customer: customerId },
    { $set: { customer: null } }
  ).exec();
  requests = await Request.find({ customer: customerId });
  Request.deleteMany({ customer: customerId }).exec();
  // requests.forEach(element => {
  //   Report.deleteMany({request:element._id  }).exec()
  // });
};

exports.findCustomersAlphabeticallySorted = (limit, skip) => {
  return Customer.find({}).sort({ name: 1 }).exec();
};

exports.findCustomersLikeNameLimited = (search, limit, skip) => {
  const regExp = `^${search}`;
  const reg = new RegExp(regExp);
  return Customer.find({ name: { $regex: reg } })
    .limit(limit)
    .skip(skip)
    .exec();
};

exports.countCustomersLikeName = (search) => {
  const regExp = `^${search}`;
  const reg = new RegExp(regExp);
  return Customer.find({ name: { $regex: reg } })
    .count()
    .exec();
};
