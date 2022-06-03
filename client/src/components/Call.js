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

export const Call = ({
  inCall,
  setInCall,
  customerCaller,
  setCustomerCaller,
  numberCaller,
  setNumberCaller,
}) => {
  const [time, setTime] = useState(null);
  const [answered, setAnswered] = useState(false);
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

    socket.emit("closeCall", user._id);
  };

  useEffect(() => {
    // setTimeout(() => CallFunction(7000), 2000);
    // setTimeout(() => AnswerPhone(), 5000);
  }, []);
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
      {answered && <Timer time={time} setTime={setTime} />}
      <FcEndCall onClick={handleHangUp} cursor={"pointer"} size={55} />
    </div>
  );
};

const Timer = ({ time, setTime }) => {
  setTime(useAutoIncrement(0, 1));
  return <p>{ParseTime(time)}</p>;
};
