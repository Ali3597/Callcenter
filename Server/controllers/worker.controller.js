const {
  createWorker,
  updateAvailableWorkerById,
  findAllWorkers,
  updateWorker,
  findOneWorker,
  UpdateWorkerPassword,
  UpdateWorkerAvatar,
  countWorkers,
  passBasicToAdmin,
} = require("../queries/workers.queries");
fs = require("fs");
const limit = 5;

exports.signup = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await createWorker(body);
    res.send({ user });
  } catch (e) {
    res.status(404).send();
  }
};

exports.getWorkers = async (req, res, next) => {
  try {
    let { page, order, sort, search } = req.body;
    if (order == "ASC") {
      order = 1;
    } else {
      order = -1;
    }
    skip = page ? limit * page - limit : 0;
    const [workers, count] = await Promise.all([
      findAllWorkers(5, skip, order, sort, search),
      countWorkers(search),
    ]);
    res.send({ workers, count });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.getOneWorker = async (req, res, next) => {
  try {
    const workerId = req.params.workerId;
    workers = await findOneWorker(workerId);
    res.send(workers);
  } catch (error) {
    res.status(404).send({ message: "This user doesnt exist" });
  }
};

exports.updateWorker = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    const user = await updateWorker(req.user.id, username, email);
    res.send(user);
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.updateWorkerPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    await UpdateWorkerPassword(password, req.user.id);
    res.status(204).send();
  } catch (e) {
    res.status(404).send();
  }
};

exports.updateWorkerToAdmin = async (req, res, next) => {
  try {
    const workerId = req.params.workerId;
    await passBasicToAdmin(workerId);
    res.status(204).send();
  } catch (e) {
    res.status(404).send();
  }
};
exports.deleteWorker = async (req, res, next) => {
  try {
    const { password } = req.body;
    await UpdateWorkerPassword(password, req.user.id);
    res.status(204).send();
  } catch (e) {
    res.status(404).send();
  }
};

exports.updateWorkerPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    await UpdateWorkerPassword(password, req.user.id);
    res.status(204).send();
  } catch (e) {
    res.status(404).send();
  }
};

exports.updateWorkerAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(404).send("No Avatar updated");
    }
    worker = await UpdateWorkerAvatar(req.file.path, req.user._id);
    fs.unlinkSync(worker.avatar);
    res.send({ avatar: req.file.path });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};
