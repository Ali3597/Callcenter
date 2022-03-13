import './Calls.css'
const { faker } = require("@faker-js/faker");

let calls = [];
for (let i = 0; i < 5; i++) {
  calls[i] = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    number: faker.phone.phoneNumber(),
    url: faker.image.avatar(),
  };
}
export const Calls = () => {
    return <div>Calls</div>
}