import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ProgressBar from './progressbar.js'
import BoltIcon from '@mui/icons-material/Bolt';
import SyncIcon from '@mui/icons-material/Sync';

ChartJS.register(ArcElement, Tooltip, Legend);

const Donut = ({ chart }) => {
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
        Legend: {
          display: true,
        },
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
          label: "",
          data: [passed, failed],
          backgroundColor: ["#0d6efd", "#C8C8C8"],
          borderColor: ["#0d6efd", "#C8C8C8"],
          width: '20px'
        },
      ],
      options: {
        plugins: {
          Legend: {
            display: true,
          },
        },
      },
    });
  }, [passed, failed]);

  const handleSyncResources =() =>{
    console.log('syncing resources')
    

  }

  const handleAttackPatterns =() =>{
    console.log('Redirecting to Attack patterns')
    window.location.href = "/attack-patterns";
  }


  return (
    <div id="dashboard-donut">
      <h2
        style={{
          marginTop: "5px",
          width: "fit-content",
          height: "fit-content",
        }}
      >
        Policy & Compliance check
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr", gridGap: '10px' }}>
        <div style={{ width: "fit-content", marginLeft: "0" }}>
          <Doughnut
            style={{
              width: "17rem",
              marginLeft: "0rem",
              marginTop: "0px",
            }}
            data={chartData}
            options={chartData.options}
          />
          <br></br>
        </div>
        <div>
          <ProgressBar />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr", gridAutoRows: "100px", gridGap: '10px' }}>
          <div style={{
            backgroundColor: "white", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)", borderRadius: "4px",
            padding: "10px", display: 'grid', placeItems: 'center', cursor: 'pointer',
          }}   onClick={handleAttackPatterns}>

            <p>
              <BoltIcon sx={{ fontSize: 40, color: '#0d6efd' }} />
              0</p>
            <p>
              Attack Patterns
            </p>
          </div>
          <div style={{ backgroundColor: "white", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)", 
                  borderRadius: "4px", padding: "10px", cursor: 'pointer',}}
                  onClick={handleSyncResources}>

            <SyncIcon sx={{ fontSize: 40, color: '#0d6efd' }} />
          </div>
          <div>

          </div>
          <div>

          </div>
          <div>

          </div>
          <div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Donut;
