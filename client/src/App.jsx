// App.js - Updated to hide navbar/footer on all dashboard routes
import './App.css';
import GlobalSpotlight from './components/GlobalSpotlight.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import Products from './pages/Products.jsx';
import Transparency from './pages/Transparency.jsx';
import Admin from './pages/Admin.jsx';
import Login from './pages/Login.jsx';
import { ThemeProvider } from './context/ThemeContext';
import PolicyForm from './pages/PolicyForm';
import About from './pages/About.jsx';
import Package from './pages/Package.jsx';
import Partnership from './pages/Partnership.jsx';
import WhyInsureX from './pages/WhyInsureX.jsx';
import MyPlans from './pages/MyPlans.jsx';
import Policies from './pages/Policies.jsx';
import Store from './pages/Store.jsx';
import Settings from './pages/Settings.jsx';
import Wallet from './pages/Wallet.jsx';
import Notifications from './pages/Notifications.jsx';
import B2BSolutions from './pages/B2BSolutions.jsx';
import Documentation from './pages/Documentation.jsx';
import OracleNetwork from './pages/OracleNetwork.jsx';
import APIReference from './pages/APIReference.jsx';
import Security from './pages/Security.jsx';
import Blog from './pages/Blog.jsx';
import FAQ from './pages/FAQ.jsx';  
import Compliance from './pages/Compliance.jsx';
import Careers from './pages/Careers.jsx';
import CheckoutForm from './pages/CheckoutForm.jsx';
//SMC integrations
// import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
// import { contractAddress, contractABI } from '../contractConfig.js';


const AppContent = () => {
  const location = useLocation();
  
  // Check if current path starts with /dashboard (includes all dashboard sub-routes)
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  
  // Routes where navbar and footer should be hidden
  const hideNavAndFooterRoutes = ['/login', '/policy-form'];
  const showNavAndFooter = !hideNavAndFooterRoutes.includes(location.pathname) && !isDashboardRoute;
  
  // Routes where only footer should be hidden (includes Home and dashboard routes)
  const hideFooterRoutes = ['/', '/login', '/policy-form'];
  const showFooter = !hideFooterRoutes.includes(location.pathname) && !isDashboardRoute;

  return (
    <>
      {showNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/transparency" element={<Transparency />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/policy-form" element={<PolicyForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/package" element={<Package />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/whyinsurex" element={<WhyInsureX />} />
        <Route path="/b2b" element={<B2BSolutions />} />
        <Route path="/developers" element={<Documentation />} />
        <Route path="/oracles" element={<OracleNetwork />} />
        <Route path="/api" element={<APIReference />} />
        <Route path="/security" element={<Security />} />
        
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/careers" element={<Careers />} />




        <Route path="/dashboard/my-plans" element={<MyPlans />} />
        <Route path="/dashboard/policies" element={<Policies />} />
        <Route path="/dashboard/store" element={<Store />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/wallet" element={<Wallet />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />

        <Route path="/dashboard/store/checkout" element={<CheckoutForm />} />

      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        {/* <GlobalSpotlight /> */}
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;