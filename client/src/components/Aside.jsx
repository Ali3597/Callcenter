import './Aside.css'
import { Link } from "react-router-dom";
export const Aside = ({isOpened}) => {
    return <div className={`${isOpened ? "opened" : ""} aside`}>
        <div className="tab">
     <Link to="/">Home</Link>
        </div>
        <div className="tab">
<Link to="/Calls">Calls</Link>
        </div>
        <div className="tab">
<Link to="/customers">Customers</Link>
        </div>
        <div className="tab">
<Link to="/requests">Requests</Link>
        </div>
        <div className="tab">
<Link to="/reports">Reports</Link>
        </div>
    </div>
}