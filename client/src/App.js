import "./App.css";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import ViewProduct from "./components/FeaturedProducts/ViewProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
        <Route path="/featured_Products" element={<FeaturedProducts />} />
        <Route path="/view_product/:id" element={<ViewProduct />} />
      </Routes>
    </div>
  );
}

export default App;
