const {
  findLimitedRequests,
  findLimitedRequestsOfACustomer,
  countRequests,
  countRequestsOfACustomer,
  findRequestByIdWithCustomersAssociate,
  getToggleRequest,
  DeleteRequestById,
  createRequest,
  getLimitedAlertRequestsWhithCustomers,
  countAlertedRequest,
} = require("../queries/requests.queries");

exports.requests = async (req, res, next) => {
  let { page, order, sort, search, customerId } = req.body;
  if (order == "DESC") {
    order = -1;
  } else {
    order = 1;
  }
  skip = 5 * page - 5;
  if (customerId) {
    console.log("ici on a un id", customerId);
    const [requests, requestsNumbers] = await Promise.all([
      findLimitedRequestsOfACustomer(5, skip, order, sort, search, customerId),
      countRequestsOfACustomer(search, customerId),
    ]);
    console.log(requests);
    res.send({ requests, requestsNumbers });
  } else {
    const [requests, requestsNumbers] = await Promise.all([
      findLimitedRequests(5, skip, order, sort, search),
      countRequests(search),
    ]);
    res.send({ requests, requestsNumbers });
  }
};

exports.request = async (req, res, next) => {
  const requestId = req.params.requestId;
  const [request] = await Promise.all([
    findRequestByIdWithCustomersAssociate(requestId),
  ]);
  res.send({ request });
};

exports.alertRequests = async (req, res, next) => {
  let { page, order, sort, search } = req.body;
  if (order == "DESC") {
    order = -1;
  } else {
    order = 1;
  }
  skip = 5 * page - 5;
  const [request, requestCount] = await Promise.all([
    getLimitedAlertRequestsWhithCustomers(5, skip, order, sort, search),
    countAlertedRequest(search),
  ]);
  res.send({ request, requestCount });
};
exports.toggleRequest = async (req, res, next) => {
  const requestId = req.params.requestId;
  console.log(requestId);
  const request = await getToggleRequest(requestId);

  res.send({ done: request.done });
};

exports.deleteRequest = async (req, res, next) => {
  const requestId = req.params.requestId;
  await DeleteRequestById(requestId);
  res.status(204).send();
};

exports.newRequest = async (req, res, next) => {
  try {
    currentUserId = req.user._id;
    request = await createRequest(req.body, currentUserId);
    res.send({ request });
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
};
