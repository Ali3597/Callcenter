const {
  findAllTheAvailableWorkers,
  findAllTheOccupiedWorkers,
  updateAvailableToOccupiedById,
} = require("../queries/workers.queries");

waitForWorkers = async () => {
  let customer;
  availableWorkers = await findAllTheAvailableWorkers();
  if (availableWorkers.length) {
    theDAte = Date.now();
    availableWorkers.forEach((element) => {
      if (element.lastHangUp < theDAte) {
        theDAte = element.lastHangUp;
        customer = element;
      }
    });
    return customer;
  } else {
    occupiedWorkers = await findAllTheOccupiedWorkers();

    if (!occupiedWorkers.length) {
      customer = false;
    } else {
      customer = true;
    }
    return customer;
  }
};

exports.chooseAWorkerAndPassHimOccupied = async () => {
  customer = await waitForWorkers();
  if (customer != false && customer != true) {
    await updateAvailableToOccupiedById(customer._id);
  }
  return customer;
};
