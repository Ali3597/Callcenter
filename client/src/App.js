import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { LoginForm } from "./LoginForm";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Calls } from "./pages/Calls/Calls";
import { Customers } from "./pages/Customers/Customers";
import { Reports } from "./pages/Reports/Reports";
import { Requests } from "./pages/Requests/Request";
import { Aside } from "./components/Aside";

function App() {
  const [user, setUser] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  if (user == null) {
    return null;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isOpened={isOpened} setIsOpened={setIsOpened} />
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
                path="/customers"
                element={user ? <Customers /> : <Navigate to="/login" />}
              />
              <Route
                path="/requests"
                element={user ? <Requests /> : <Navigate to="/login" />}
              />
              <Route
                path="/reports"
                element={user ? <Reports /> : <Navigate to="/login" />}
              />

              <Route
                path="/login"
                element={user ? <Navigate to="/" /> : <LoginForm />}
              />

              <Route
                path="/signup"
                element={user ? <Navigate to="/" /> : <LoginForm />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
