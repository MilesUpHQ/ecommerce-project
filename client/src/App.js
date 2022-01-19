import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/resetPassword/ResetPassword';

function App() {
  return (
    <div className="App">
      <Routes>
           <Route path="/forgot_password" element={<ForgotPassword />} />
           <Route path="/reset_password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
