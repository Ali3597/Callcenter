import { formatDistanceToNow, parseISO } from "date-fns";
import { fr } from "date-fns/esm/locale";
import { FaCheck } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Dot } from "../components/Dot";

export const urgencyColor = (number) => {
  switch (parseInt(number)) {
    case 1:
      return "24E34C";
    case 2:
      return "F6F911";
    case 3:
      return "EFA70D";
    case 4:
      return "EF620D";
    case 5:
      return "EF0D0D";
    default:
      return "FFFFF";
  }
};

export const ParseRequest = (requests) => {
  const requestsParsed = requests.map((request) => {
    return {
      ...request,
      id: request._id,
      customer:
        request.customer.length > 0 ? request.customer[0].email : "Aucun",
      author:
        request.author.length > 0 ? request.author[0].local.email : "Aucun",
      done: request.done ? (
        <FaCheck size={20} color={"green"} />
      ) : (
        <FaWindowClose size={20} color={"red"} />
      ),
      action: <Link to={`/requetes/${request._id}`}>Consultez</Link>,
      urgencyLevel: (
        <Dot color={urgencyColor(parseInt(request.urgencyLevel))} />
      ),
      date: new Date(request.date).toLocaleString("FR"),
      deadline: formatDistanceToNow(parseISO(request.deadline), {
        addSuffix: true,
        locale: fr,
      }),
    };
  });
  return requestsParsed;
};

export const ParseCustomer = (customers) => {
  const customersParsed = customers.map((customer) => {
    return {
      ...customer,
      id: customer._id,
      action: <Link to={`/clients/${customer._id}`}>Consultez</Link>,
    };
  });
  return customersParsed;
};

export const ParseWorker = (workers) => {
  const workersParsed = workers.map((worker) => {
    return {
      ...worker,
      id: worker._id,
      role: worker.local.role,
      email: worker.local.email,
      lastHangUp: worker.lastHangUp
        ? worker.lastHangUp.toLocaleString()
        : "Aucune donnée",
      state: worker.state === "available" ? "disponible" : "Indisponible",
      action: <Link to={`/admin/employes/${worker._id}`}>Consultez</Link>,
    };
  });
  return workersParsed;
};

export const ParseCall = (calls) => {
  const callsParsed = calls.map((call) => {
    return {
      ...call,
      id: call._id,
      customer: call.customer.length > 0 ? call.customer[0].email : "Inconnu",
      time: ParseTime(call.time),
      state: call.time === 0 ? "Appel manqué" : "Appel pris",
      date: call.date.toLocaleString(),
    };
  });
  return callsParsed;
};

export const ParseTime = (seconds, separator = null) => {
  return [
    parseInt(seconds / 60 / 60),
    parseInt((seconds / 60) % 60),
    parseInt(seconds % 60),
  ]
    .join(separator ? separator : ":")
    .replace(/\b(\d)\b/g, "0$1")
    .replace(/^00:/, "");
};
