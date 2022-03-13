import './Card.css'
import { FaMailBulk } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

export const Card = ({photoURL,name,email,number}) => {
    return <div className="card">
        
        <img src={photoURL} alt="" />
        <p>{name}</p>
        <p> <FaMailBulk /><span>{email}</span></p>
         <p> <FaPhoneAlt  /> <span>{number}</span></p>
    </div>
}
