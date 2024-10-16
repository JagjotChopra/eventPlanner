import './App.css';
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ResetPassword from './pages/ForgotPassword/Resetpassword';

function App() {
  return (
  <Router>
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
                
        <Route path="/" element={<Login/>} exact />
    </Routes>
  </Router>
  )
}
export default App;
