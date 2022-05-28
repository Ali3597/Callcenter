import "./Tab.css";
import { useSearchParams } from "react-router-dom";
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

export const Tab = ({ columns, rows }) => {
  return (
    <table className="responstable">
      <thead>
        <tr>
          {columns.map((column) => (
            <TableHeader key={column[0]} column={column} />
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.id}>
            {columns.map((column, index) => (
              <td key={index}>{row[column[0]]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TableHeader = ({ column }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = () => {
    if (searchParams.get("sort") == column[0]) {
      if (searchParams.get("order") == "ASC") {
        searchParams.set("order", "DESC");
      } else {
        searchParams.set("order", "ASC");
      }
    } else {
      searchParams.set("sort", column[0]);
      searchParams.set("order", "ASC");
    }

    setSearchParams(searchParams);
  };
  return (
    <th
      className={column[1] ? "order" : ""}
      onClick={column[1] ? handleClick : null}
    >
      {column[2]}
      {searchParams.get("sort") == column[0] &&
      searchParams.get("order") == "ASC" ? (
        <FaAngleUp />
      ) : (
        ""
      )}
      {searchParams.get("sort") == column[0] &&
      searchParams.get("order") == "DESC" ? (
        <FaAngleDown />
      ) : (
        ""
      )}
    </th>
  );
};
