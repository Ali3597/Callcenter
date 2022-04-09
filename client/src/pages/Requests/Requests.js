import "./Requests.css";
import { ParseRequest } from "../../utils/ParseDatas";
import { useEffect, useState } from "react";
import { Tab } from "../../components/Tab";
import { apiFetch } from "../../utils/api";
import { Link } from "react-router-dom";
import { Paginate } from "../../components/Paginate";
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
  ["typeof", true],
  ["author", true],
  ["customer", true],
  ["message", false],
  ["done", true],
  ["deadline", true],
  ["date", true],
  ["urgencyLevel", true],
  ["action", false],
];

export const Requests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [requestsParsed, setRequestsParsed] = useState(null);
  const [order, setOrder] = useState(null);
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(null);
  const [nbrPages, setNbrPages] = useState(null);
  useEffect(async () => {
    if (searchParams) {
      const orderEffect = searchParams.get("order");
      const sortEffect = searchParams.get("sort");
      const pageEffect = searchParams.get("page")
        ? searchParams.get("page")
        : 1;
      const searchEffect = searchParams.get("search");
      setOrder(orderEffect);
      setSort(sortEffect);
      setPage(pageEffect);
      setSearch(searchEffect);
      const response = await apiFetch("/requests", {
        method: "POST",
        body: {
          page: pageEffect,
          order: orderEffect,
          sort: sortEffect,
          search: searchEffect,
        },
      });
      console.log(response.items);
      setRequestsParsed(ParseRequest(response.items));
      setNbrPages(Math.ceil(response.count / 5));
    }
  }, [searchParams]);

  return (
    <>
      <h1>Requetes</h1>
      <button><Link to={'/newrequest'}>Nouvelle requete</Link></button>
      {requestsParsed && <Tab columns={columns} rows={requestsParsed} />}
      {page && <Paginate current={page} nbrPages={nbrPages} />}
    </>
  );
};
