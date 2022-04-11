import "./Customers.css";
import { Tab } from "../../components/Tab";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { ParseCustomer } from "../../utils/ParseDatas";
import { Paginate } from "../../components/Paginate";
import { useSearchParams } from "react-router-dom";



const columns = [
  ["name", true],
  ["email", true],
  ["number", true],
  ["action", false],
];

export const Customers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [customers, setCustomers] = useState(null);
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
      const response = await apiFetch("/customers", {
        method: "POST",
        body: {
          page: pageEffect,
          order: orderEffect,
          sort: sortEffect,
          search: searchEffect,
        },
      });
      setCustomers(ParseCustomer(response.items));

      setNbrPages(Math.ceil(response.count / 5));
    }
  }, [searchParams]);
  return (
    <>
    <h1>Les Clients</h1>
    <button><Link to={'/customers/new'}>Nouveau client</Link></button>
      {customers && <Tab columns={columns} rows={customers} />}
      {page && <Paginate current={page} nbrPages={nbrPages} />}
    </>
  );
};
