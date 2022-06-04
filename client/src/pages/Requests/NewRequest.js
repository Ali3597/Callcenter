import { useEffect, useState } from "react";
import { Field } from "../../components/Field";

import { ApiErrors, apiFetch } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useSearchParams } from "react-router-dom";
import "./NewRequest.css";

const allUrgencyLevel = [
  { value: null, label: "Choisissez un niveau d'urgence" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

const allTypeOf = [
  { value: null, label: "Choissez un type de requête" },
  { value: "Call", label: "Call" },
  { value: "Email", label: "Email" },
  { value: "Other", label: "Other" },
];
export const NewRequest = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [errors, setErrors] = useState([]);
  const [customers, SetCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("");
  const [customer, setCustomer] = useState(null);
  const [typeOf, setTypeOf] = useState("");

  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();
  useEffect(async () => {
    const customerEffect = searchParams.get("customer");

    const response = await apiFetch("/customers", {
      method: "POST",
    });
    const arrayCustomers = response.items.map((item) => {
      return { value: item._id, label: item.name };
    });
    arrayCustomers.unshift({ value: null, label: "Veuillez chosir un client" });

    const deff = arrayCustomers.find(
      (option) => option.value === customerEffect
    );

    setCustomer(deff ? deff : arrayCustomers[0]);
    SetCustomers(arrayCustomers);
  }, []);
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
    try {
      const response = await apiFetch("/requests/new", {
        method: "POST",
        body: { message, urgencyLevel, typeof: typeOf, deadline, customer },
      });
      navigate("/requetes/" + response._id);
    } catch (e) {
      if (e instanceof ApiErrors) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    }
  };
  useEffect(() => {
    if (customer) {
      console.log(customer, "mon cusss");
    }
  }, [customer]);
  return (
    <div className="form-request">
      <h1>Ma nouvelle requete</h1>
      <form onSubmit={handleSubmit}>
        <Field
          type="textarea"
          name={"message"}
          error={errorFor("message")}
          placeholder={"Message"}
          value={message}
          setValue={setMessage}
        />
        {customers && (
          <Select
            options={customers}
            value={customer}
            onChange={setCustomer}
            defaultValue={customer}
          />
        )}
        <Field
          name={"deadline"}
          error={errorFor("deadline")}
          type={"datetime-local"}
          value={deadline}
          setValue={setDeadline}
        >
          {" "}
          Deadline :{" "}
        </Field>

        <Select
          label={"Type de requete"}
          options={allTypeOf}
          onChange={setTypeOf}
          defaultValue={allTypeOf[0]}
        />
        <Select
          defaultValue={allUrgencyLevel[0]}
          options={allUrgencyLevel}
          onChange={setUrgencyLevel}
        />
        <button>Valider la requette</button>
      </form>
    </div>
  );
};
