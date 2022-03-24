const {
  createCustomer,
  findLimitedCustomers,
  countCustomers,
  findCustomerById,
  findCustomerByName,
  findCustomersLikeNameLimited,
  countCustomersLikeName,
  deleteCustomerById,
  UpdateCustomerAvatar,
} = require("../queries/customers.queries");
const {
  findLimitedRequestsByCustomerId,
  countRequestsByCustomerId,
  createRequestOnCustomerId,
  findLimitedRequestsByCustomerIdWithCustomersAssociate,
} = require("../queries/requests.queries");

fs = require("fs");

exports.customers = async (req, res, next) => {
  let { page, order, sort, search } = req.body;
  if (order == "DESC") {
    order = -1;
  } else {
    order = 1;
  }
  skip = 5 * page - 5;
  const [customers, customersNumbers] = await Promise.all([
    findLimitedCustomers(5, skip, order, sort, search),
    countCustomers(search),
  ]);
  res.send({ customers, customersNumbers });
};
exports.oneCustomer = async (req, res, next) => {
  const customerId = req.params.customerId;
  const customer = await findCustomerById(customerId);
  res.send({ customer });
};

exports.updateCustomerAvatar = async (req, res, next) => {
  if (!req.file) {
    res.status(404).send("No Avatar updated");
  }
  const customerId = req.params.customerId;
  const customer = await UpdateCustomerAvatar(req.file.path, customerId);
  //  fs.unlinkSync(worker.avatar);
  res.status(204).send();
};

exports.newCustomer = async (req, res, next) => {
  console.log("allo");
  try {
    newCustomer = await createCustomer(req.body);
    res.send({ newCustomer });
  } catch (e) {
    res.status(404).send();
  }
};
