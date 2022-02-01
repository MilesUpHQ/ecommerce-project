import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	Switch,
	Link
} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import Logout from "./components/Logout/Logout";
import { getJWT } from "./utils/jwt";
import AdminHome from "./components/Admin/AdminHome";
import CategoryLayout from "./components/Admin/Categories/CategoryLayout";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import AddProducts from "./components/Product-List/AddProducts";
import  DisplayProducts  from "./components/Product-List/DisplayProducts";
import { ProductLayout } from "./components/Product-List/ProductLayout";
const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/forgot_password" element={<ForgotPassword />} />
				<Route path="/reset_password/:token" elsement={<ResetPassword />} />
				<Route path="/login" element={<Login />} />
				<Route path="signup" element={<Signup />} />
				<Route path="/logout" element={<Logout />} />
				 <Route path="/add-products" element={<AddProducts />}/>
       			<Route path="/display-products" element={<ProductLayout/>} />
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Home />
						</PrivateRoute>
					}
				></Route>

				<Route
					exact
					path="/admin"
					element={
						<PrivateRoute>
							<AdminHome />
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
