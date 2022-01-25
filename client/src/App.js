import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Logout from './components/Logout/Logout';
import {getJWT} from './utils/jwt';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />

        <Route exact path="/" element={<PrivateRoute>
          <Home />
        </PrivateRoute>}>
        </Route>   

      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}
function useAuth() {
  const jwt = getJWT();
  return jwt && jwt !== 'undefined' && jwt !== 'null';
}

export default App;
