const router = require("express").Router();

const {
  requests,
  request,
  deleteRequest,
  toggleRequest,
  newRequest,
  alertRequests,
} = require("../controllers/request.controller");

router.get("/", requests);
router.get("/alert", alertRequests);
router.get("/:requestId", request);
router.delete("/delete/:requestId", deleteRequest);
router.get("/toggle/:requestId", toggleRequest);
router.post("/new", newRequest);

module.exports = router;
