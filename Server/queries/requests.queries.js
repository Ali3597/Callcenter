const { Mongoose } = require("mongoose");
const Request = require("../database/models/request.model");
const mongoose = require("mongoose");

exports.findLimitedRequests = (limit, skip, order, sort, search) => {
  aggregateArray = [
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
    { $sort: { [sort]: order } },
  ];
  if (search) {
    aggregateArray.push({ $match: { "customer.email": { $regex: search } } });
  }
  return Request.aggregate(aggregateArray).skip(skip).limit(limit);
};

exports.findLimitedRequestsByWorkerId = (
  limit,
  skip,
  order,
  sort,
  search,
  workerId
) => {
  aggregateArray = [
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
    { $match: { "author._id": workerId } },
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
  ];
  if (search) {
    aggregateArray.push({ $match: { "customer.email": { $regex: search } } });
  }
  return Request.aggregate(aggregateArray).skip(skip).limit(limit);
};
exports.findLimitedRequestsByCustomerId = (
  limit,
  skip,
  order,
  sort,
  customerId
) => {
  aggregateArray = [
    {
      $lookup: {
        from: "workers",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    { $match: { customer: customerId } },
    {
      $project: {
        "author.avatar": 0,
        "author.lastHangUp": 0,
        "author.state": 0,
        "author.number": 0,
        "author.username": 0,
        "author.local.password": 0,
      },
    },
    { $sort: { [sort]: order } },
  ];

  return Request.aggregate(aggregateArray).skip(skip).limit(limit);
};
exports.findRequestByIdWithCustomersAndWorkerAssociate = (requestId) => {
  return Request.findOne({ _id: requestId })
    .populate("customer")
    .populate("author", { "local.password": 0, "local.role": 0 })
    .exec();
};
exports.findRequestById = (requestId) => {
  return Request.findOne({ _id: requestId }).exec();
};

exports.countRequests = (search) => {
  aggregateArray = [
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
  ];
  if (search) {
    aggregateArray.push({ $match: { "customer.email": { $regex: search } } });
  }
  aggregateArray.push({
    $count: "totalCount",
  });

  return Request.aggregate(aggregateArray);
};

exports.countRequestsByWorkerId = (search, workerId) => {
  aggregateArray = [
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
    { $match: { "author._id": workerId } },
    {
      $project: {
        _id: 1,
        "customer.email": 1,
      },
    },
  ];
  if (search) {
    aggregateArray.push({ $match: { "customer.email": { $regex: search } } });
  }
  aggregateArray.push({
    $count: "totalCount",
  });

  return Request.aggregate(aggregateArray);
};

exports.countRequestsByCustomerId = (customerId) => {
  aggregateArray = [
    { $match: { customer: customerId } },
    {
      $project: {
        _id: 1,
      },
    },
    {
      $count: "totalCount",
    },
  ];

  return Request.aggregate(aggregateArray);
};

exports.getLimitedAlertRequestsWhithCustomers = (
  limit,
  skip,
  order,
  sort,
  search
) => {
  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() + 1);
  aggregateArray = [
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
        $and: [{ deadline: { $lte: limitDate } }, { done: false }],
      },
    },
    { $sort: { [sort]: order } },
  ];
  if (search) {
    aggregateArray.push({ $match: { "customer.email": { $regex: search } } });
  }
  return Request.aggregate(aggregateArray).skip(skip).limit(limit);
};

exports.countAlertedRequest = (search) => {
  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() + 1);
  aggregateArray = [
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
        $and: [{ deadline: { $lte: limitDate } }, { done: false }],
      },
    },
  ];
  if (search) {
    aggregateArray.push({ $match: { "customer.email": { $regex: search } } });
  }
  aggregateArray.push({
    $count: "totalCount",
  });
  return Request.aggregate(aggregateArray);
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

exports.countRequestsByDate = (start, end) => {
  return Request.find({
    date: { $gte: start, $lte: end },
  })
    .count()
    .exec();
};
