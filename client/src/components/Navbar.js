import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa";
import { useLogout } from "../hooks/useLogout";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";

export const Navbar = ({ isOpened, setIsOpened, user }) => {
  const { logout, isPending } = useLogout();
  const [worker, setWorker] = useState(null);
  useEffect(() => {
    setWorker(user);
  }, []);
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

      {!user && (
        <>
          <Link to="/connexion">Connexion</Link>
        </>
      )}
      {user && (
        <>
          {worker && <SwitchAvalaible user={worker} setUser={setWorker} />}
          <div className="end-navbar">
            {worker && worker.local.role == "admin" ? (
              <Link to="/admin">Administration</Link>
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

const SwitchAvalaible = ({ user, setUser }) => {
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
      <span className="slider round"></span>
    </label>
  );
};
