import './App.css';
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ResetPassword from './pages/ForgotPassword/Resetpassword';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import AdminAddCategory from './pages/Admin/AdminAddCategory';
import PrivateRoutes from './PrivateRoutes';
import AdminDashboard from './pages/AdminDashboard/adminDashboard';
import AdminManageCategory from './pages/Admin/AdminManageCategory';
import Navbar from './pages/FoodMenu/FoodMenu';
import HeroSection from './pages/FoodMenu/HeroSection';
import Services from "./pages/FoodMenu/Services";
import Testimonials from "./pages/FoodMenu/About";
import Contact from "./pages/FoodMenu/Contact";
import Footer from "./pages/FoodMenu/Footer";

function App() {
  return (
  <Router>
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/" element={<Login/>} exact />

        <Route  element={<PrivateRoutes role="client"/>} >
           <Route path="/changepassword" element={<ChangePassword/>} /> 
        </Route> 
        <Route
          path="/foodmenu"
          element={
            <>
              <Navbar />
              <HeroSection />
              <Contact />
              <Services />
              <Testimonials />
              <Footer />
            </>
          }
        /> 
        <Route  element={<PrivateRoutes role="admin"/>} >
           <Route path="/adminDashboard" element={<AdminDashboard/>} >
           <Route index element={<AdminAddCategory />} />
           <Route path="adminAddCategory"  element={<AdminAddCategory/>} /> 
           <Route path="adminChangepassword" element={<ChangePassword/>} /> 
           <Route path="adminManageCategory" element={<AdminManageCategory/>} /> 
           </Route> 
        </Route> 
       
    </Routes>
  </Router>
  )
}
export default App;
