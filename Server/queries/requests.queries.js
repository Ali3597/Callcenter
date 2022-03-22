const { Mongoose } = require("mongoose");
const Request = require("../database/models/request.model");
const mongoose = require("mongoose");

exports.findLimitedRequests = (limit, skip, order, sort, search = "") => {
  return Request.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $lookup: {
        from: "workers",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },

    {
      $project: {
        "author.avatar": 0,
        "author.lastHangUp": 0,
        "author.state": 0,
        "author.number": 0,
        "author.username": 0,
        "author.local.password": 0,
        "customer.name": 0,
        "customer.avatar": 0,
        "customer.number": 0,
      },
    },
    { $match: { "customer.email": { $regex: search } } },
    { $sort: { [sort]: order } },
  ])
    .skip(skip)
    .limit(limit);
};

exports.findLimitedRequestsOfACustomer = (
  limit,
  skip,
  order,
  sort,
  search = "",
  customerId
) => {
  return Request.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $lookup: {
        from: "workers",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $match: {
        $and: [
          { "customer._id": new mongoose.Types.ObjectId(customerId) },
          { "customer.email": { $regex: search } },
        ],
      },
    },
    {
      $project: {
        "author.avatar": 0,
        "author.lastHangUp": 0,
        "author.state": 0,
        "author.number": 0,
        "author.username": 0,
        "author.local.password": 0,
        "customer.name": 0,
        "customer.avatar": 0,
        "customer.number": 0,
      },
    },

    { $sort: { [sort]: order } },
  ])
    .skip(skip)
    .limit(limit);
};

exports.findRequestByIdWithCustomersAssociate = (requestId) => {
  return Request.findOne({ _id: requestId }).populate("customer").exec();
};
exports.findRequestById = (requestId) => {
  return Request.findOne({ _id: requestId }).exec();
};

exports.countRequests = (search = "") => {
  return Request.aggregate([
    {
      $lookup: {
        from: "customers",

        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },

    {
      $project: {
        _id: 1,
        "customer.email": 1,
      },
    },
    { $match: { "customer.email": { $regex: search } } },

    {
      $count: "totalCount",
    },
  ]);
};
exports.countRequestsOfACustomer = (search = "", customerId) => {
  return Request.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $match: {
        $and: [
          { "customer._id": new mongoose.Types.ObjectId(customerId) },
          { "customer.email": { $regex: search } },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        "customer.email": 1,
      },
    },

    {
      $count: "totalCount",
    },
  ]);
};

exports.findLimitedRequestsByCustomerId = (limit, skip, customerId) => {
  return Request.find({ customer: customerId }).limit(limit).skip(skip).exec();
};

exports.findLimitedRequestsByCustomerIdWithCustomersAssociate = (
  limit,
  skip,
  customerId
) => {
  return Request.find({ customer: customerId })
    .limit(limit)
    .skip(skip)
    .populate("customer")
    .exec();
};

exports.countRequestsByCustomerId = (customerId) => {
  return Request.find({ customer: customerId }).count().exec();
};

exports.getLimitedAlertRequestsWhithCustomers = (
  limit,
  skip,
  order,
  sort,
  search = ""
) => {
  return Request.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $lookup: {
        from: "workers",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $project: {
        "author.avatar": 0,
        "author.lastHangUp": 0,
        "author.state": 0,
        "author.number": 0,
        "author.username": 0,
        "author.local.password": 0,
        "customer.name": 0,
        "customer.avatar": 0,
        "customer.number": 0,
      },
    },
    {
      $match: {
        $and: [
          {
            $where: function () {
              return (
                Date.parse(this.deadline) - Date.now() < 1000 * 60 * 60 * 24
              );
            },
          },
          { "customer.email": { $regex: search } },
          { done: false },
        ],
      },
    },
    { $sort: { [sort]: order } },
  ])
    .skip(skip)
    .limit(limit);
};

exports.countAlertedRequest = (search = "") => {
  return Request.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $project: {
        _id: 1,
        "customer.email": 1,
        done: 1,
      },
    },
    {
      $match: {
        $and: [
          {
            $where: function () {
              return (
                Date.parse(this.deadline) - Date.now() < 1000 * 60 * 60 * 24
              );
            },
          },
          { "customer.email": { $regex: search } },
          { done: false },
        ],
      },
    },
    {
      $count: "totalCount",
    },
  ]);
};

exports.DeleteRequestById = (requestId) => {
  return Request.findByIdAndDelete(requestId).exec();
};

exports.createRequest = (body, currentUserId) => {
  const newRequest = new Request({
    ...body,
    deadline: Date.parse(body.deadline),
    author: currentUserId,
  });
  return newRequest
    .save()
    .then((newRequest) => newRequest.populate("customer").execPopulate());
};

exports.getToggleRequest = async (requestId) => {
  const request = await Request.findById(requestId);
  request.done = !request.done;
  return await request.save();
};
