const router = require("express").Router();
const { login, signout, me } = require("../controllers/auth.controller");
const {
  requireAuth,
  requireAuthAdmin,
  notRequireAuth,
} = require("../middleware/AuthMiddleware");

router.post("/login", notRequireAuth, login);
router.get("/logout", requireAuth, signout);
router.get("/me", me);

module.exports = router;
