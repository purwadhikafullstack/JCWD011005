import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserRegisterPage from "./pages/guest/UserRegisterPage";
import VerifyAccountPage from "./pages/guest/VerifyAccountPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user-register" element={<UserRegisterPage/> } />
        <Route path="/verifyAccount" element={<VerifyAccountPage/> } />
      </Routes>
    </Router>
  );
}

export default App;
