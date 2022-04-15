import './Navbar.css'
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa";
import { useLogout } from '../hooks/useLogout';





export const Navbar = ({ isOpened, setIsOpened, user }) => {
    const { logout, isPending } = useLogout();
    return <div className="navbar">
        {user && <div className="icon" onClick={() => setIsOpened(!isOpened)}>
            {isOpened ? <FaChevronLeft /> : <FaAlignJustify />}
        </div>
        }
        Navbar
        {!user &&  <>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/signup">signup</Link>
            </li>
          </>
        }

       {user && (<>
          <li>
            {!isPending && (
              <button onClick={logout} className="btn">
                Logout
              </button>
            )}

            {isPending && (
              <button disabled className="btn">
                Logout...
              </button>
            )}
          </li>
           <li>
           <Link to="/profile">Profile</Link>
         </li>
         </>
        )}
    </div>
}