const Call = require("../database/models/call.model");
const Customer = require("../database/models/customer.model");
const { doWeKnowThisNumber } = require("./customers.queries");

exports.findLimitedCallsByWorkerId = (
  limit,
  skip,
  workerId,
  sort = "date",
  order,
  search
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
      $match: { destination: workerId },
    },
    { $sort: { [sort]: order } },
  ];
  if (search) {
    aggregateArray.push({
      $match: { "customer.email": { $regex: search } },
    });
  }
  return Call.aggregate(aggregateArray).skip(skip).limit(limit);
};
exports.findLimitedCallsByCustomerId = (
  limit,
  skip,
  customerId,
  sort = "date",
  order
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
      $match: { "customer._id": customerId },
    },
    { $sort: { [sort]: order } },
  ];

  return Call.aggregate(aggregateArray).skip(skip).limit(limit);
};
exports.findLimitedCalls = (
  limit,
  skip,
  sort = "date",
  order,
  searchCustomer,
  searchWorker
) => {
  aggragateArray = [
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
        localField: "destination",
        foreignField: "_id",
        as: "worker",
      },
    },

    {
      $project: {
        "worker.local.password": 0,
      },
    },
    { $sort: { [sort]: order } },
  ];
  if (searchCustomer) {
    aggragateArray.push({
      $match: { "customer.email": { $regex: searchCustomer } },
    });
  }
  if (searchWorker) {
    aggragateArray.push({
      $match: { "worker.local.email": { $regex: searchWorker } },
    });
  }
  return Call.aggregate(aggragateArray).skip(skip).limit(limit);
};

exports.countCalls = (searchCustomer, searchWorker) => {
  aggragateArray = [
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
        localField: "destination",
        foreignField: "_id",
        as: "worker",
      },
    },
    {
      $project: {
        "worker.local.password": 0,
      },
    },
  ];
  if (searchCustomer) {
    aggragateArray.push({
      $match: { "customer.email": { $regex: searchCustomer } },
    });
  }
  if (searchWorker) {
    aggragateArray.push({
      $match: { "worker.local.email": { $regex: searchWorker } },
    });
  }
  aggragateArray.push({
    $count: "totalCount",
  });
  return Call.aggregate(aggragateArray);
};
exports.countCallsByWorkerId = (workerId, search) => {
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
      $match: { destination: workerId },
    },
  ];
  if (search) {
    aggregateArray.push({
      $match: { "customer.email": { $regex: search } },
    });
  }

  aggregateArray.push({
    $count: "totalCount",
  });
  return Call.aggregate(aggregateArray);
};

exports.countCallsByCustomerId = (customerId) => {
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
      $match: { "customer._id": customerId },
    },
    {
      $count: "totalCount",
    },
  ];

  return Call.aggregate(aggregateArray);
};
exports.createCallq = async (number, time, workerId) => {
  // add time , date state
  const customer = await doWeKnowThisNumber(number);
  const newCall = new Call({
    customer: customer ? customer._id : null,
    number,
    time,
    destination: workerId,
  });
  return newCall.save();
};

exports.countCallsByDate = (start, end) => {
  return Call.find({
    date: { $gte: start, $lte: end },
  })
    .count()
    .exec();
};
