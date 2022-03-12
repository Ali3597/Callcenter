import "./Customers.css";
import { Tab } from "../../components/Tab";
const { faker } = require("@faker-js/faker");

let customers = [];
for (let i = 0; i < 5; i++) {
  customers[i] = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    number: faker.phone.phoneNumber(),
  };
}
customers.map((customer) => console.log(customer["id"]));
console.log(customers);
export const Customers = () => {
  return <Tab rows={customers} columns={["name", "email", "number"]} />;
};
