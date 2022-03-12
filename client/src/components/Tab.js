import "./Tab.css";

export const Tab = ({ columns, rows }) => {
  console.log(rows);
  return (
    <table class="responstable">
      <tr>
        {columns.map((column) => (
          <th key={column}>{column}</th>
        ))}
        <th>Action</th>
      </tr>
      {rows.map((row, index) => (
        <tr key={row.id}>
          {columns.map((column, index) => (
            <td key={index}>{row[column]}</td>
          ))}
          <td key={index}>Consultez</td>
        </tr>
      ))}
    </table>
  );
};
