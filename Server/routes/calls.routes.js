const router = require("express").Router();

const { calls, getCaller } = require("../controllers/call.controller");

router.post("/getcaller", getCaller);
router.get("/", calls);

module.exports = router;
