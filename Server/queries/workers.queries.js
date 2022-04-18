const Worker = require("../database/models/worker.model");
const Request = require("../database/models/request.model");
const Call = require("../database/models/call.model");

exports.findWorkerPerEmail = (email) => {
  return Worker.findOne({ "local.email": email }).exec();
};

exports.findWorkerPerId = (id) => {
  return Worker.findById(id).exec();
};

exports.findWorkerPerUsername = (username) => {
  return Worker.findOne({ username }).exec();
};

exports.createWorker = async (user) => {
  try {
    const hashedPassword = await Worker.hashPassword(user.password);
    // to create number
    const newWorker = new Worker({
      username: user.username,
      number: user.number,
      local: {
        email: user.email,
        password: hashedPassword,
      },
    });
    const toreturn = await newWorker.save();
    let userObject = toreturn.toObject();
    delete userObject.local.password;
    return userObject;
  } catch (e) {
    throw e;
  }
};
exports.updateWorker = async (userId, username = false, email = false) => {
  const worker = await Worker.findOne({ _id: userId }, { "local.password": 0 });
  worker.local.email = email ? email : worker.local.email;
  worker.username = username ? username : worker.username;
  return worker.save();
};

exports.UpdateWorkerPassword = async (password, workerId) => {
  try {
    const hashedPassword = await Worker.hashPassword(password);
    await Worker.findByIdAndUpdate(
      workerId,

      {
        $set: {
          "local.password": hashedPassword,
        },
      },
      { runValidators: true }
    ).exec();
  } catch (e) {
    throw e;
  }
};

exports.UpdateWorkerAvatar = async (filepath, workerId) => {
  try {
    return await Worker.findByIdAndUpdate(
      workerId,
      {
        $set: {
          avatar: filepath,
        },
      },
      { runValidators: true }
    ).exec();
  } catch (e) {
    throw e;
  }
};

exports.findAllWorkers = (
  limit,
  skip = 0,
  order,
  sort = "local.email",
  search
) => {
  aggragateArray = [
    {
      $project: {
        "local.password": 0,
      },
    },
    { $sort: { [sort]: order } },
  ];
  if (search) {
    aggragateArray.push({
      $match: { "local.email": { $regex: search } },
    });
  }
  return Worker.aggregate(aggragateArray).skip(skip).limit(limit);
};

exports.countWorkers = (search) => {
  aggregateArray = [];
  if (search) {
    aggregateArray.push({
      $match: { "local.email": { $regex: search } },
    });
  }
  aggregateArray.push({
    $count: "totalCount",
  });
  console.log(aggregateArray);
  return Worker.aggregate(aggregateArray);
};

exports.findOneWorker = async (workerId) => {
  return Worker.findOne({ _id: workerId }).exec();
};

exports.updateAvailableWorkerById = async (userId) => {
  value = await Worker.findOne({ _id: userId }).exec();
  if (value.state == "available") {
    return await Worker.findByIdAndUpdate(
      userId,
      { $set: { state: "unavailable" } },
      { runValidators: true, new: true }
    ).exec();
  } else if (value.state == "unavailable") {
    return await Worker.findByIdAndUpdate(
      userId,
      { $set: { state: "available" } },
      { runValidators: true, new: true }
    ).exec();
  } else {
    return await Worker.findByIdAndUpdate(
      userId,
      { $set: { state: "occupied" } },
      { runValidators: true, new: true }
    ).exec();
  }
};

exports.updateAvailableToOccupiedById = async (userId) => {
  return Worker.findByIdAndUpdate(
    userId,
    { $set: { state: "occupied" } },
    { runValidators: true }
  ).exec();
};

exports.updateAvailableToTrueAndLastHangUp = async (userId) => {
  return Worker.findByIdAndUpdate(userId, {
    $set: {
      state: "available",
      lastHangUp: Date.now(),
    },
  }).exec();
};

exports.passBasicToAdmin = async (userId) => {
  return Worker.findByIdAndUpdate(userId, {
    $set: {
      "local.role": "admin",
    },
  }).exec();
};
exports.passAdminToBasic = async (userId) => {
  return Worker.findByIdAndUpdate(userId, {
    $set: {
      "local.role": "basic",
    },
  }).exec();
};

exports.findAllTheAvailableWorkers = () => {
  return Worker.find({
    $where: function () {
      return this.state == "available";
    },
  }).exec();
};

exports.findAllTheOccupiedWorkers = () => {
  return Worker.find({
    $where: function () {
      return this.state == "occupied";
    },
  }).exec();
};

exports.deleteWorkerById = async (workerId) => {
  Worker.findByIdAndDelete(workerId).exec();
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

exports.deleteWorkerById = async (workerId) => {
  await Call.deleteMany({ destination: workerId }).exec();
  await Request.deleteMany({ author: workerId }).exec();
  await Worker.findByIdAndDelete(workerId).exec();
};
