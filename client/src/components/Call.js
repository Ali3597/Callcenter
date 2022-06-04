import "./Call.css";
import Avatar from "../assets/avatar.png";
import { FcEndCall } from "react-icons/fc";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";

import { ParseTime } from "../utils/ParseDatas";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Modal } from "./Modal";
import io from "socket.io-client";

export const Call = ({
  inCall,
  setInCall,
  customerCaller,
  setCustomerCaller,
  numberCaller,
  setNumberCaller,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [socket, setSocket] = useState(null);
  const [modaling, setModaling] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    let interval = null;
    if (answered) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [answered, seconds]);

  useEffect(() => {
    if (user) {
      setSocket(
        io(`http://localhost:4000`, {
          withCredentials: true,
          reconnection: false,
        })
      );
    }
  }, [user]);
  useEffect(() => {
    if (socket) {
      socket.on("call", (data) => {
        CallFunction(data);
      });

      // Wait for the close call event to play the animation when a call is closed
      socket.on("closeCall", (data) => {
        console.log("on close le callll");
        CloseCall();
      });

      socket.on("respond", () => {
        AnswerPhone();
      });
      socket.on("unavailable", () => {
        console.log("on modaaaaaaaaaaal la");
        setModaling(true);
      });
    }
  }, [socket]);

  const CallFunction = async (newNumber) => {
    setNumberCaller(newNumber);
    const caller = await apiFetch("/calls/getcaller", {
      method: "POST",
      body: { number: newNumber },
    });

    setCustomerCaller(caller.customer);

    setInCall(true);
  };

  const AnswerPhone = async () => {
    setAnswered(true);
  };

  const CloseCall = async () => {
    setInCall(false);
    setAnswered(false);
    setSeconds(0);
    socket.emit("closeCall", user._id);
  };

  const handleDelete = () => {
    setModaling(false);
  };
  const handleHangUp = () => {
    CloseCall();
  };

  return (
    <div className={`${inCall ? "opened-call" : ""} call-right`}>
      <h1>Vous avez un appel !</h1>
      {customerCaller && (
        <div className="link-call">
          <Link to={"/clients/" + customerCaller._id}>
            Consultez la fiche client
          </Link>
          <Link to={"/requetes/nouveau?customer=" + customerCaller._id}>
            Lui créer une requette
          </Link>
        </div>
      )}
      {!customerCaller && (
        <Link to={"/clients/nouveau?number=" + numberCaller}>
          Enregistrez le nouveau client
        </Link>
      )}
      {customerCaller && (
        <img
          src={
            customerCaller.avatar
              ? "http://localhost:4000\\" + customerCaller.avatar
              : Avatar
          }
          alt=""
        />
      )}
      {!customerCaller && <img src={Avatar} alt="" />}
      <h3>{customerCaller ? customerCaller.name : "Inconnu"} </h3>
      {numberCaller && <h5>{numberCaller}</h5>}
      {answered && <p>{ParseTime(seconds)}</p>}
      <FcEndCall onClick={handleHangUp} cursor={"pointer"} size={55} />
      {modaling && (
        <Modal
          onClose={handleDelete}
          title={"Attention !!!"}
          message={
            "Vous venez de recevoir un message mais votre téléphone n'est pas connecté , vous avez été passé en injoignable"
          }
          buttonMessage={"OK"}
          onClick={handleDelete}
        />
      )}
    </div>
  );
};
