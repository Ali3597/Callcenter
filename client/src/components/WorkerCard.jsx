import './WorkerCard.css'
import { FaMailBulk } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

export const WorkerCard = ({worker}) => {
    return <div className="worker-card">
        <h1>Employé :</h1>
        <img src={worker.avatar} alt="" />
        <p>{worker.username}</p>
        <p> <FaMailBulk /><span>{worker.email}</span></p>
         <p> <FaPhoneAlt  /> <span>{worker.number}</span></p>
    </div>
}
