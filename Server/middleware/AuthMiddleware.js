exports.requireAuth = (req, res, next) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(404).send({ message: "Your are not logged in" });
  }
};

exports.notRequireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(404).send({ message: "Your are  logged in" });
  }
};

exports.requireAuthAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.local.role == "admin") {
      next();
    } else {
      res.status(404).send({ message: "You dont have the rights" });
    }
  } else {
    res.status(404).send({ message: "Your are not logged in" });
  }
};
