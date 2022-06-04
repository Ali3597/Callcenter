import "./Admin.css";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";
import { Loader } from "../../components/Loader";
const months = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];

export const Admin = () => {
  return (
    <>
      <h1>Admin</h1>
      <div className="mycharts">
        <GraphFetch title={"Appels"} linkFetch={"/calls/callstimes"} />
        <GraphFetch title={"Requetes"} linkFetch={"/requests/requeststimes"} />
      </div>
    </>
  );
};

const GraphFetch = ({ title, linkFetch }) => {
  const [year, setYear] = useState(new Date(Date.now()).getFullYear());
  const [month, setMonth] = useState(new Date(Date.now()).getMonth());
  const [byYear, setByYear] = useState(true);
  const [numbers, setNumbers] = useState(null);
  const testArray = ["Jour", title];
  const testArrayp = ["Mois", title];
  useEffect(() => {
    const fetchData = async () => {
      setNumbers(null);
      let arrayUse = [];

      if (byYear) {
        arrayUse.push(testArrayp);
        for (let i = 0; i < 12; i++) {
          let nbrDate = new Date(year, i, 0).getDate();
          const response = await apiFetch(linkFetch, {
            method: "POST",
            body: {
              start: new Date(year, i, 1),
              end: new Date(year, i, nbrDate),
            },
          });
          let MonthName = months[i];
          arrayUse.push([MonthName, response.itemsNumber]);
        }
      } else {
        const nbrDate = new Date(year, month, 0).getDate();
        arrayUse.push(testArray);
        for (let i = 1; i <= nbrDate; i++) {
          const response = await apiFetch(linkFetch, {
            method: "POST",
            body: {
              start: new Date(year, month - 1, i),
              end: new Date(year, month - 1, i),
            },
          });
          let dateOfMonth = `${addNecessaryZero(i)}/${addNecessaryZero(
            month
          )}/${year}`;
          arrayUse.push([dateOfMonth, response.itemsNumber]);
        }
      }
      setNumbers(arrayUse);
    };
    fetchData();
  }, [month, year, byYear]);
  return (
    <>
      <div>
        <OptionStats
          byYear={byYear}
          setByYear={setByYear}
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
        />
        {numbers && (
          <Chart
            chartType="LineChart"
            width="95%"
            height="90%"
            data={numbers}
          />
        )}
        {!numbers && <Loader />}
      </div>
    </>
  );
};

const OptionStats = ({ byYear, setByYear, year, setYear, month, setMonth }) => {
  const nowDate = new Date(Date.now());
  const handleChange = (e) => {
    if (byYear) {
      const numberYear = parseInt(e.target.value);
      setYear(numberYear);
    } else {
      const numberYear = parseInt(e.target.value.split("-")[0]);
      const numberMonth = parseInt(e.target.value.split("-")[1]);
      setYear(numberYear);
      setMonth(numberMonth);
    }
  };
  return (
    <div className="options-stat">
      <div className="time-calendar">
        <div>
          <label>Trier par année : </label>
          <input
            type="checkbox"
            checked={byYear ? true : false}
            name="par année"
            onChange={() => setByYear(true)}
          />
        </div>
        <div>
          <label>Trier par mois :</label>
          <input
            type="checkbox"
            checked={!byYear ? true : false}
            name="par année"
            onChange={() => setByYear(false)}
          />
        </div>
        <div>
          {!byYear && (
            <input
              type="month"
              id="start"
              name="start"
              min="2022-03"
              max={`${nowDate.getFullYear()}-${addNecessaryZero(
                nowDate.getMonth() + 1
              )}`}
              value={`${year}-${addNecessaryZero(month)}`}
              onChange={handleChange}
            />
          )}
          {byYear && (
            <input
              type="number"
              value={year}
              min={2022}
              max={`${nowDate.getFullYear() + 1}`}
              step="1"
              onChange={handleChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

let addNecessaryZero = function (number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
};
