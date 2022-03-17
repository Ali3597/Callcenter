import './Requests.css'
import { ParseRequest } from '../../utils/ParseDatas';
import { useEffect, useState } from 'react';
import { Tab } from '../../components/Tab';
import {apiFetch} from '../../utils/api'
import { Paginate } from '../../components/Paginate';
import { useSearchParams } from "react-router-dom";
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
 const [searchParams, setSearchParams] = useSearchParams();
  const [requestsParsed, setRequestsParsed] = useState(null);
  const [order, setOrder] = useState(null)
  const [flow, setFlow] = useState(null)
  const [page,setPage] = useState(null)
  useEffect(async () => {
    setRequestsParsed(ParseRequest(await apiFetch("/requests/1")))
  },[])
  useEffect(() => {
    console.log(searchParams.get('foo'), "les searchs params")
    setOrder(searchParams.get('order'))
    setFlow(searchParams.get('flow'))
    setPage(searchParams.get('page')? searchParams.get('page'): 1 )
    },[searchParams])
    return <>
        <h1>Requetes</h1>
      {requestsParsed && <Tab columns={columns} rows={requestsParsed} />}
      {page && <Paginate current={page} nbrPages={10} />}
        </>
}