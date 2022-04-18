import './Aside.css'
import { NavLink,useLocation, } from "react-router-dom";
import { useEffect, useState } from 'react';
export const Aside = ({ isOpened }) => {
        const [admin,setAdmin]= useState(false)
        const location = useLocation();
        useEffect(() => {
                const urlWords = location.pathname.split('/')
                if (urlWords[1] == "admin") {
                        setAdmin(true)
                } else {
                        setAdmin(false)
                }
        },[location.pathname])

        return (<>
                { admin ? <AsideAdmin  isOpened={isOpened}  />:<AsideUser isOpened={isOpened} />}
                
        </>)
    
}


const AsideAdmin = ({isOpened}) => {
        return <div className={`${isOpened ? "opened" : ""} aside`}>
  
        <div className="tab">
     <NavLink to="/admin/workers">Worker</NavLink>
        </div>
        <div className="tab">
        <NavLink to="/admin/calls">Calls</NavLink>
        </div>
    
    </div>
}

const AsideUser = ({isOpened}) => {
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
    </div>
}