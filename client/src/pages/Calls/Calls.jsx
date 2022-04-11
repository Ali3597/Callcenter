import './Calls.css'

import {apiFetch} from '../../utils/api'
import { useEffect, useState } from 'react';
import { Tab } from "../../components/Tab";
import { ParseCall } from '../../utils/ParseDatas';
import { Paginate } from "../../components/Paginate";
import { useSearchParams } from "react-router-dom";
import { FcSearch } from "react-icons/fc";


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

  const [search, setSearch] = useState("");
  useEffect(async() => {
    const orderEffect = searchParams.get("order");
    const sortEffect = searchParams.get("sort");
    const pageEffect = searchParams.get("page")
      ? searchParams.get("page")
      : 1;
    const searchEffect = searchParams.get("search");
      setPage(pageEffect);
      setSearch(searchEffect? searchEffect :"");
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
    if(dataCalls.items){
    setCalls(ParseCall(dataCalls.items))
    setNbrPages(Math.ceil(dataCalls.count / 5));
    }else{
      setCalls(null)
      setNbrPages(0)
    }
  },[searchParams])
  const handleSearch= (e)=>{
    e.preventDefault()
 setSearchParams({"search":search})
  
  }
    return <>
    <h1>Mon journal d'appel</h1>
    <div className="beetween"><form  onSubmit={handleSearch}><input onChange={(e)=>(setSearch(e.target.value))} value={search} placeholder={"recherche"}></input> <button><FcSearch/></button>         </form></div>

    {calls ? <Tab columns={columns} rows={calls} /> : <p>Aucucn appel ne correspond</p>}
      {page && <Paginate current={page} nbrPages={nbrPages} />}
    </>
}