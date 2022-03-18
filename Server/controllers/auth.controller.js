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
    next(e);
  }
};

exports.me = async (req, res) => {
  if (req.user) {
    res.send({ user: req.user });
  } else {
    res.send({ user: null });
  }
};

exports.signout = async (req, res, next) => {
  req.logout();
  res.send({ message: "User Logged Out" });
};
