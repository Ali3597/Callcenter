import { useState } from "react";
import { Loader } from "./components/Loader";
import "./Login.css";
import { useLogin } from "./hooks/useLogin";
import homepage from "./assets/homepage.avif";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();
  const handleSubmit = function (e) {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="log" style={{ backgroundImage: `url(${homepage})` }}>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <label>
          <span>Email :</span>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Mot de passe:</span>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {error && <p className="error"> {error}</p>}
        <button>
          {isPending && <Loader />} {!isPending && " Connexion"}{" "}
        </button>
      </form>
    </div>
  );
}
