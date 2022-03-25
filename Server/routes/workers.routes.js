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
} = require("../controllers/worker.controller");

const {
  uploadProfilePictureWorker,
} = require("../controllers/upload.controller");

router.get("/", requireAuth, getWorkers);
router.get("/:workerId", requireAuth, getOneWorker);
router.post("/signup", requireAuthAdmin, signup);
router.post("/update", requireAuth, updateWorker);
router.post("/updatePassword", requireAuth, updateWorkerPassword);
router.delete("/delete/:workerId", requireAuthAdmin, deleteWorker);
router.post("/passadmin/:workerId", requireAuthAdmin, updateWorkerToAdmin);
router.post(
  "/avatar",
  uploadProfilePictureWorker.single("profile"),
  updateWorkerAvatar
);

module.exports = router;
