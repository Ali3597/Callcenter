const router = require("express").Router();
const customers = require("./customers.routes");
const requests = require("./requests.routes");

const calls = require("./calls.routes");
const {
  waitDashboard,
  getCall,
  makeCall,
  homeDashboard,
} = require("../controllers/dashboard.controller");

router.get("/", waitDashboard);
router.post("/getcall", getCall);
router.post("/makecall", makeCall);
router.use("/home/:page", homeDashboard);
router.use("/customers", customers);
router.use("/calls", calls);
router.use("/requests", requests);

module.exports = router;
