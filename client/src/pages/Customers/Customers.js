import "./Customers.css";
import { Tab } from "../../components/Tab";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { faker } = require("@faker-js/faker");

let customers = [];
for (let i = 0; i < 5; i++) {
  customers[i] = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    number: faker.phone.phoneNumber(),
    url: faker.image.avatar(),
  };
}

export const Customers = () => {
  const [parsedCustomers, setParsedCustomers] = useState(null);
  useEffect(() => {
    if (customers) {
      setParsedCustomers(
        customers.map((customer) => {
          return {
            ...customer,
            action: <Link to={customer.id}>Consultez</Link>,
          };
        })
      );
    }
  }, [customers]);
  return (
    <>
      {parsedCustomers && (
        <Tab
          rows={parsedCustomers}
          columns={["name", "email", "number", "action"]}
        />
      )}
    </>
  );
};
