import { FetchTab } from "../../../components/FetchTab";
import { ParseCall } from "../../../utils/ParseDatas";
import "./Call.css";



const columns = [
  ["time", true,"Temps"],
  ["state", true,"Etat"],
  ["customer", true,"Email"],
  ["number", true,"Numero"],
  ["date", true,"Date"],
];


export const CallsAdmin = () => {
 
  return (
    <>
      <h1>Tous les appels</h1>
 <FetchTab sizeTab={350} placeholder={"Recherchez par email du client"} columns={columns} linkFetch={"/calls"} linkNew={null} titleNew={null} parser={ParseCall}/>
    </>
  );
};
