import "./Home.css";
import { ParseRequest } from "../../utils/ParseDatas";
import { FetchTab } from "../../components/FetchTab";


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

export const Home = () => {
 
  return (
    <>
      <h1>Les Requetes en alerte</h1>
      <FetchTab linkFetch={"/requests/alert"} columns={columns} linkNew={null} titleNew={null} parser={ ParseRequest}/>
    </>
  );
};
