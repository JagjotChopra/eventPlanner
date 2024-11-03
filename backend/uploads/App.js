import './App.css';
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ResetPassword from './pages/ForgotPassword/Resetpassword';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import NavbarChangeDashboard from './pages/ChangePassword/ChangePasswordNavbar';
import Navbar from './pages/FoodMenu/FoodMenu';
import HeroSection from './pages/FoodMenu/HeroSection';
import Services from "./pages/FoodMenu/Services";
import Testimonials from "./pages/FoodMenu/About";
import Contact from "./pages/FoodMenu/Contact";
import Footer from "./pages/FoodMenu/Footer";
import VenueManagement from './pages/AdminEventVenue/VenueManagement';

// HomePage
import HeaderHome from './pages/Homepage/Header';
import HeroSectionHome from './pages/Homepage/HeroSectionhome';
import EventCategory from './pages/Homepage/EventCategory';
import VenueSection from './pages/Homepage/VenueSection';
import FoodDrinkSection from './pages/Homepage/FoodDrinkSection';
import FooterHome from './pages/Homepage/Footer';
import HomeDescription from './pages/Homepage/HomeDescription';
import AboutHome from './pages/Homepage/AboutHome';

import AdminAddCategory from './pages/Admin/AdminAddCategory';
import PrivateRoutes from './PrivateRoutes';
import AdminDashboard from './pages/AdminDashboard/adminDashboard';
import AdminManageCategory from './pages/Admin/AdminManageCategory';

import UserDashboard from './pages/UserDashboard/UserDashboard';
import NavbarUserDashboard from './pages/UserDashboard/ChangePassword';

function App() {
  return (
  <Router>
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/changepassword" element={<><NavbarChangeDashboard /><ChangePassword/></>} /> 
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
        <Route
          path="/userdashboard"
          element={
            <>
              <NavbarUserDashboard />
              <UserDashboard />
            </>
          }
        /> 
        <Route path="/" element={<Login/>} exact />
        <Route path="/adminVenue" element={<VenueManagement/>} />

        <Route path="/" element={<Login/>} exact />

        <Route  element={<PrivateRoutes role="client"/>} >
           <Route path="/changepassword" element={<ChangePassword/>} /> 
        </Route> 

        <Route  element={<PrivateRoutes role="admin"/>} >
           <Route path="/adminDashboard" element={<AdminDashboard/>} >
           <Route index element={<AdminAddCategory />} />
           <Route path="adminAddCategory"  element={<AdminAddCategory/>} /> 
           <Route path="adminChangepassword" element={<ChangePassword/>} /> 
           <Route path="adminManageCategory" element={<AdminManageCategory/>} /> 
           </Route> 
        </Route> 
        <Route path="/homepage"
          element={
            <>
            <HeaderHome />
            <HeroSectionHome />
            <HomeDescription />
            <EventCategory />
            <VenueSection />
            <FoodDrinkSection />
            <AboutHome />
            <FooterHome />
            </>
          }
        /> 
   
    </Routes>
  </Router>
  )
}
export default App;
