import './Calls.css'

import { ParseCall } from '../../utils/ParseDatas';
import { FetchTab } from '../../components/FetchTab';




const columns = [
  ["time", true],
  ["state", true],
  ["customer", true],
  ["number", true],
  ["date", true],
];


export const Calls = () => {
  
  


    return <>
    <h1>Mon journal d'appel</h1>
      <FetchTab columns={columns} linkFetch={"/calls/me"} linkNew={null} titleNew={null} parser={ParseCall}/>
    </>
}