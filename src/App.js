import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Career from './pages/Career';
import Blog from './pages/Blog';
import ContactUs from './pages/ContactUs';
import ApplicationServices from './pages/services/Application-services';
import BusinessServices from './pages/services/BusinessServices';
import TechnologyTrainings from './pages/services/TechnologyTrainings';
import GlobalStaffing from './pages/services/GlobalStaffing';
import StaffAugmentation from './pages/services/Staff-augmentation';
import AdminDashboard from './AdminDashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with Header and Footer */}
        <Route
          path="*"
          element={
            <>
              <Header />
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/application-services" element={<ApplicationServices />} />
                  <Route path="/business-services" element={<BusinessServices />} />
                  <Route path="/technology-trainings" element={<TechnologyTrainings />} />
                  <Route path="/globalStaffing" element={<GlobalStaffing />} />
                  <Route path="/staffAugmentation" element={<StaffAugmentation />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/career" element={<Career />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                </Routes>
              </div>
              <Footer />
            </>
          }
        />

        {/* AdminDashboard route without Header and Footer */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
