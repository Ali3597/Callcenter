import './Navbar.css'
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";


export const Navbar = ({isOpened,setIsOpened}) => {
    return <div className="navbar">
        <div className="icon" onClick={() => setIsOpened(!isOpened)}>
    {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
        </div>
        Navbar


    </div>
}