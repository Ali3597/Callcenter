import { useParams } from 'react-router';
import { CustomerCard } from '../../components/CustomerCard';
import {WorkerCard} from '../../components/WorkerCard'
import './Request.css'
const { faker } = require("@faker-js/faker");



const customer = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  number: faker.phone.phoneNumber(),
  url: faker.image.avatar(),
};

 const  worker = {
    id: faker.datatype.uuid(),
    username: faker.name.findName(),
   email: faker.internet.email(),
    number: faker.phone.phoneNumber(),
    avatar: faker.image.avatar(),
  };



export const Request = () => {
      const { id } = useParams();
  return <div className="request">
    <h1>Requete numeror : {id}</h1>
  <div className="request-high">
    <CustomerCard customer={customer} />
    <WorkerCard worker={worker} />
    </div>
    </div>
}