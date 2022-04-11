import { useParams } from "react-router";
import "./Customer.css";
import { Tab } from "../../components/Tab";
import { useEffect, useState } from "react";
import { ParseRequest } from "../../utils/ParseDatas";
import { Card } from "../../components/Card";
import { apiFetch } from "../../utils/api";
import { Link } from "react-router-dom";
import { Paginate } from "../../components/Paginate";
import { useSearchParams } from "react-router-dom";
const { faker } = require("@faker-js/faker");

const customerFake = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  number: faker.phone.phoneNumber(),
  url: faker.image.avatar(),
};

const columns = [
  ["typeof", true],
  ["author", true],
  ["customer", false],
  ["message", false],
  ["done", true],
  ["deadline", true],
  ["date", true],
  ["urgencyLevel", true],
  ["action", false],
];


export const Customer = () => {
  const [customer,setCustomer]= useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const [requestsParsed, setRequestsParsed] = useState(null);
  const [order, setOrder] = useState(null);
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(null);
  const [nbrPages, setNbrPages] = useState(null);
  useEffect(async ()=>{
    const response = await apiFetch("/customers/"+id)
    setCustomer(response)
  },[])
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
      const response = await apiFetch("/requests/customer/"+id, {
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
    <div className="customer">
      <h1>Page client</h1>
      {customer && <Card photoURL={customerFake.url} name={customer.name} email={customer.email} number={customer.number} />}
      <h1>Ses Requetes</h1>
      <button><Link to={'/requests/new?customer='+id}>Lui créer une nouvelle requete</Link></button>
      {requestsParsed  && <Tab columns={columns} rows={requestsParsed} />}
      {!requestsParsed && <p>Ce client n'aspour l'instant aucune requetes</p>}
      {page && <Paginate current={page} nbrPages={nbrPages} />}
    </div>
  );
};
