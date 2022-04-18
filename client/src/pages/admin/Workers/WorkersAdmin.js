import "./WorkersAdmin.css";
import { FetchTab } from "../../../components/FetchTab";
import { ParseWorker } from "../../../utils/ParseDatas";

const columns = [
  ["email", true],
  ["role", true],
  ["state", true],
  ["lastHangUp", true],
  ["username", true],
  ["number", true],
  ["action", false],
];

export const WorkersAdmin = () => {
  return (
    <>
      <h1>WorkerAdmin</h1>
      <FetchTab
        columns={columns}
        parser={ParseWorker}
        linkFetch={"/workers"}
        linkNew={"/admin/workers/new"}
        titleNew={"Créer un nouveau utilisateur"}
      />
    </>
  );
};
