import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import DropdownBox from "./Policyselect.js";
import Table from "./Table.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend 
);

const Donut = ({chart}) => {
  const [dataTable, setDataTable] = useState([]);
  const [passed, setPassed] = useState(0);
  const [failed, setfailed] = useState(0);
  const [chartData, setChartData] = useState({
    labels: ["checks-passed", "checks-failed"],
    datasets: [
      {
        label: "checks-passed",
        data: [],
        backgroundColor: ["green", "orange"],
        borderColor: ["green", "orange"],
      },
    ],
    options: {
      layout: {
        Legend:{
          display: true,
        }
      },
    },
  });


  useEffect(() => {
    axios
      .get("http://localhost:8000/" + chart)
      .then((response) => response.data.rows)
      .then((rows) => {
        // For Table Data
        const tableData = [];

        // For Chart Data
        let pass_count = 0;
        let fail_count = 0;

        for (let row of rows) {
          if (row.status === "pass") {
            pass_count += 1;
          } else {
            fail_count += 1;
          }

        }
        setPassed(pass_count);
        setfailed(fail_count);
      });
  }, [chart]);

  useEffect(() => {
    setChartData({
      labels: ["checks-passed", "checks-failed"],
      datasets: [
        {
          label: "checks-passed",
          data: [passed, failed],
          backgroundColor: ["green", "orange"],
          borderColor: ["green", "orange"],
        },
      ],
      options: {
        plugins:{
          Legend:{
            display:true,
          }
        },
      },
    });
  }, [passed, failed]);

  return (
    <div>
      <h2>Policy & Compliance check</h2>
      <div style={{ width: "15vw",  margin: "auto"}}>
        <center>
          <Doughnut
            data={chartData}
            options={chartData.options}
          />
          <br></br>
        </center><br></br>
      </div>
    </div>
  );
};

export default Donut;
