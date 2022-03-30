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
import Category from "./components/Admin/Categories/Category";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import FeaturedProducts from "./components/Home/Home";
import ViewProduct from "./components/ViewProducts/ViewProduct";
import UserInfo from "./components/Admin/Products/UserInfo";
import ProductsByCategory from "./components/ProductsByCategory/ProductsByCategory";
import Cart from "./components/Cart/Cart";
import Address from "./components/Address/Address";
import CreateAddress from "./components/Address/CreateAddress";
import Add from "./components/Cart/Add";
import OrderConfirm from "./components/OrderConfirm/OrderConfirm";
import OrderFailed from "./components/FailedError/FailedError";
import Orders from "./components/Admin/Orders/Orders";
import OrderDetails from "./components/Admin/Orders/OrderDetails";
import DisplayProducts from "./components/Admin/Products/DisplayProducts";
import AddForm from "./components/Admin/Products/AddForm";
import AddVariants from "./components/Admin/Products/AddVariants";
import UserList from "./components/Admin/Products/UserList";
import { EditForm } from "./components/Admin/Products/EditForm";
import ProductInfo from "./components/Admin/Products/ProductInfo";
import FeaturedProduct from "./components/Admin/FeatureProducts/FeaturedProduct";
import WishList from "./components/WishList/WishList";
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
        <Route path="/product/view/:id" element={<ViewProduct />} />
        <Route path="/" element={<FeaturedProducts />}></Route>
        <Route path="/products/:category" element={<ProductsByCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user/address" element={<Address />} />
        <Route path="/user/address/:id" element={<CreateAddress />} />
        <Route path="/order/confirm" element={<OrderConfirm />} />
        <Route path="/order/error" element={<OrderFailed />} />
        <Route path="/wishlist" element={<WishList />} />

        {/* Admin Routes */}

        <Route
          exact
          path="/admin"
          element={
            <PrivateRoute>
              <DisplayProducts />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/categories"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/product/featured"
          element={
            <PrivateRoute>
              <FeaturedProduct />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/products/add"
          element={
            <PrivateRoute>
              <AddForm />
            </PrivateRoute>
          }
        ></Route>

       
        <Route
          path="/admin/product/:id/add/variant"
          element={
            <PrivateRoute>
               <AddVariants/>
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/products/"
          element={
            <PrivateRoute>
              <DisplayProducts />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/products/:id/view"
          element={
            <PrivateRoute>
              <ProductInfo />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/user/:id/view"
          element={
            <PrivateRoute>
              <UserInfo />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/product/:id/update"
          element={
            <PrivateRoute>
              <EditForm />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/user"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/admin/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        ></Route>

        <Route
          exact
          path="/admin/order/:id"
          element={
            <PrivateRoute>
              <OrderDetails />
            </PrivateRoute>
          }
        ></Route>

        {/* User Routes */}
        <Route path="/" element={<FeaturedProducts />}></Route>
        <Route path="/products/:category" element={<ProductsByCategory />} />
        <Route path="/product/view/:id" element={<ViewProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/user/address"
          element={
            <PrivateRoute>
              <Address />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/address/:id"
          element={
            <PrivateRoute>
              <CreateAddress />
            </PrivateRoute>
          }
        />
        <Route path="/order/confirm/:id" element={<OrderConfirm />} />
        <Route path="/order/error" element={<OrderFailed />} />
      </Routes>
    </Router>
  );
};

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <Navigate to="/login" />
  );
}
function useAuth() {
  const jwt = getJWT();
  return jwt && jwt !== "undefined" && jwt !== "null";
}

export default App;
