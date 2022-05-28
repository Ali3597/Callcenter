import "./Call.css";
import Avatar from "../assets/avatar.png";
import { FcEndCall } from "react-icons/fc";
import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import { useAutoIncrement } from "../hooks/useAutoIncrement";
import { ParseTime } from "../utils/ParseDatas";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import io from "socket.io-client";

export const Call = () => {
  const [inCall, setInCall] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [time, setTime] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [number, setNumber] = useState(null);
  const [socket, setSocket] = useState(null);

  const { user } = useAuthContext();

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
      console.log("on est  la", socket);
      socket.on("call", (data) => {
        CallFunction(data);
      });

      // Wait for the close call event to play the animation when a call is closed
      socket.on("closeCall", (data) => {
        console.log("on close le callll");
        CloseCall();
      });

      socket.on("respond", () => {
        console.log("papa");
        AnswerPhone();
      });
    }
  }, [socket]);

  const CallFunction = async (numberCaller) => {
    console.log("on call al vreume");
    setNumber(numberCaller);
    const caller = await apiFetch("/calls/getcaller", {
      method: "POST",
      body: { number: numberCaller },
    });
    console.log(caller, "mama mia la cosa   la");
    setCustomer(caller.customer);

    setInCall(true);
  };

  const AnswerPhone = async () => {
    setAnswered(true);
  };

  const CloseCall = async () => {
    setInCall(false);
    console.log("on evoi ça ", customer, number, time, answered);
    console.log("coila l'user id", user);
    socket.emit("closeCall", user._id);
  };

  useEffect(() => {
    setTimeout(() => CallFunction(5000), 2000);
    setTimeout(() => AnswerPhone(), 5000);
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
