import React from "react";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "./Dashboard/Dashboard";
import Donut from "./Charts/donut";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
export default function Mainpage() {
  return (
    <div
      id="main-page"
      style={{
        display: "grid",
        /*flexDirection:'row',*/ justifyContent: "flex-start",
      }}
    >
      <Dashboard />
    </div>
  );
}
