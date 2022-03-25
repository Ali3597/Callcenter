const router = require("express").Router();

const {
  customers,
  newCustomer,
  oneCustomer,
  updateCustomerAvatar,
  deleteCustomer,
} = require("../controllers/customer.controller");
const {
  uploadProfilePictureCustomer,
} = require("../controllers/upload.controller");
const {
  requireAuth,
  requireAuthAdmin,
  notRequireAuth,
} = require("../middleware/AuthMiddleware");

router.get("/", requireAuth, customers);
router.get("/:customerId", requireAuth, oneCustomer);
router.post(
  "/avatar/:customerId",
  requireAuth,
  uploadProfilePictureCustomer.single("profile"),
  updateCustomerAvatar
);
router.post("/new", requireAuth, newCustomer);
router.delete("/delete/:customerId", requireAuthAdmin, deleteCustomer);

module.exports = router;
