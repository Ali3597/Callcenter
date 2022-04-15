import "./Customers.css";
import { ParseCustomer } from "../../utils/ParseDatas";
import { FetchTab } from "../../components/FetchTab";

const columns = [
  ["name", true],
  ["email", true],
  ["number", true],
  ["action", false],
];

export const Customers = () => {
  return (
    <>
      <h1>Les Clients</h1>
      <FetchTab
        linkFetch={"/customers"}
        linkNew={"/customers/new"}
        titleNew={"Ajoutez un nouvau client "}
        columns={columns}
        parser={ParseCustomer}
      />
    </>
  );
};
