const router = require("express").Router();
const workers = require("./workers.routes");
const auth = require("./auth.routes");
const calls = require("./calls.routes");
const requests = require("./requests.routes");
const customers = require("./customers.routes");

// const auth = require('./auth.routes');

// router.use('/tweets', ensureAuthenticated, tweets);q
router.use("/auth", auth);
router.use("/workers", workers);
router.use("/calls", calls);
router.use("/requests", requests);
router.use("/customers", customers);

// router.get('/',(req,res) => {
// res.red irect('/dashboard');
// })

// router.get("/", (req, res) => {
//   req.isAuthenticated() ? res.redirect("/dashboard") : res.redirect("/home");
// });

module.exports = router;
