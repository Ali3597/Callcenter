import './Aside.css'
import { NavLink } from "react-router-dom";
export const Aside = ({isOpened}) => {
    return <div className={`${isOpened ? "opened" : ""} aside`}>
        <div className="tab">
     <NavLink to="/">Home</NavLink>
        </div>
        <div className="tab">
<NavLink to="/Calls">Calls</NavLink>
        </div>
        <div className="tab">
<NavLink to="/customers">Customers</NavLink>
        </div>
        <div className="tab">
<NavLink to="/requests">Requests</NavLink>
        </div>
        <div className="tab">
<NavLink to="/reports">Reports</NavLink>
        </div>
    </div>
}