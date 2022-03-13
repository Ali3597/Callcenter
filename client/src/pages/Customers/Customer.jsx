import { useParams } from "react-router";
import "./Customer.css";
import { Tab } from "../../components/Tab";
import { useEffect, useState } from "react";
import { ParseRequest } from "../../utils/ParseDatas";
import { Card } from "../../components/Card";
const { faker } = require("@faker-js/faker");

const customer = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  number: faker.phone.phoneNumber(),
  url: faker.image.avatar(),
};
let requests = [];
for (let i = 0; i < 5; i++) {
  requests[i] = {
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
}
const columns = [
  "typeof",
  "author",
  "customer",
  "message",
  "done",
  "deadline",
  "date",
  "urgencyLevel",
  "action",
];



export const Customer = () => {
  const [requestsParsed, setRequestsParsed] = useState(null);
  useEffect(() => {
    if (requests) {
      setRequestsParsed(ParseRequest(requests));
    }
  }, [requests]);
  const { id } = useParams();
  console.log(id);
  return (
    <div className="customer">
      <Card photoURL={customer.url} name={customer.name} email={customer.email} number={customer.number} />
      <h1>Ses Requetes</h1>
      {requestsParsed && <Tab columns={columns} rows={requestsParsed} />}
    </div>
  );
};
