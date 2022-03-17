import { formatDistanceToNow, parseISO } from "date-fns";
import { fr } from "date-fns/esm/locale";
import { FaCheck } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Dot } from "../components/Dot";

export const urgencyColor = (number) => {
  switch (number) {
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
      return "black";
  }
};

export const ParseRequest = (requests) => {
  const requestsParsed = requests.map((request) => {
    return {
      ...request,
      id: request._id,
      customer: request.customer.email,
      author: request.author.local.email,
      done: request.done ? <FaCheck /> : <FaWindowClose />,
      action: <Link to={`/requests/${request.id}`}>Consultez</Link>,
      message: request.message.slice(0, 20).concat("…"),
      urgencyLevel: (
        <Dot color={urgencyColor(parseInt(request.urgencyLevel))} />
      ),
      date: request.date.toLocaleString(),
      deadline: formatDistanceToNow(parseISO(request.deadline), {
        addSuffix: true,
        locale: fr,
      }),
    };
  });
  return requestsParsed;
};
