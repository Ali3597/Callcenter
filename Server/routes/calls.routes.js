const router = require("express").Router();

const {
  calls,
  getCaller,
  callsCustomer,
  callsWorker,
  createCall,
  myCalls,
  callsTimes,
} = require("../controllers/call.controller");
const {
  requireAuth,
  requireAuthAdmin,
  notRequireAuth,
} = require("../middleware/AuthMiddleware");

router.post("/getcaller", requireAuth, getCaller);
// to delete after
router.post("/create", requireAuth, createCall);
////////////
router.post("/me", requireAuth, myCalls);
router.post("/", requireAuthAdmin, calls);
router.post("/callstimes", requireAuthAdmin, callsTimes);
router.get("/worker/:workerId", requireAuthAdmin, callsWorker);
router.get("/customer/:customerId", requireAuth, callsCustomer);

module.exports = router;
