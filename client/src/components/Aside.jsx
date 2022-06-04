import './Aside.css'
import { NavLink,useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
export const Aside = ({ isOpened }) => {
        const [admin,setAdmin]= useState(false)
        const location = useLocation();
        useEffect(() => {
                const urlWords = location.pathname.split('/')
                if (urlWords[1] === "admin") {
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
     <NavLink end to="/admin">Accueil</NavLink>
        </div>
  
        <div className="tab">
     <NavLink to="/admin/employes">Employes</NavLink>
        </div>
        <div className="tab">
        <NavLink to="/admin/appels">Appels</NavLink>
        </div>
    
    </div>
}

const AsideUser = ({isOpened}) => {
        return <div className={`${isOpened ? "opened" : ""} aside`}>
        <div className="tab">
     <NavLink to="/">Accueil</NavLink>
                </div>
        <div className="tab">
     <NavLink to="/profil">Mon profil</NavLink>
        </div>
        <div className="tab">
<NavLink to="/mes-appels">Mon journal d'appel</NavLink>
        </div>
        <div className="tab">
<NavLink to="/clients">Clients</NavLink>
        </div>
        <div className="tab">
<NavLink to="/requetes">Requetes</NavLink>
        </div>
    </div>
}