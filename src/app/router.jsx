import { Routes, Route } from "react-router-dom";

import Products from "../features/products/pages/Products";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Router;
