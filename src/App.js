import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Box from '@mui/material/Box'
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Mainpage from "./Components/Mainpage";
import ProjectForm from "./Components/Charts/Projectform";
import AttackPatterns from "./Components/Attacks/Attackpatterns";
import NestedList from "./Components/Dashboard/Sidenav/Sidenav";
import { AppBar } from "@mui/material";
import PrimarySearchAppBar from "./Components/Dashboard/Topnav/Topnav";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          
          <Route path="/Signup" element={<SignUp />} />

          <Route 
            path="/dashboard" 
            element={
              <HeaderAndSidebar> 
                <Mainpage /> 
              </HeaderAndSidebar>} 
          />

          <Route 
            path="/projectform" 
            element={
              <HeaderAndSidebar> 
                <ProjectForm /> 
              </HeaderAndSidebar>} 
          />

          <Route 
            path="/attack-patterns" 
            element={
              <HeaderAndSidebar> 
                <AttackPatterns /> 
              </HeaderAndSidebar>} 
          />
 
        </Routes>
      </div>
    </Router>
  );
}

const HeaderAndSidebar = ({children}) => {
  return (
    <>
      <PrimarySearchAppBar />
      <div className="dash">
        <Box sx={{ flexGrow: 1, width: "100vw", height: '100vh' }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              width: "100%",
            }}
          >
            <NestedList style />
            {children}
          </div>
        </Box>
      </div>

    </>
  )
}

export default App;
