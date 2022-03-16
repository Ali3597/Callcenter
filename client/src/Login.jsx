import { useState } from "react";
import { Loader } from "./components/Loader";
import "./Login.css";
import { useLogin } from "./hooks/useLogin";



export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();
  const handleSubmit = function (e) {
    e.preventDefault()
    login(email,password)
  }
  
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <button className="btn" >{isPending && <Loader />} {!isPending && " Login"} </button>

      {error && <p> {error}</p>}
      
    </form>
  );
}
