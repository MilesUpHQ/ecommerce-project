import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./Components/Admin/AdminHome";
import CategoryLayout from "./Components/Admin/Categories/CategoryLayout";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
	<Route exact path='/' element={<AdminHome />} />
        Route path="/admin/categories" element={<CategoryLayout />} />
      </Routes>
    </div>
  );
}

export default App;
