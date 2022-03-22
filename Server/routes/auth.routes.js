const router = require("express").Router();
const { login, signout, me } = require("../controllers/auth.controller");

router.post("/login", login);
router.get("/logout", signout);
router.get("/me", me);

module.exports = router;
