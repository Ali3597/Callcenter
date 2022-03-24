const multer = require("multer");

var storageWorker = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profil/worker");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var storageCustomer = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profil/customer");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const filters = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    resizeBy.send(404);
    cb(null, false);
  }
};
const fileSize = 1024 * 1024 * 5;

exports.uploadProfilePictureWorker = multer({
  storage: storageWorker,
  limits: {
    fileSize: fileSize,
  },
  fileFilter: filters,
});

exports.uploadProfilePictureCustomer = multer({
  storage: storageCustomer,
  limits: {
    fileSize: fileSize,
  },
  fileFilter: filters,
});
