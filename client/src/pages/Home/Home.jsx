import "./Home.css";
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

export const Home = () => {
 
  return (
    <>
      <h1>Les Requetes en alerte</h1>
      <FetchTab linkFetch={"/requests/alert"} columns={columns} linkNew={null} titleNew={null} parser={ ParseRequest}/>
    </>
  );
};
