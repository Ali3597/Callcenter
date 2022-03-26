const {
  findWorkerPerEmail,
  updateAvailableToFalseById,
} = require("../queries/workers.queries");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const worker = await findWorkerPerEmail(email);
    if (worker) {
      const match = await worker.comparePassword(password);
      if (match) {
        req.login(worker);
        res.send({ user: worker });
      } else {
        res.status(404).send({ errors: "Wrong Credentials" });
      }
    } else {
      res.status(404).send({ errors: "Wrong Credentials" });
    }
  } catch (e) {
    res.status(404).send({ message: "error" });
  }
};

exports.me = async (req, res) => {
  try {
    if (req.user) {
      res.send({ user: req.user });
    } else {
      res.send({ user: null });
    }
  } catch (error) {
    res.status(404).send({ message: "error" });
  }
};

exports.signout = async (req, res, next) => {
  req.logout();
  res.status(204).send();
};
