import './Requests.css'
import { ParseRequest } from '../../utils/ParseDatas';
import { useEffect, useState } from 'react';
import { Tab } from '../../components/Tab';
const { faker } = require("@faker-js/faker");
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




export const Requests = () => {
    const [requestsParsed, setRequestsParsed] = useState(null);
  useEffect(() => {
    if (requests) {
      setRequestsParsed(ParseRequest(requests));
    }
  }, [requests]);
    return <>
        <h1>Requetes</h1>
         {requestsParsed && <Tab columns={columns} rows={requestsParsed} />}
        </>
}