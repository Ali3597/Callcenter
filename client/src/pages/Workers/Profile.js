import "./Profile.css";
import { Card } from "../../components/Card";
import { InputFile } from "../../components/inputFile";
import { Field } from "../../components/Field";
import { useEffect, useState } from "react";
import { ApiErrors, apiFetch } from "../../utils/api";
import { ParseRequest } from "../../utils/ParseDatas";
import { FetchTab } from "../../components/FetchTab";

const columns = [
  ["typeof", true, "Type"],
  ["author", true, "Auteur"],
  ["customer", true, "Client"],
  ["done", true, "Valider"],
  ["deadline", true, "Deadline"],
  ["date", true, "Date"],
  ["urgencyLevel", true, "Niveau d'urgence"],
  ["action", false, "Action"],
];

export const Profile = ({ user }) => {
  const [avatar, setAvatar] = useState(null);
  const [successPassword, setSuccessPassword] = useState(false);
  const [successInfos, setSuccessInfo] = useState(false);
  const [errors, setErrors] = useState([]);
  const [worker, setWorker] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const errorFor = function (field) {
    const error = errors.find((e) => e.field == field);
    if (error) {
      return error.message;
    } else {
      return null;
    }
  };
  useEffect(() => {
    if (user) {
      setWorker(user);
      setEmail(user.local.email);
      setUsername(user.username);
    }
  }, [user]);
  useEffect(() => {
    if (avatar) {
      setWorker({ ...worker, avatar });
    }
  }, [avatar]);
  const handleSubmit = async (e) => {
    console.log(worker);
    setErrors([]);
    setSuccessInfo(false);
    setSuccessPassword(false);
    e.preventDefault();
    try {
      await apiFetch("/workers/update", {
        method: "POST",
        body: { email, username },
      });
      setWorker({ ...worker, username, local: { ...worker.local, email } });
      setSuccessInfo(true);
    } catch (e) {
      if (e instanceof ApiErrors) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    }
    console.log(email, username);
  };
  const handleSubmitPassword = async (e) => {
    setErrors([]);
    setSuccessInfo(false);
    setSuccessPassword(false);
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors([
        ...errors,
        {
          field: "confirmPassword",
          message: "Les deux mot de passes ne correspondent pas",
        },
      ]);
    } else {
      try {
        await apiFetch("/workers/updatePassword", {
          method: "POST",
          body: { password },
        });

        setSuccessPassword(true);
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
    <div className="worker">
      {worker && (
        <Card
          photoURL={worker.avatar}
          name={worker.username}
          email={worker.local.email}
          number={user.number}
          input={<InputFile setFile={setAvatar} link={"/workers/avatar"} />}
        />
      )}
      <div className="form-profile">
        <form onSubmit={handleSubmit}>
          <h1>Modifier vos informations</h1>
          <Field
            name={"email"}
            error={errorFor("email")}
            value={email}
            setValue={setEmail}
          >
            {" "}
            Email{" "}
          </Field>
          <Field
            name={"username"}
            error={errorFor("username")}
            value={username}
            setValue={setUsername}
          >
            {" "}
            Username{" "}
          </Field>
          {successInfos && <p>Informations Modifié ! </p>}
          <button>Modifier</button>
        </form>
        <form onSubmit={handleSubmitPassword}>
          <h1>Modifiez votre mot de passe</h1>
          <Field
            type={"password"}
            name={"password"}
            error={errorFor("password")}
            value={password}
            setValue={setPassword}
          >
            {" "}
            Mot de passe{" "}
          </Field>
          <Field
            type={"password"}
            name={"confirmPassword"}
            error={errorFor("confirmPassword")}
            value={confirmPassword}
            setValue={setConfirmPassword}
          >
            Confirmez le mot de passe{" "}
          </Field>
          {successPassword && <p> Mot de passe modifié </p>}
          <button>Modifier</button>
        </form>
      </div>
      <h1>Mes dernieres requetes</h1>
      <FetchTab
        linkFetch={"/requests/worker/" + user._id}
        linkNew={"/requests/new"}
        titleNew={"Ajoutez une nouvelle requete"}
        parser={ParseRequest}
        columns={columns}
        sizeTab={475}
        placeholder={"Rechercher par email de client"}
      />
    </div>
  );
};
