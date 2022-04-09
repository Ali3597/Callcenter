import { useParams } from "react-router";
import "./Request.css";
import { formatDistanceToNow, parseISO } from "date-fns";
import { fr } from "date-fns/esm/locale";
import { urgencyColor } from "../../utils/ParseDatas";
import { Dot } from "../../components/Dot";
import { Card } from "../../components/Card";
import { useToggle } from "../../hooks/index";
import { Modal } from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { FaCheck } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";
const { faker } = require("@faker-js/faker");

const customerfake = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  number: faker.phone.phoneNumber(),
  url: faker.image.avatar(),
};

const workerfake = {
  id: faker.datatype.uuid(),
  username: faker.name.findName(),
  email: faker.internet.email(),
  number: faker.phone.phoneNumber(),
  avatar: faker.image.avatar(),
};

const requestfake = {
  id: faker.datatype.uuid(),
  typeof: faker.lorem.word(),
  author: faker.internet.userName(),
  customer: faker.internet.userName(),
  message: faker.lorem.paragraphs(),
  date: faker.date.recent(),
  deadline: faker.date.soon(),
  done: faker.datatype.boolean(),
  urgencyLevel: faker.datatype.number({
    min: 1,
    max: 5,
  }),
};

export const Request = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const navigate = useNavigate()
  useEffect(async () => {
    if (id) {
      const response = await apiFetch("/requests/" + id);
      if ( !response.item) {
        navigate("/requests");
      }
      setRequest(response.item);
    }
  }, [id]);

  const [deleting, toggleDeleting] = useToggle(false);
  const handleClick = async () =>{
    const responseDone = await apiFetch("/requests/toggle/" + id);
    setRequest({...request,done:responseDone.done})
  }
  const handleDelete = async()=>{
     await apiFetch('/requests/delete/'+id, {method: "DELETE"})
     navigate("/requests");

  }
  return (
    request && (
      <div className="request">
        <div className="request-title">
          <p> Requete numero : {id} </p>{" "}
          <Dot color={urgencyColor(request.urgencyLevel)} />
          {request.done ? <FaCheck /> : <FaWindowClose />}
        </div>
        <div className="request-high">
          <Card
            photoURL={customerfake.url}
            name={request.customer.name}
            email={request.customer.email}
            number={request.customer.number}
          />
          <Card
            photoURL={workerfake.avatar}
            name={request.author.username}
            email={request.author.local.email}
            number={request.author.number}
          />
        </div>
        <div className="request-message">
          <p>{request.message}</p>
          <div className="request-date">
            <p>Date de création : {request.date.toLocaleString()}</p>
            <p>
              Deadline :{" "}
              {formatDistanceToNow(parseISO(request.deadline), {
                addSuffix: true,
                locale: fr,
              })}
            </p>
          </div>
          <div className="request-buttons">
            <button onClick={toggleDeleting}>Supprimer</button>
            <button onClick={handleClick}>{request.done ?'Invalider' : 'Valider'} la requette</button>
          </div>
        </div>
        {deleting && <Modal onClose={toggleDeleting} title={"aaaaaaaaaa"} message={"Etes vous sure de votre choix , cette requete sera supprimé a mais ?"} onClick={handleDelete} buttonMessage={'Supprimer'}/>}
      </div>
    )
  );
};
