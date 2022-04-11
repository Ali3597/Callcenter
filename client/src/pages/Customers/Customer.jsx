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
import { InputFile } from "../../components/inputFile";


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
  const [avatar,setAvatar] = useState(null);
  const { id } = useParams();
  const [requestsParsed, setRequestsParsed] = useState(null);
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
  if (response.items){
      setRequestsParsed(ParseRequest(response.items));
      setNbrPages(Math.ceil(response.count / 5));
  }else{
    setRequestsParsed(null);
      setNbrPages(0);
  }
    }
  }, [searchParams]);

  useEffect(()=>{
    console.log("usefecctavatar")
    if(avatar){
      console.log("usefecctavatardedans")
      console.log(avatar)
      setCustomer({...customer,avatar:avatar})
    }
  },[avatar])

  return (
    <div className="customer">
      <h1>Page client</h1>
      {customer && <Card input={<InputFile setFile={setAvatar} link={'/customers/avatar/'+customer._id} />} photoURL={customer.avatar } name={customer.name} email={customer.email} number={customer.number} />}
      <h1>Ses Requetes</h1>
      <button><Link to={'/requests/new?customer='+id}>Lui créer une nouvelle requete</Link></button>
      {requestsParsed  && <Tab columns={columns} rows={requestsParsed} />}
      {!requestsParsed && <p>Ce client n'aspour l'instant aucune requetes</p>}
      {page && <Paginate current={page} nbrPages={nbrPages} />}
    </div>
  );
};
