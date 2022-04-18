import "./NewWorker.css";
import { Field } from "../../../components/Field";
import { useState } from "react";
import { apiFetch, ApiErrors } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export const NewWorker = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [number, setNumber] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const errorFor = function (field) {
    const error = errors.find((e) => e.field == field);
    if (error) {
      return error.message;
    } else {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (password != confirmPassword) {
      setErrors([
        ...errors,
        {
          field: "confirmPassword",
          message: "Les deux mot de passes ne correspondent pas",
        },
      ]);
    } else {
      try {
        console.log("onnn est la mexc");
        const response = await apiFetch("/workers/signup", {
          method: "POST",
          body: { username, email, number, password },
        });
        navigate("/admin/workers/" + response._id);
      } catch (e) {
        if (e instanceof ApiErrors) {
          setErrors(e.errors);
        } else {
          throw e;
        }
      }
    }
  };

  return (
    <div className="form-request">
      <h1>Nouveau employé </h1>

      <form onSubmit={handleSubmit}>
        <Field
          name={"email"}
          error={errorFor("email")}
          placeholder={"Email"}
          value={email}
          setValue={setEmail}
        />
        <Field
          name={"username"}
          error={errorFor("username")}
          placeholder={"Nom"}
          value={username}
          setValue={setUsername}
        />
        <Field
          name={"number"}
          error={errorFor("number")}
          placeholder={"Numero"}
          value={number}
          setValue={setNumber}
        />
        <Field
          name={"password"}
          type={"password"}
          error={errorFor("password")}
          placeholder={"Mot de passe"}
          value={password}
          setValue={setPassword}
        />
        <Field
          name={"confirmPassword"}
          type={"password"}
          error={errorFor("confirmPassword")}
          placeholder={"Confirmez le mot de passe"}
          value={confirmPassword}
          setValue={setConfirmPassword}
        />

        <button>Valider le nouvel employé </button>
      </form>
    </div>
  );
};
