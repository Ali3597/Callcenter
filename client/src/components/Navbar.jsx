import './Navbar.css'

import { FaChevronLeft } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa";




export const Navbar = ({isOpened,setIsOpened}) => {
    return <div className="navbar">
        <div className="icon" onClick={() => setIsOpened(!isOpened)}>
    {isOpened ? <FaChevronLeft /> : <FaAlignJustify />}
        </div>
        Navbar
    </div>
}