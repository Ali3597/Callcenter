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
                  path="/requests/new"
                  element={user ? <NewRequest /> : <Navigate to="/login" />}
                />

                <Route
                  path="/profile"
                  element={
                    user ? <Profile user={user} /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/admin"
                  element={
                    user.local.role == "admin" ? (
                      <Admin />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/admin/workers"
                  element={
                    user.local.role == "admin" ? (
                      <WorkersAdmin />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/admin/workers/new"
                  element={
                    user.local.role == "admin" ? (
                      <NewWorker />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/admin/workers/:id"
                  element={
                    user.local.role == "admin" ? (
                      <WorkerAdmin />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/admin/calls"
                  element={
                    user.local.role == "admin" ? (
                      <CallsAdmin />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
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
            {user && <Call />}
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
