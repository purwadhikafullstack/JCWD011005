import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SuccessPage from "./pages/universal/SuccessPage";
import LandingPage from "./pages/universal/LandingPage";
import UserRegisterPage from "./pages/auth/UserRegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/> } />
        <Route path="/auth/user/register" element={<UserRegisterPage/> } />
        <Route path="/auth/user/register/emailSent" element={<SuccessPage purpose="email"/> } />
      </Routes>
    </Router>
  );
}

export default App;
