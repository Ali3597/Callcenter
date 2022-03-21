const Customer = require("../database/models/customer.model");
const Call = require("../database/models/call.model");
const Request = require("../database/models/request.model");

exports.createCustomer = async (newCUstomer) => {
  const newCustomer = new Customer({
    ...newCUstomer,
  });
  newCustomerSave = await newCustomer.save();
  // update all unknow call with this number
  Call.updateMany(
    { number: newCUstomer.number },
    { $set: { customer: newCustomerSave._id } }
  ).exec();
  return newCustomerSave;
};

exports.findLimitedCustomers = (limit, skip, order, sort, search = "") => {
  return Customer.find({ email: { $regex: search } })
    .skip(skip)
    .limit(limit)
    .sort({ [sort]: order })
    .exec();
};

exports.findCustomerById = (customerId) => {
  return Customer.findOne({ _id: customerId }).exec();
};

exports.getCustomeByNumber = (customerNumber) => {
  return Customer.findOne({ number: customerNumber }).exec();
};

exports.countCustomers = (search = "") => {
  return Customer.find({ email: { $regex: search } })
    .count()
    .exec();
};

exports.doWeKnowThisNumber = (customerNumber) => {
  return Customer.findOne({ number: customerNumber }).exec();
};

exports.findCustomerByName = (customerName) => {
  return Customer.findOne({ name: customerName }).exec();
};

exports.deleteCustomerById = async (customerId) => {
  Customer.findByIdAndDelete(customerId).exec();
  // update all it calls by unknow
  Call.updateMany(
    { customer: customerId },
    { $set: { customer: null } }
  ).exec();
  // update all it requests by null
  Request.updateMany(
    { customer: customerId },
    { $set: { customer: null } }
  ).exec();
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
