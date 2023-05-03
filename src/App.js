import "./App.css";
import { BrowserRouter as Router , Route, Routes } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Mainpage from "./Components/Mainpage";
import ProjectForm from "./Components/Charts/Projectform";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Mainpage/>} />
          {/* <Route path="/projectform" element={<ProjectForm />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
