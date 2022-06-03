import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa";
import { useLogout } from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { useLocation } from "react-router-dom";

export const Navbar = ({ isOpened, setIsOpened, user, admin, inCall }) => {
  const { logout, isPending } = useLogout();
  const [isInAdmin, setIsInAdmin] = useState(false);
  const [worker, setWorker] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const urlWords = location.pathname.split("/");
    if (urlWords[1] == "admin") {
      setIsInAdmin(true);
    } else {
      setIsInAdmin(false);
    }
  }, [location.pathname]);
  useEffect(() => {
    setWorker(user);
  }, [user]);

  return (
    <div className="navbar">
      {user && (
        <div className="icon" onClick={() => setIsOpened(!isOpened)}>
          {isOpened ? (
            <FaChevronLeft size={30} color={"white"} />
          ) : (
            <FaAlignJustify size={30} color={"white"} />
          )}
        </div>
      )}

      {user && (
        <>
          {worker && (
            <SwitchAvalaible
              user={worker}
              setUser={setWorker}
              inCall={inCall}
            />
          )}
          <div className="end-navbar">
            {worker && admin && !isInAdmin ? (
              <Link to="/admin">Panel administrateur</Link>
            ) : (
              ""
            )}
            {worker && admin && isInAdmin ? (
              <Link to="/">Panel utilisateur</Link>
            ) : (
              ""
            )}

            {!isPending && (
              <button onClick={logout} className="btn">
                Deconnexion
              </button>
            )}

            {isPending && (
              <button disabled className="btn">
                Deconnexion...
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const SwitchAvalaible = ({ user, setUser, inCall }) => {
  const [stateChecked, setStateChecked] = useState(false);
  const handleChange = async (e) => {
    const available = await apiFetch("/workers/toggleState", {
      method: "POST",
    });
    setUser({ ...user, state: available.state });
  };
  useEffect(() => {
    if (user.state == "available") {
      setStateChecked(true);
    } else if (user.state == "unavailable") {
      setStateChecked(false);
    }
  }, [user]);
  return (
    <label className="switch">
      <input type="checkbox" checked={stateChecked} onChange={handleChange} />
      <span
        className={
          inCall ? "slider round occupied " : "slider round not-occupied "
        }
      ></span>
    </label>
  );
};
