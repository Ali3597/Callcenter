const {
  createCustomer,
  findLimitedCustomers,
  countCustomers,
  findCustomerById,
  findCustomerByName,
  findCustomersLikeNameLimited,
  countCustomersLikeName,
  deleteCustomerById,
} = require("../queries/customers.queries");
const {
  findLimitedRequestsByCustomerId,
  countRequestsByCustomerId,
  createRequestOnCustomerId,
  findLimitedRequestsByCustomerIdWithCustomersAssociate,
} = require("../queries/requests.queries");

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

exports.deleteCustomer = async (req, res, next) => {
  const customerId = req.params.customerId;
  try {
    await deleteCustomerById(customerId);
    res.status(204).send();
  } catch (error) {
    res.status(404).send();
  }
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

exports.newRequestOnCustomer = async (req, res, next) => {
  const customerId = req.params.customerId;
  await createRequestOnCustomerId(customerId);
  const [customer, requests, requestsNumbers] = await Promise.all([
    findCustomerById(customerId),
    findLimitedRequestsByCustomerIdWithCustomersAssociate(3, 0, customerId),
    countRequestsByCustomerId(customerId),
  ]);
  titleRequests = titleMessageOn("requests", requests);
  pageNumberRequests = pageCalculator(requestsNumbers, 3);
  res.render("customers/profileCustomer", {
    profile: true,
    customer,
    requests,
    titleRequests,
    pageNumberRequests,
    requestTableFormat,
    subMessage,
    range,
    properStringDate,
    urgencyColor,
    deadlineTimeCalcul,
  });
};
