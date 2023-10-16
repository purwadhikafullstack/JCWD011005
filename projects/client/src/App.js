import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/universal/LandingPage";
import { UserLogin } from "./pages/auth/UserLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/auth/user/login" element={<UserLogin/>} />
      </Routes>
    </Router>
  );
}

export default App;
