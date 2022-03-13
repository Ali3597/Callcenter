import { useParams } from "react-router";
import "./Request.css";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/esm/locale";
import { urgencyColor } from "../../utils/ParseDatas";
import { Dot } from "../../components/Dot";
import { Card } from "../../components/Card";
import { useToggle } from "../../hooks/index";
import { Modal } from "../../components/Modal";
import { Loader } from "../../components/Loader";
const { faker } = require("@faker-js/faker");

const customer = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  number: faker.phone.phoneNumber(),
  url: faker.image.avatar(),
};

const worker = {
  id: faker.datatype.uuid(),
  username: faker.name.findName(),
  email: faker.internet.email(),
  number: faker.phone.phoneNumber(),
  avatar: faker.image.avatar(),
};

const request = {
  id: faker.datatype.uuid(),
  typeof: faker.lorem.word(),
  author: faker.internet.userName(),
  customer: faker.internet.userName(),
  message: faker.lorem.paragraphs(),
  date: faker.date.recent(),
  deadline: faker.date.soon(),
  done: faker.datatype.boolean(),
  urgencyLevel: faker.datatype.number({
    min: 1,
    max: 5,
  }),
};

export const Request = () => {
  const { id } = useParams();
  const [deleting, toggleDeleting] = useToggle(false);
  return (
    <div className="request">
      <div className="request-title">
        <p> Requete numero : {id} </p>{" "}
        <Dot color={urgencyColor(request.urgencyLevel)} />
      </div>
      <div className="request-high">
        <Card
          photoURL={customer.url}
          name={customer.name}
          email={customer.email}
          number={customer.number}
        />
        <Card
          photoURL={worker.avatar}
          name={worker.username}
          email={worker.email}
          number={worker.number}
        />
      </div>
      <div className="request-message">
        <p>{request.message}</p>
        <div className="request-date">
          <p>Date de création : {request.date.toLocaleString()}</p>
          <p>
            Deadline :{" "}
            {formatDistanceToNow(request.deadline, {
              addSuffix: true,
              locale: fr,
            })}
          </p>
        </div>
        <div className="request-buttons">
          <button onClick={toggleDeleting}>
            <Loader />
          </button>
          <button>Valider la requette</button>
        </div>
      </div>
      {deleting && <Modal onClose={toggleDeleting} title={"aaaaaaaaaa"} />}
    </div>
  );
};
