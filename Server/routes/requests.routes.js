const router = require("express").Router();
const {
  requireAuth,
  requireAuthAdmin,
  notRequireAuth,
} = require("../middleware/AuthMiddleware");
const {
  requests,
  request,
  deleteRequest,
  toggleRequest,
  newRequest,
  alertRequests,
  requestsWorker,
  requestsCustomer,
} = require("../controllers/request.controller");
router.post("/", requireAuth, requests);
router.get("/worker/:workerId", requireAuth, requestsWorker);
router.post("/customer/:customerId", requireAuth, requestsCustomer);
router.post("/alert", alertRequests);

router.get("/:requestId", requireAuth, request);
router.delete("/delete/:requestId", requireAuthAdmin, deleteRequest);
router.get("/toggle/:requestId", requireAuth, toggleRequest);
router.post("/new", requireAuth, newRequest);

module.exports = router;
