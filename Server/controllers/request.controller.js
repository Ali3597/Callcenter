const {
  findLimitedRequests,
  findLimitedRequestsOfACustomer,
  countRequests,
  countRequestsOfACustomer,
  findRequestByIdWithCustomersAndWorkerAssociate,
  getToggleRequest,
  DeleteRequestById,
  createRequest,
  getLimitedAlertRequestsWhithCustomers,
  countAlertedRequest,
  findLimitedRequestsByWorkerId,
  countRequestsByWorkerId,
  findLimitedRequestsByCustomerId,
  countRequestsByCustomerId,
} = require("../queries/requests.queries");
const limit = 5;
const mongoose = require("mongoose");
exports.requests = async (req, res, next) => {
  try {
    let { page, order, sort, search } = req.body;
    if (order == "ASC") {
      order = 1;
    } else {
      order = -1;
    }
    skip = limit * page - limit;
    const [requests, requestsNumbers] = await Promise.all([
      findLimitedRequests(limit, skip, order, sort, search),
      countRequests(search),
    ]);
    res.send({
      items: requests.length > 0 ? requests : null,
      count: requestsNumbers.length > 0 ? requestsNumbers[0].totalCount : 0,
    });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.requestsWorker = async (req, res, next) => {
  try {
    const workerId = req.params.workerId;
    let { page, order, sort, search } = req.body;
    if (order == "ASC") {
      order = 1;
    } else {
      order = -1;
    }
    skip = limit * page - limit;
    const [requests, requestsNumbers] = await Promise.all([
      findLimitedRequestsByWorkerId(
        limit,
        skip,
        order,
        sort,
        search,
        new mongoose.Types.ObjectId(workerId)
      ),
      countRequestsByWorkerId(search, new mongoose.Types.ObjectId(workerId)),
    ]);
    res.send({
      items: requests.length > 0 ? requests : null,
      count: requestsNumbers.length > 0 ? requestsNumbers[0].totalCount : 0,
    });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.requestsCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    let { page, order, sort } = req.body;
    if (order == "ASC") {
      order = 1;
    } else {
      order = -1;
    }
    skip = limit * page - limit;
    const [requests, requestsNumbers] = await Promise.all([
      findLimitedRequestsByCustomerId(
        limit,
        skip,
        order,
        sort,
        new mongoose.Types.ObjectId(customerId)
      ),
      countRequestsByCustomerId(new mongoose.Types.ObjectId(customerId)),
    ]);
    res.send({
      items: requests.length > 0 ? requests : null,
      count: requestsNumbers.length > 0 ? requestsNumbers[0].totalCount : 0,
    });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};
exports.request = async (req, res, next) => {
  try {
    const requestId = req.params.requestId;
    console.log(requestId);
    const request = await findRequestByIdWithCustomersAndWorkerAssociate(
      requestId
    );
    res.send(request);
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.alertRequests = async (req, res, next) => {
  try {
    let { page, order, sort, search } = req.body;
    if (order == "ASC") {
      order = 1;
    } else {
      order = -1;
    }
    skip = limit * page - limit;
    const [requests, requestsNumbers] = await Promise.all([
      getLimitedAlertRequestsWhithCustomers(limit, skip, order, sort, search),
      countAlertedRequest(search),
    ]);
    res.send({
      items: requests.length > 0 ? requests : null,
      count: requestsNumbers.length > 0 ? requestsNumbers[0].totalCount : 0,
    });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};
exports.toggleRequest = async (req, res, next) => {
  try {
    const requestId = req.params.requestId;

    const request = await getToggleRequest(requestId);

    res.send({ done: request.done });
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.deleteRequest = async (req, res, next) => {
  try {
    const requestId = req.params.requestId;
    const request = await findRequestByIdWithCustomersAndWorkerAssociate(
      requestId
    );
    if (req.user._id == request.author._id || req.user.local.role == "admin") {
      await DeleteRequestById(requestId);
      res.status(204).send();
    } else {
      res
        .status(404)
        .send({ message: "You have not the right to delete this request" });
    }
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.newRequest = async (req, res, next) => {
  try {
    currentUserId = req.user._id;
    request = await createRequest(req.body, currentUserId);
    res.send({ request });
  } catch (e) {
    res.status(404).send({ message: "Wrong Request" });
  }
};
