const {
  findLimitedRequests,
  countRequests,
  findRequestByIdWithCustomersAssociate,
  getToggleRequest,
  DeleteRequestById,
  createRequest,
} = require("../queries/requests.queries");

exports.requests = async (req, res, next) => {
  let { page, order, sort, search } = req.body;
  if (sort == "DESC") {
    sort = -1;
  } else {
    sort = 1;
  }
  skip = 5 * page - 5;
  console.log(skip, "voila le kip");
  const [requests, requestsNumbers] = await Promise.all([
    findLimitedRequests(5, skip, order, sort, search),
    countRequests(search),
  ]);
  console.log(requests, "on est la");
  res.send({ requests, requestsNumbers });
};

exports.request = async (req, res, next) => {
  const requestId = req.params.requestId;
  const [request] = await Promise.all([
    findRequestByIdWithCustomersAssociate(requestId),
  ]);
  res.send({ request });
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
