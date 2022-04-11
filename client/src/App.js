import { useState, useEffect } from "react";
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
import { Worker } from "./pages/Workers/Worker";
import { apiFetch } from "./utils/api";
import { useAuthContext } from "./hooks/useAuthContext";
import { NewRequest } from "./pages/Requests/NewRequest";
import { NewCustomer } from "./pages/Customers/NewCustomer";

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar isOpened={isOpened} setIsOpened={setIsOpened} user={user} />
          <div className="container">
            {user && <Aside isOpened={isOpened} />}
            <div className="main">
              <Routes>
                <Route
                  path="/"
                  element={user ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                  path="/calls"
                  element={user ? <Calls /> : <Navigate to="/login" />}
                />
                <Route
                  path="/customers/:id"
                  element={user ? <Customer /> : <Navigate to="/login" />}
                />
                <Route
                  path="/customers"
                  element={user ? <Customers /> : <Navigate to="/login" />}
                />
                 <Route
                  path="/customers/new"
                  element={user ? <NewCustomer /> : <Navigate to="/login" />}
                />
                <Route
                  path="/requests/:id"
                  element={user ? <Request /> : <Navigate to="/login" />}
                />
                <Route
                  path="/requests"
                  element={user ? <Requests /> : <Navigate to="/login" />}
                />
                <Route
                  path="/requests/new" element={user ? <NewRequest /> : <Navigate to="/login" />}
                />
                <Route
                  path="/worker/:id"
                  element={user ? <Worker /> : <Navigate to="/login" />}
                />

                <Route
                  path="/login"
                  element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                  path="/signup"
                  element={user ? <Navigate to="/" /> : <Login />}
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
