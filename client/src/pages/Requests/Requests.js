import "./Requests.css";
import { ParseRequest } from "../../utils/ParseDatas";
import { FetchTab } from "../../components/FetchTab";

const columns = [
  ["typeof", true, "Type"],
  ["author", true, "Auteur"],
  ["customer", true, "Client"],
  ["message", false, "Message"],
  ["done", true, "Valider"],
  ["deadline", true, "Deadline"],
  ["date", true, "Date"],
  ["urgencyLevel", true, "Niveau d'urgence"],
  ["action", false, "Action"],
];

export const Requests = () => {
  return (
    <>
      <h1>Requetes</h1>
      <FetchTab
        columns={columns}
        parser={ParseRequest}
        linkFetch={"/requests"}
        linkNew={"/requests/new"}
        titleNew={"Ajoutez une nouvelle requete"}
      />
    </>
  );
};
