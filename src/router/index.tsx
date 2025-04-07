import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PhoneInput from "../components/PhoneInput";
import Login from "../components/Login";
import Validate from '../components/ValiPage'
import NewLogin from "../components/NewLogin";
import CodePage from '../components/CodePage'
import Health from '../components/Health'
import BeforeLogin from '../components/BeforeLogin' // Removing since module not found

// 模拟是否登录
const isAuthenticated = false;

const AppRouter: React.FC = () => {
  return (
    <Router basename="/qq2">
      <Routes>
        <Route path="/" element={<PhoneInput />} />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/validate" element={<Validate />} />
        <Route path="/newlogin" element={<NewLogin />} />
        <Route path="/code" element={<CodePage />} />
        <Route path="/health" element={<Health />} />
        <Route path="/beforelogin" element={<BeforeLogin />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;