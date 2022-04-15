import "./Requests.css";
import { ParseRequest } from "../../utils/ParseDatas";
import { FetchTab } from "../../components/FetchTab";

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
