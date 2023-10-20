import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import VerifyAccountPage from "./pages/guest/VerifyAccountPage";
import SuccessPage from "./pages/universal/SuccessPage";
import SubmitEmailPage from "./pages/guest/SubmitEmailPage";
import LandingPage from "./pages/universal/LandingPage";
import UserRegisterPage from "./pages/auth/UserRegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/> } />
        <Route path="/auth/user/forgotPassword" element={<SubmitEmailPage purpose="password"/> } />
        <Route path="/auth/user/register" element={<UserRegisterPage/> } />
        <Route path="/auth/user/register/emailSent" element={<SuccessPage purpose="email"/> } />
        <Route path="/auth/user/resendOtp" element={<SubmitEmailPage purpose="otp"/> } />
        <Route path="/auth/user/verify/:token?" element={<VerifyAccountPage/> } />
        <Route path="/auth/user/verified" element={<SuccessPage purpose="verified"/> } />
      </Routes>
    </Router>
  );
}

export default App;
