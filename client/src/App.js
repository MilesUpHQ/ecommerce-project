import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./Components/Admin/AdminHome";
import CategoryLayout from "./Components/Admin/Categories/CategoryLayout";

const App = () => {
  return (
    <>
      <Router>
          <Routes>
            <Route exact path='/' element={<AdminHome />} />
            <Route path="/admin/categories" element={<CategoryLayout />} />
          </Routes>
        </Router>
    </>
  );
};

export default App;
