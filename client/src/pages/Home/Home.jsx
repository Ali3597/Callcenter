import "./Home.css";
import { ParseRequest } from "../../utils/ParseDatas";
import { useEffect, useState } from "react";
import { Tab } from "../../components/Tab";
import { apiFetch } from "../../utils/api";
import { Link } from "react-router-dom";
import { Paginate } from "../../components/Paginate";
import { useSearchParams } from "react-router-dom";
import { FcSearch } from "react-icons/fc";



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

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [requestsParsed, setRequestsParsed] = useState(null);
  const [search, setSearch] = useState('');
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
      setSearch(searchEffect? searchEffect : "");
      const response = await apiFetch("/requests/alert", {
        method: "POST",
        body: {
          page: pageEffect,
          order: orderEffect,
          sort: sortEffect,
          search: searchEffect,
        },
      });
      console.log(response.items);
      if(response.items){
      setRequestsParsed(ParseRequest(response.items));
      setNbrPages(Math.ceil(response.count / 5));
      }else{
setRequestsParsed(null)
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
      <h1>Les Requetes en alerte</h1>
      <div className="beetween"><form  onSubmit={handleSearch}><input onChange={(e)=>(setSearch(e.target.value))} value={search} placeholder={"recerche"}></input> <button><FcSearch/></button>         </form>  <button><Link to={'/requests/new'}>Nouvelle requete</Link></button></div>
    
      {requestsParsed ?  <Tab columns={columns} rows={requestsParsed} /> : <p>Aucune requete ne correspond</p>}
      {page && <Paginate current={page} nbrPages={nbrPages} />}
    </>
  );
};
