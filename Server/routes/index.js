const router = require("express").Router();
const workers = require("./workers.routes");
const auth = require("./auth.routes");
const calls = require("./calls.routes");
const requests = require("./requests.routes");
const customers = require("./customers.routes");

router.use("/auth", auth);
router.use("/workers", workers);
router.use("/calls", calls);
router.use("/requests", requests);
router.use("/customers", customers);

module.exports = router;
