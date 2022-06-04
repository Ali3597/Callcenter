import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Login } from "./Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Calls } from "./pages/Calls/Calls";
import { Customer } from "./pages/Customers/Customer";
import { Customers } from "./pages/Customers/Customers";
import { Requests } from "./pages/Requests/Requests";
import { Aside } from "./components/Aside";
import { Request } from "./pages/Requests/Request";

import { useAuthContext } from "./hooks/useAuthContext";
import { NewRequest } from "./pages/Requests/NewRequest";
import { NewCustomer } from "./pages/Customers/NewCustomer";
import { Profile } from "./pages/Workers/Profile";
import { Call } from "./components/Call";
import { Admin } from "./pages/admin/Admin";
import { WorkersAdmin } from "./pages/admin/Workers/WorkersAdmin";
import { CallsAdmin } from "./pages/admin/Calls/CallsAdmin";
import { NewWorker } from "./pages/admin/Workers/NewWorker";
import { WorkerAdmin } from "./pages/admin/Workers/WorkerAdmin";

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [numberCaller, setNumberCaller] = useState(null);
  const [customerCaller, setCustomerCaller] = useState(null);
  const { user, authIsReady, admin } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar
            isOpened={isOpened}
            setIsOpened={setIsOpened}
            user={user}
            admin={admin}
            inCall={inCall}
          />
          <div className="container">
            {user && <Aside isOpened={isOpened} />}
            <div className="main">
              <Routes>
                <Route
                  path="/"
                  element={user ? <Home /> : <Navigate to="/connexion" />}
                />
                <Route
                  path="/mes-appels"
                  element={user ? <Calls /> : <Navigate to="/connexion" />}
                />
                <Route
                  path="/clients/:id"
                  element={user ? <Customer /> : <Navigate to="/connexion" />}
                />
                <Route
                  path="/clients"
                  element={user ? <Customers /> : <Navigate to="/connexion" />}
                />
                <Route
                  path="/clients/nouveau"
                  element={
                    user ? (
                      <NewCustomer
                        numberCaller={numberCaller}
                        setCustomerCaller={setCustomerCaller}
                        inCall={inCall}
                      />
                    ) : (
                      <Navigate to="/connexion" />
                    )
                  }
                />
                <Route
                  path="/requetes/:id"
                  element={user ? <Request /> : <Navigate to="/connexion" />}
                />
                <Route
                  path="/requetes"
                  element={user ? <Requests /> : <Navigate to="/connexion" />}
                />
                <Route
                  path="/requetes/nouveau"
                  element={user ? <NewRequest /> : <Navigate to="/connexion" />}
                />

                <Route
                  path="/profil"
                  element={
                    user ? (
                      <Profile user={user} />
                    ) : (
                      <Navigate to="/connexion" />
                    )
                  }
                />
                <Route
                  path="/admin"
                  element={admin ? <Admin /> : <Navigate to="/connexion" />}
                />
                <Route
                  path="/admin/employes"
                  element={
                    admin ? <WorkersAdmin /> : <Navigate to="/connexion" />
                  }
                />
                <Route
                  path="/admin/employes/nouveau"
                  element={admin ? <NewWorker /> : <Navigate to="/connexion" />}
                />
                <Route
                  path="/admin/employes/:id"
                  element={
                    admin ? (
                      <WorkerAdmin user={user} />
                    ) : (
                      <Navigate to="/connexion" />
                    )
                  }
                />
                <Route
                  path="/admin/appels"
                  element={
                    admin ? <CallsAdmin /> : <Navigate to="/connexion" />
                  }
                />

                <Route
                  path="/connexion"
                  element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            {user && (
              <Call
                numberCaller={numberCaller}
                setNumberCaller={setNumberCaller}
                customerCaller={customerCaller}
                setCustomerCaller={setCustomerCaller}
                inCall={inCall}
                setInCall={setInCall}
              />
            )}
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
