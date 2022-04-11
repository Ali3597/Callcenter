import "./Customers.css";
import { Tab } from "../../components/Tab";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { ParseCustomer } from "../../utils/ParseDatas";
import { Paginate } from "../../components/Paginate";
import { useSearchParams } from "react-router-dom";
import { FcSearch } from "react-icons/fc";



const columns = [
  ["name", true],
  ["email", true],
  ["number", true],
  ["action", false],
];

export const Customers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [customers, setCustomers] = useState(null);

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
      setPage(pageEffect);
      setSearch(searchEffect?searchEffect :"");
      const response = await apiFetch("/customers", {
        method: "POST",
        body: {
          page: pageEffect,
          order: orderEffect,
          sort: sortEffect,
          search: searchEffect,
        },
      });
      if(response.items){
      setCustomers(ParseCustomer(response.items));
      setNbrPages(Math.ceil(response.count / 5));
      }else{
        setCustomers(null)
        setNbrPages(0)
      }
    }
  }, [searchParams]);
  const handleSearch= (e)=>{
    e.preventDefault()
 setSearchParams({"search":search})
  
  }
  return (
    <>
    <h1>Les Clients</h1>
    <div className="beetween"><form  onSubmit={handleSearch}><input onChange={(e)=>(setSearch(e.target.value))} value={search} placeholder={"recherche"}></input> <button><FcSearch/></button>         </form>  <button><Link to={'/customers/new'}>Nouveau client</Link></button></div>

      {customers ?  <Tab columns={columns} rows={customers}/> : <p>Aucun client ne correspond </p> }
      {page && <Paginate current={page} nbrPages={nbrPages} />}
    </>
  );
};
