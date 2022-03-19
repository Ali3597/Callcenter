const router = require("express").Router();

const { calls } = require("../controllers/call.controller");

router.get("/", calls);

module.exports = router;
