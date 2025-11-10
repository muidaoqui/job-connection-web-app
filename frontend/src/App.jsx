import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerLayout from "./components/customer/CustomerLayout";
import Home from "./pages/customer/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App
