import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerLayout from "./components/customer/CustomerLayout";
import Home from "./pages/customer/Home";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App
