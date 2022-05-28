import './Calls.css'

import { ParseCall } from '../../utils/ParseDatas';
import { FetchTab } from '../../components/FetchTab';




const columns = [
  ["time", true,"Temps"],
  ["state", true,"Etat"],
  ["customer", true,"Email"],
  ["number", true,"Numero"],
  ["date", true,"Date"],
];


export const Calls = () => {
  
  


    return <>
    <h1>Mon journal d'appel</h1>
      <FetchTab columns={columns} linkFetch={"/calls/me"} linkNew={null} titleNew={null} parser={ParseCall}/>
    </>
}