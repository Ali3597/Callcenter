const router = require("express").Router();

const {
  requireAuth,
  requireAuthAdmin,
  notRequireAuth,
} = require("../middleware/AuthMiddleware");

const {
  calls,
  getCaller,
  callsWorker,
  createCall,
} = require("../controllers/call.controller");

router.post("/getcaller", getCaller);
// to delete after
router.post("/create", createCall);
router.get("/", requireAuth, calls);
router.get("/:workerId", requireAuth, callsWorker);

module.exports = router;
