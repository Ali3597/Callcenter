import './Card.css'
import { FaMailBulk } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import Avatar from "../assets/avatar.png"

export const Card = ({photoURL,name,email,number,input= null}) => {

    return <div className="card">
        {input && input}
        <img src={photoURL? "http://localhost:4000\\"+photoURL : Avatar} alt="" />
        <p>{name}</p>
        <p> <FaMailBulk /><span>{email}</span></p>
         <p> <FaPhoneAlt  /> <span>{number}</span></p>
    </div>
}


