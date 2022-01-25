import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./components/Admin/AdminHome";
import CategoryLayout from "./components/Admin/Categories/CategoryLayout";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/admin/categories" element={<CategoryLayout />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
