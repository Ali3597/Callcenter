const {
  findWorkerPerEmail,
  updateAvailableToFalseById,
} = require("../queries/workers.queries");

exports.login = async (req, res, next) => {
  try {
    console.log("mood");
    const { email, password } = req.body;
    console.log(email);
    const worker = await findWorkerPerEmail(email);
    console.log(worker);
    if (worker) {
      const match = await worker.comparePassword(password);
      if (match) {
        console.log("il ya match");
        req.login(worker);
        res.send({ user: worker });
      } else {
        res.status(404).send({ message: "Mauvais identifiants" });
      }
    } else {
      res.status(404).send({ message: "Mauvais identifiants" });
    }
  } catch (e) {
    res.status(404).send({ message: "error" });
  }
};

exports.me = async (req, res) => {
  try {
    if (req.user) {
      let user = { ...req.user._doc };
      delete user.local.password;
      res.send({ user });
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
