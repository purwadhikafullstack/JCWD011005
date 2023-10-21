import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/universal/LandingPage";
import { TenantRegist } from "./pages/Tenant/TenantRegist";
import { UserLogin } from "./pages/User/UserLogin"
import {UserForgotPassword} from "./pages/User/UserForgotPassword"
import { UserResetPassword } from "./pages/User/UserResetPassword";

function App() {
  const [message, setMessage] = useState("");
  const url = window.location.href.split("/");
	const token = url[url.length - 1];

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {message}
        <Text>Test</Text>
      </header> */}
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path='/register-tenant' element={<TenantRegist/>} />
        <Route path='/login-user' element={<UserLogin/>} />
        <Route path='/forgot-password-user' element={<UserForgotPassword/>} />
        <Route path={`/reset-password-user/${token}`} element={<UserResetPassword/>} />
      </Routes>
    </div>
  );
}

export default App;
