const Request = require("../database/models/request.model");

exports.findLimitedRequests = (limit, skip, order, sort) => {
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
    { $limit: limit },
    { $skip: skip },
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

    { $sort: { [order]: sort } },
  ]);
};

exports.findRequestByIdWithCustomersAssociate = (requestId) => {
  return Request.findOne({ _id: requestId }).populate("customer").exec();
};
exports.findRequestById = (requestId) => {
  return Request.findOne({ _id: requestId }).exec();
};

exports.countRequests = () => {
  return Request.find({}).countDocuments().exec();
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

exports.getDoneRequest = (requestId) => {
  return Request.findByIdAndUpdate(
    requestId,
    { $set: { done: true } },
    { runValidators: true }
  );
};

exports.getUndoneRequest = (requestId) => {
  return Request.findByIdAndUpdate(
    requestId,
    { $set: { done: false } },
    { runValidators: true }
  );
};

exports.getLimitedAlertRequestsWhithCustomers = (limit, skip) => {
  return Request.find({
    $and: [
      {
        $where: function () {
          return Date.parse(this.deadline) - Date.now() < 1000 * 60 * 60 * 24;
        },
      },
      { done: false },
    ],
  })
    .limit(limit)
    .skip(skip)
    .populate("customer")
    .exec();
};

exports.countAlertedRequest = () => {
  return Request.find({
    $where: function () {
      return this.deadline - Date.now() < 1000 * 60 * 60 * 24;
    },
  })
    .count()
    .exec();
};

exports.DeleteRequestById = (requestId) => {
  return Request.findByIdAndDelete(requestId).exec();
};

exports.createRequest = (array, currentUserId) => {
  const newRequest = new Request({
    author: currentUserId,
    customer: array[0],
    message: array[1],
    typeof: array[2],
    urgencyLevel: array[3],
    deadline: Date.parse(array[4]),
  });
  return newRequest
    .save()
    .then((newRequest) => newRequest.populate("customer").execPopulate());
};
