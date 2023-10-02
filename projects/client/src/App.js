import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import UserRegisterPage from "./pages/guest/UserRegisterPage";
import VerifyAccountPage from "./pages/guest/VerifyAccountPage";
import SuccessPage from "./pages/universal/SuccessPage";
import SubmitEmailPage from "./pages/guest/SubmitEmailPage";
import LandingPage from "./pages/universal/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/> } />
        <Route path="/user/forgotPassword" element={<SubmitEmailPage purpose="password"/> } />
        <Route path="/user/register" element={<UserRegisterPage/> } />
        <Route path="/user/register/emailSent" element={<SuccessPage purpose="email"/> } />
        <Route path="/user/resendOtp" element={<SubmitEmailPage purpose="otp"/> } />
        <Route path="/user/verify/:token?" element={<VerifyAccountPage/> } />
        <Route path="/user/verified" element={<SuccessPage purpose="verified"/> } />
      </Routes>
    </Router>
  );
}

export default App;
