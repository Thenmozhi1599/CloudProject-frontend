import "./Table.css";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import DropdownBox from "./Policyselect.js";

const Table = ({ chart }) => {
  const [dataTable, setDataTable] = useState([]);
  const [passed, setPassed] = useState(0);
  const [failed, setfailed] = useState(0);

  useEffect(() => {

    console.log(chart)
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

          tableData.push({
            framework: row.framework,
            title: row.title,
            status: row.status,
            check_id: row.check_id,
          });
        }
        setPassed(pass_count);
        setfailed(fail_count);
        setDataTable(tableData);
      });
  }, [chart]);

  useEffect(() => {}, [passed, failed]);

  return (
    <>
      <div id="table-wrapper" style={{width:'100%'}} >
        <div id="table-scroll" style={{width:'100%',}}>
          <table>
            <thead>
              <tr>
                <th>Check ID</th>
                <th>Framework</th>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dataTable.map((item, index) => (
                <tr key={index}>
                  <td>{item.check_id}</td>
                  <td>{item.framework}</td>
                  <td>{item.title}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
