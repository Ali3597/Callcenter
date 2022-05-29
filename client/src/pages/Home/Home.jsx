import "./Home.css";
import { ParseRequest } from "../../utils/ParseDatas";
import { FetchTab } from "../../components/FetchTab";


const columns = [
  ["typeof", true,"Type"],
  ["author", true,"Auteur"],
  ["customer", true,"Client"],
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
      <FetchTab sizeTab={475} linkFetch={"/requests/alert"} columns={columns} linkNew={null} titleNew={null} parser={ParseRequest} placeholder={"Rechercher par email de client"}/>
    </>
  );
};
