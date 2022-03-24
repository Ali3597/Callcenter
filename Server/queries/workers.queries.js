const Worker = require("../database/models/worker.model");

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
      number: "PJSIP/workeddddr25",
      local: {
        email: user.email,
        password: hashedPassword,
      },
    });
    const toreturn = newWorker.save();
    return { ...toreturn.toObject(), "local.password": null };
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
  search = ""
) => {
  return Worker.aggregate([
    {
      $project: {
        "local.password": 0,
        "local.role": 0,
      },
    },
    {
      $match: { "local.email": { $regex: search } },
    },
    { $sort: { [sort]: order } },
  ])
    .skip(skip)
    .limit(limit);
};

exports.countWorkers = (search = "") => {
  return Worker.aggregate([
    {
      $match: { "local.email": { $regex: search } },
    },
    {
      $count: "totalCount",
    },
  ]);
};

exports.findOneWorker = async (workerId) => {
  return Worker.findOne({ _id: workerId }).exec();
};

// exports.updateAvailableWorkerById = async (userId) => {
//   value = await Worker.findOne({ _id: userId }).exec();
//   if (value.state == "available") {
//     return Worker.findByIdAndUpdate(
//       userId,
//       { $set: { state: "unavailable" } },
//       { runValidators: true }
//     ).exec();
//   } else if (value.state == "unavailable") {
//     return Worker.findByIdAndUpdate(
//       userId,
//       { $set: { state: "available" } },
//       { runValidators: true }
//     ).exec();
//   } else {
//     return Worker.findByIdAndUpdate(
//       userId,
//       { $set: { state: "occupied" } },
//       { runValidators: true }
//     ).exec();
//   }
// };

exports.updateAvailableToFalseById = async (userId) => {
  return Worker.findByIdAndUpdate(
    userId,
    { $set: { state: "unavailable" } },
    { runValidators: true }
  ).exec();
};

exports.updateAvailableToOccupiedById = async (userId) => {
  return Worker.findByIdAndUpdate(
    userId,
    { $set: { state: "occupied" } },
    { runValidators: true }
  ).exec();
};

exports.updateAvailableToTrueById = async (userId) => {
  return Worker.findByIdAndUpdate(
    userId,
    { $set: { state: "available" } },
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
