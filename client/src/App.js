import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHome from "./components/Admin/AdminHome";
import CategoryLayout from "./components/Admin/Categories/CategoryLayout";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import AddProducts from "./components/Product-List/AddProducts";
import  DisplayProducts  from "./components/Product-List/DisplayProducts";
import { ProductLayout } from "./components/Product-List/ProductLayout";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/admin/categories" element={<CategoryLayout />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
        <Route path="/add-products" element={<AddProducts />}/>
        <Route path="/display-products" element={<ProductLayout/>} />
      </Routes>
    </div>
  );
};

export default App;
