import './CustomerCard.css'
import { FaMailBulk } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

export const CustomerCard = ({customer}) => {
    return <div className="customer-card">
        <h1>Client:</h1>
        <img src={customer.url} alt="" />
        <p>{customer.name}</p>
        <p> <FaMailBulk /><span>{customer.email}</span></p>
         <p> <FaPhoneAlt  /> <span>{customer.number}</span></p>
    </div>
}
