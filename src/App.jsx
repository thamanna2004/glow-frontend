import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import VerifyOtp from "./features/auth/pages/VerifyOtp";
import ResetPassword from "./features/auth/pages/ResetPassword";
import Browse from "./features/auth/pages/Browse";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/browse" element={<Browse />} />
        <Route
          path="*"
          element={
            <main>
              <h1>Glow Skin</h1>
              <p>Skincare Ecommerce Website</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  
