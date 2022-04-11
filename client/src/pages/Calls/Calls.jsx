import './Calls.css'

import {apiFetch} from '../../utils/api'
import { useEffect, useState } from 'react';
import { Tab } from "../../components/Tab";
import { ParseCall } from '../../utils/ParseDatas';
import { Paginate } from "../../components/Paginate";
import { useSearchParams } from "react-router-dom";


const columns = [
  ["time", true],
  ["state", true],
  ["customer", true],
  ["number", false],
  ["date", true],
];


export const Calls = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [calls,setCalls] = useState(null)
  const [page, setPage] = useState(null);
  const [nbrPages, setNbrPages] = useState(null);
  const [order, setOrder] = useState(null);
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState(null);
  useEffect(async() => {
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
    const dataCalls = await apiFetch("/calls/me",{
      method:"POST",
      body: {
        page: pageEffect,
        order: orderEffect,
        sort: sortEffect,
        search: searchEffect,
      },
    })
    console.log(dataCalls)
    setCalls(ParseCall(dataCalls.items))
    setNbrPages(Math.ceil(dataCalls.count / 5));
  },[])
    return <>
    <h1>Mon journal d'appel</h1>
    {calls && <Tab columns={columns} rows={calls} />}
      {page && <Paginate current={page} nbrPages={nbrPages} />}
    </>
}