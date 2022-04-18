import "./WorkerAdmin.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "../../../components/Card";
import { apiFetch } from "../../../utils/api";
import { FetchTab } from "../../../components/FetchTab";
import { ParseRequest } from "../../../utils/ParseDatas";



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


export const WorkerAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [worker,setWorker]= useState(null)
    useEffect(async () => {
    if (id) {
      const response = await apiFetch("/workers/" + id);
      if ( !response) {
        navigate("/admin/workers");
      }
      setWorker(response);
    }
  }, [id]);
  return (
    <>
       
   
      {worker && <Card photoURL={worker.avatar} name={worker.username} email={worker.email} number={worker.number} />}
          <h1>Ses dernieres requetes</h1>
      {worker && <FetchTab columns={columns} linkFetch={"/requests/worker/" + worker._id} parser={ParseRequest} />}
      
    </>
  );
};
