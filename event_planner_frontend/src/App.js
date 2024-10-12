import './App.css';
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';


function App() {
  return (
  <Router>
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Login/>} exact />
    </Routes>
  </Router>
  )
}
export default App;
