const router = require("express").Router();

const {
  customers,
  newCustomer,
  oneCustomer,
  updateCustomerAvatar,
} = require("../controllers/customer.controller");
const {
  uploadProfilePictureCustomer,
} = require("../controllers/upload.controller");

router.get("/", customers);
router.get("/:customerId", oneCustomer);
router.post("/updateAvatar", updateCustomerAvatar);
router.post("/new", newCustomer);

module.exports = router;
