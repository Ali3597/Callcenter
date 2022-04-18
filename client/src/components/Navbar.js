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
          {isOpened ? <FaChevronLeft /> : <FaAlignJustify />}
        </div>
      )}
      Navbar
      {!user && (
        <>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
        </>
      )}
      {user && (
        <>
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
          {worker && <SwitchAvalaible user={worker} setUser={setWorker} />}

          {worker && worker.local.role == "admin" ? (
            <Link to="/admin">Admin</Link>
          ) : (
            ""
          )}
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
