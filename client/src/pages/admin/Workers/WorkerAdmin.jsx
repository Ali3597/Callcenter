import "./WorkerAdmin.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "../../../components/Card";
import { apiFetch } from "../../../utils/api";
import { FetchTab } from "../../../components/FetchTab";
import { ParseRequest } from "../../../utils/ParseDatas";
import { Modal } from "../../../components/Modal";
import { useToggle } from "../../../hooks";



const columns = [
  ["typeof", true,"Type"],
  ["author", true,"Auteur"],
  ["customer", true,"Client"],
  ["message", false,"Message"],
  ["done", true,"Valider"],
  ["deadline", true,"Deadline"],
  ["date", true,"Date"],
  ["urgencyLevel", true,"Niveau d'urgence"],
  ["action", false,"Action"],
];


export const WorkerAdmin = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [worker, setWorker] = useState(null)
  const [deleting, toggleDeleting] = useToggle(false);
  useEffect(async () => {
    if (id) {
      const response = await apiFetch("/workers/" + id);
      if (!response) {
        navigate("/admin/workers");
      }
      setWorker(response);
    }
  }, [id]);
  
  
  const handleDelete = async() => {
    try {
      await apiFetch("/workers/delete/" + id, { method: "DELETE" });
      navigate("/admin/workers");
    } catch (error) {}
  }
  
  const handleClick =async() => {
    try {
      if (worker.local.role == "admin") {
        await apiFetch("/workers/passbasic/" + id, { method: "Post" });
        setWorker({ ...worker, local: { ...worker.local, role:"basic" } })
      } else {
        await apiFetch("/workers/passadmin/" + id, { method: "Post" });
        setWorker({ ...worker, local: { ...worker.local, role:"admin" } })
      }
    } catch (error) {
      
    }
  }
  
  return worker ? (
    <>
       
   
      <Card photoURL={worker.avatar} name={worker.username} email={worker.local.email} number={worker.number} /> <h4>{worker.local.role}</h4>
      {worker._id !== user._id ? < div className="worker-buttons">
      <button onClick={toggleDeleting}>Supprimer</button>

      <button onClick={handleClick}>
        {worker.local.role == "admin" ? "Enlevez les droits d'adminitrateur" : "Donnez les droits d'administrateur"} 
      </button>
    </div>:""}
      <h1>Ses dernieres requetes</h1>
      <FetchTab columns={columns} linkFetch={"/requests/worker/" + worker._id} parser={ParseRequest} />
      {deleting && (
        <Modal
          onClose={toggleDeleting}
          title={"aaaaaaaaaa"}
          message={
            "Etes vous sure de votre choix , cet utilisateur sera supprimé a jamais ?"
          }
          onClick={handleDelete}
          buttonMessage={"Supprimer"}
        />
      )}
    </>
  ):"";
};
