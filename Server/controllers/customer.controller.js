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

const {
  customerValidation,
} = require("../database/validation/customer.validation");

fs = require("fs");

exports.customers = async (req, res, next) => {
  try {
    let { page, order, sort, search } = req.body;
    if (order == "ASC") {
      order = 1;
    } else {
      order = -1;
    }
    skip = 5 * page - 5;
    const [customers, customersNumbers] = await Promise.all([
      findLimitedCustomers(5, skip, order, sort, search),
      countCustomers(search),
    ]);
    res.send({
      items: customers.length > 0 ? customers : null,
      count: customersNumbers.length > 0 ? customersNumbers[0].totalCount : 0,
    });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};
exports.oneCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const customer = await findCustomerById(customerId);
    res.send(customer);
  } catch (error) {
    res.status(404).send({ message: "This customer doesnt exist" });
  }
};

exports.updateCustomerAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(404).send("No Avatar updated");
    }
    console.log(req.file);
    const customerId = req.params.customerId;
    const cutPath = req.file.path.substring(7);
    const customer = await UpdateCustomerAvatar(cutPath, customerId);
    if (customer.avatar) {
      fs.unlinkSync("public\\" + customer.avatar);
    }
    res.send({ avatar: cutPath });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.newCustomer = async (req, res, next) => {
  try {
    await customerValidation.validateAsync(req.body, { abortEarly: false });
    newCustomer = await createCustomer(req.body);
    res.send(newCustomer);
  } catch (e) {
    const errorsMessage = [];
    console.log(e);
    if (e.isJoi) {
      e.details.map((error) => {
        errorsMessage.push({ field: error.path[0], message: error.message });
      });
    }
    res.status(400).send({ errors: errorsMessage });
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    await deleteCustomerById(customerId);
    res.status(204).send();
  } catch (e) {
    res.status(404).send();
  }
};
