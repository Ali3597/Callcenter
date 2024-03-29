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
  countRequestsByDate,
} = require("../queries/requests.queries");

const {
  requestValidation,
} = require("../database/validation/request.validation");
const limit = 5;
const mongoose = require("mongoose");
const { response } = require("express");

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

exports.requestsTimes = async (req, res, next) => {
  try {
    const start = new Date(req.body.start);
    start.setHours(0, 0, 0, 0);

    const end = new Date(req.body.end);
    end.setHours(23, 59, 59, 999);

    const [requestNumbers] = await Promise.all([
      countRequestsByDate(start, end),
    ]);

    res.send({
      itemsNumber: requestNumbers,
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

    const request = await findRequestByIdWithCustomersAndWorkerAssociate(
      requestId
    );

    res.send({ item: request });
  } catch (error) {
    res.send({ item: null });
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

    await DeleteRequestById(requestId);
    res.status(204).send();
  } catch (error) {
    res.status(404).send({ message: "Wrong Request" });
  }
};

exports.newRequest = async (req, res, next) => {
  try {
    currentUserId = req.user._id;
    await requestValidation.validateAsync(req.body, { abortEarly: false });
    request = await createRequest(req.body, currentUserId);
    res.send(request);
  } catch (e) {
    const errorsMessage = [];
    if (e.isJoi) {
      e.details.map((error) => {
        errorsMessage.push({ field: error.path[0], message: error.message });
      });
    }
    res.status(400).send({ errors: errorsMessage });
  }
};
