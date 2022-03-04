import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Logout from "./components/Logout/Logout";
import { getJWT } from "./utils/jwt";
import AdminLayout from "./components/Admin/AdminLayout";
import CategoryLayout from "./components/Admin/Categories/CategoryLayout";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import FeaturedProducts from "./components/Home/Home";
import ViewProduct from "./components/ViewProducts/ViewProduct";
import AddProducts from "./components/Admin/Products/AddProducts";
import { ProductLayout } from "./components/Admin/Products/ProductLayout";
import { ProductView } from "./components/Admin/Products/ProductView";
import { User } from "./components/Admin/Products/User";
import { UserView } from "./components/Admin/Products/UserView";
import ProductsByCategory from "./components/ProductsByCategory/ProductsByCategory";
import FeaturedProductsList from "./components/Home/ProductList";
import FeaturedProductLayout from "./components/Admin/FeatureProducts/FeaturedProductLayout";
import { Edit } from "./components/Admin/Products/Edit";
import Cart from "./components/Cart/Cart";
import Address from "./components/Address/Address";
import CreateAddress from "./components/Address/CreateAddress";
import Checkout from "./components/CheckOut/Checkout";
import OrderConfirm from "./components/OrderConfirm/OrderConfirm";
import OrderFailed from "./components/FailedError/FailedError";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />

        {/* Admin Routes */}

        <Route
          exact
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/categories"
          element={
            <PrivateRoute>
              <CategoryLayout />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/product/featured"
          element={<FeaturedProductLayout />}
        />
        <Route path="/admin/products/add" element={<AddProducts />} />
        <Route path="/admin/products" element={<ProductLayout />} />
        <Route path="/admin/products/:id/view" element={<ProductView />} />
        <Route path="/admin/user/:id/view" element={<UserView />} />
        <Route path="/admin/product/:id/update" element={<Edit />} />
        <Route path="/admin/user" element={<User />} />

        {/* User Routes */}
        <Route path="/" element={<FeaturedProducts />}></Route>
        <Route path="/products/:category" element={<ProductsByCategory />} />
        <Route path="/product/view/:id" element={<ViewProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user/address" element={<Address />} />
        <Route path="/user/address/:id" element={<CreateAddress />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/order/confirm" element={<OrderConfirm />} />
        <Route path="/order/error" element={<OrderFailed />} />
      </Routes>
    </Router>
  );
};

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}
function useAuth() {
  const jwt = getJWT();
  return jwt && jwt !== "undefined" && jwt !== "null";
}

export default App;
