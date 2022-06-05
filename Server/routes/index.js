const router = require("express").Router();
const workers = require("./workers.routes");
const auth = require("./auth.routes");
const calls = require("./calls.routes");
const requests = require("./requests.routes");
const customers = require("./customers.routes");

router.use("/api/auth", auth);
router.use("/api/workers", workers);
router.use("/api/calls", calls);
router.use("/api/requests", requests);
router.use("/api/customers", customers);

module.exports = router;
