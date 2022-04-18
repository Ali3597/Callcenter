import { FetchTab } from "../../../components/FetchTab";
import { ParseCall } from "../../../utils/ParseDatas";
import "./Call.css";



const columns = [
  ["time", true],
  ["state", true],
  ["customer", true],
  ["number", true],
  ["date", true],
];


export const CallsAdmin = () => {
 
  return (
    <>
      <h1>Tous les appels</h1>
 <FetchTab columns={columns} linkFetch={"/calls"} linkNew={null} titleNew={null} parser={ParseCall}/>
    </>
  );
};
