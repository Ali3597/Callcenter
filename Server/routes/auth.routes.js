const router = require("express").Router();
const {
  signinForm,
  signin,
  signout,
  me,
} = require("../controllers/auth.controller");

router.get("/signin/form", signinForm);
router.post("/signin", signin);
router.get("/signout", signout);
router.get("/me", me);

module.exports = router;
