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
  deleteWorkerById,
} = require("../queries/workers.queries");

const {
  workerInfoValidation,
  workerPasswordValidation,
} = require("../database/validation/worker.validation");

fs = require("fs");

const limit = 5;

exports.signup = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await createWorker(body);
    res.send(user);
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
    console.log(search);
    skip = page ? limit * page - limit : 0;
    const [workers, count] = await Promise.all([
      findAllWorkers(5, skip, order, sort, search),
      countWorkers(search),
    ]);

    res.send({
      items: workers.length > 0 ? workers : null,
      count: count.length > 0 ? count[0].totalCount : 0,
    });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.getOneWorker = async (req, res, next) => {
  try {
    const workerId = req.params.workerId;
    const worker = await findOneWorker(workerId);
    res.send(worker);
  } catch (error) {
    res.status(404).send({ message: "This user doesnt exist" });
  }
};

exports.updateWorker = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    await workerInfoValidation.validateAsync(req.body, { abortEarly: false });
    const user = await updateWorker(req.user.id, username, email);
    res.send(user);
  } catch (e) {
    const errorsMessage = [];
    if (e.isJoi) {
      e.details.map((error) => {
        errorsMessage.push({ field: error.path[0], message: error.message });
      });
    }
    res.status(400).send({ errors: errorsMessage });
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
    const workerId = req.params.workerId;
    await deleteWorkerById(workerId);
    res.status(204).send();
  } catch (e) {
    res.status(404).send();
  }
};

exports.updateWorkerPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    await workerPasswordValidation.validateAsync(req.body, {
      abortEarly: false,
    });
    await UpdateWorkerPassword(password, req.user.id);
    res.status(204).send();
  } catch (e) {
    const errorsMessage = [];
    if (e.isJoi) {
      e.details.map((error) => {
        errorsMessage.push({ field: error.path[0], message: error.message });
      });
    }
    res.status(400).send({ errors: errorsMessage });
  }
};

exports.updateWorkerAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(404).send("No Avatar updated");
    }
    const cutPath = req.file.path.substring(7);
    worker = await UpdateWorkerAvatar(cutPath, req.user._id);
    if (worker.avatar) {
      fs.unlinkSync("public\\" + worker.avatar);
    }
    res.send({ avatar: cutPath });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};
