import { useParams } from "react-router";
import "./Customer.css";
import { useEffect, useState } from "react";
import { ParseRequest } from "../../utils/ParseDatas";
import { Card } from "../../components/Card";
import { apiFetch } from "../../utils/api";
import { InputFile } from "../../components/inputFile";
import { FetchTab } from "../../components/FetchTab";


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
  const [avatar,setAvatar] = useState(null);
  const { id } = useParams();

  useEffect(async ()=>{
    const response = await apiFetch("/customers/"+id)
    setCustomer(response)
  },[])


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
      {customer && <Card input={<InputFile setFile={setAvatar} link={'/customers/avatar/'+id} />} photoURL={customer.avatar } name={customer.name} email={customer.email} number={customer.number} />}
      <h1>Ses Requetes</h1>
    <FetchTab linkFetch={"/requests/customer/"+id} linkNew={'/requests/new?customer='+id} columns={columns} parser={ParseRequest} titleNew={"Lui rajoutez une nouvelle reuqete"} />
    </div>
  );
};
