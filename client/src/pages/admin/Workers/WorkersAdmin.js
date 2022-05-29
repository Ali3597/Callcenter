import "./WorkersAdmin.css";
import { FetchTab } from "../../../components/FetchTab";
import { ParseWorker } from "../../../utils/ParseDatas";

const columns = [
  ["email", true, "Email"],
  ["role", true, "Role"],
  ["state", true, "Disponible"],
  ["lastHangUp", true, "Dernier Appel"],
  ["username", true, "Pseudo"],
  ["number", true, "Numero"],
  ["action", false, "Action"],
];

export const WorkersAdmin = () => {
  return (
    <>
      <h1>WorkerAdmin</h1>
      <FetchTab
        columns={columns}
        parser={ParseWorker}
        linkFetch={"/workers"}
        linkNew={"/admin/employes/nouveau"}
        titleNew={"Créer un nouveau utilisateur"}
        placeholder={"Recherchez par email"}
        sizeTab={400}
      />
    </>
  );
};
