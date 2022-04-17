import "./Call.css";
import Avatar from "../assets/avatar.png";
import { FcEndCall } from "react-icons/fc";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { useAutoIncrement } from "../hooks/useAutoIncrement";
import { ParseTime } from "../utils/ParseDatas";
import { Link } from "react-router-dom";

export const Call = () => {
  const [inCall, setInCall] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [time, setTime] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [number, setNumber] = useState("064347985642789999frferfe");
  const CallFunction = async () => {
    const caller = await apiFetch("/calls/getcaller", {
      method: "POST",
      body: { number },
    });
    setCustomer(caller.customer);

    setInCall(true);
  };

  const AnswerPhone = async () => {
    setAnswered(true);
  };

  const CloseCall = async () => {
    setInCall(false);
    console.log("on evoi ça ", customer, number, time, answered);
    // await apiFetch("/calls/create", {
    //   method: "POST",
    //   body: {
    //     customer: customer ? customer._id : null,
    //     number,
    //     time: time ? time : 0,
    //     state: answered ? "Appel pris" : "Appel manqué",
    //   },
    // });
  };

  useEffect(() => {
    // setTimeout(() => CallFunction(), 2000);
    // setTimeout(() => AnswerPhone(), 5000);
  }, []);
  const handleHangUp = () => {
    CloseCall();
  };

  return (
    <div className={`${inCall ? "opened-call" : ""} call-right`}>
      <h1>Appel</h1>
      {customer && (
        <div className="link-call">
          <Link to={"/customers/" + customer._id}>
            Consultez la fiche client
          </Link>
          <Link to={"/requests/new?customer=" + customer._id}>
            Lui créer une requette
          </Link>
        </div>
      )}
      {!customer && (
        <Link to={"/customers/new?number=" + number}>
          Enregistrez le nouveau client
        </Link>
      )}
      {customer && (
        <img
          src={
            customer.avatar
              ? "http://localhost:4000\\" + customer.avatar
              : Avatar
          }
          alt=""
        />
      )}
      {!customer && <img src={Avatar} alt="" />}
      <h3>{customer ? customer.name : "Inconnu"} </h3>
      {number && <h5>{number}</h5>}
      {answered && <Timer time={time} setTime={setTime} />}
      <FcEndCall onClick={handleHangUp} cursor={"pointer"} size={55} />
    </div>
  );
};

const Timer = ({ time, setTime }) => {
  setTime(useAutoIncrement(0, 1));
  return <p>{ParseTime(time)}</p>;
};
