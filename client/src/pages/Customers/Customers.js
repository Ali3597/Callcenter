import "./Customers.css";
import { ParseCustomer } from "../../utils/ParseDatas";
import { FetchTab } from "../../components/FetchTab";

const columns = [
  ["name", true, "Nom"],
  ["email", true, "Email"],
  ["number", true, "Numero"],
  ["action", false, "Action"],
];

export const Customers = () => {
  return (
    <>
      <h1>Les Clients</h1>
      <FetchTab
        linkFetch={"/customers"}
        linkNew={"/clients/new"}
        titleNew={"Ajoutez un nouvau client "}
        columns={columns}
        parser={ParseCustomer}
        placeholder={"Rechercher par l'email du client"}
        sizeTab={350}
      />
    </>
  );
};
