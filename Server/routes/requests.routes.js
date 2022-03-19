const router = require("express").Router();

const {
  requests,
  request,
  deleteRequest,
  toggleRequest,
  newRequest,
} = require("../controllers/request.controller");

router.get("/", requests);
router.get("/:requestId", request);
router.delete("/delete/:requestId", deleteRequest);
router.get("/toggle/:requestId", toggleRequest);
router.post("/new", newRequest);

module.exports = router;
