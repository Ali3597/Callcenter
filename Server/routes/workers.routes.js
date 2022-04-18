const router = require("express").Router();

const {
  requireAuth,
  requireAuthAdmin,
  notRequireAuth,
} = require("../middleware/AuthMiddleware");

const {
  signup,
  updateWorker,
  updateWorkerToAdmin,
  getWorkers,
  getOneWorker,
  updateWorkerPassword,
  updateWorkerAvatar,
  deleteWorker,
  toggleState,
  updateWorkerToBasic,
} = require("../controllers/worker.controller");

const {
  uploadProfilePictureWorker,
} = require("../controllers/upload.controller");

router.post("/", requireAuthAdmin, getWorkers);
router.get("/:workerId", requireAuthAdmin, getOneWorker);
/// to do me
router.post("/signup", requireAuthAdmin, signup);
router.post("/update", requireAuth, updateWorker);
router.post("/updatePassword", requireAuth, updateWorkerPassword);
router.delete("/delete/:workerId", requireAuthAdmin, deleteWorker);
router.post("/passadmin/:workerId", requireAuthAdmin, updateWorkerToAdmin);
router.post("/passbasic/:workerId", requireAuthAdmin, updateWorkerToBasic);
router.post("/toggleState", requireAuth, toggleState);
router.post(
  "/avatar",
  uploadProfilePictureWorker.single("profile"),
  updateWorkerAvatar
);

module.exports = router;
