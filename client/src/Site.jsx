import './Site.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Calls } from './pages/Calls/Calls';
import { Customers } from './pages/Customers/Customers';
import { Reports } from './pages/Reports/Reports';
import { Requests } from './pages/Requests/Request';
import { LoginForm } from './LoginForm';



export const Site = ({user}) => {
    return <BrowserRouter>
          {user && <Sidebar user={user} />}
          <div className="container">
            <Navbar user={user} />
            <Routes>
              <Route
                path="/"
                element={user ? <Home/> : <Navigate to="/login" />}
              />
              <Route
                path="/calls"
                element={
                  user ? <Calls  /> : <Navigate to="/login" />
                }
              />

              <Route
                path="/Customers"
                element={user ? <Customers /> : <Navigate to="/login" />}
                />
                <Route
                path="/Reports"
                element={user ? <Reports /> : <Navigate to="/login" />}
                />
                <Route
                path="/Requests"
                element={user ? <Requests /> : <Navigate to="/login" />}
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
          {user && <OnlineUsers />}
        </BrowserRouter>
}