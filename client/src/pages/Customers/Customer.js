import { useParams } from "react-router";
import "./Customer.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParseRequest } from "../../utils/ParseDatas";
import { Card } from "../../components/Card";
import { apiFetch } from "../../utils/api";
import { InputFile } from "../../components/inputFile";
import { FetchTab } from "../../components/FetchTab";

const columns = [
  ["typeof", true, "Type"],
  ["author", true, "Auteur"],

  ["done", true, "Valider"],
  ["deadline", true, "Deadline"],
  ["date", true, "Date"],
  ["urgencyLevel", true, "Niveau d'urgence"],
  ["action", false, "Action"],
];

export const Customer = () => {
  const [customer, setCustomer] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiFetch("/customers/" + id);
      if (response) {
        setCustomer(response);
      } else {
        navigate("/clients");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (avatar) {
      setCustomer({ ...customer, avatar: avatar });
    }
  }, [avatar]);

  return (
    <div className="customer">
      <h1>Page client</h1>
      {customer && (
        <Card
          input={
            <InputFile setFile={setAvatar} link={"/customers/avatar/" + id} />
          }
          photoURL={customer.avatar}
          name={customer.name}
          email={customer.email}
          number={customer.number}
        />
      )}
      <h1>Ses Requetes</h1>
      <FetchTab
        sizeTab={475}
        linkFetch={"/requests/customer/" + id}
        linkNew={"/requetes/nouveau?customer=" + id}
        columns={columns}
        parser={ParseRequest}
        titleNew={"Lui rajoutez une nouvelle reuqete"}
      />
    </div>
  );
};
