import React from "react";
import Navbar from "./Components/Admin/Navbar";
import Sidebar from "./Components/Admin/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Admin/Categories/Layout";

const App = () => {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Navbar />
        <Sidebar />
        <Router>
          <Routes>
            <Route path="/admin/categories" element={<Layout />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
