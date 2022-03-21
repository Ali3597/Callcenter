const router = require("express").Router();

const {
  customers,
  newCustomer,
  oneCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");

router.get("/", customers);
router.get("/:customerId", oneCustomer);

router.post("/new", newCustomer);
router.delete("/delete/:customerId", deleteCustomer);

module.exports = router;
