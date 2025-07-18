import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import components
import { NavBar } from "./components/NavBar/NavBar";
import { HomePage } from "./components/HomePage/HomePage";
import Menu from './components/Menu/Menu';
import { Location } from "./components/Location/Location";
import { AboutUs } from "./components/AboutUs/AboutUs";
import { Footer } from "./components/Footer/Footer";
import OrderForm from './components/OrderForm/OrderForm';
import ScrollToTop from './components/ScrollToTop';  // your scroll-to-top BUTTON
import ScrollToTopOnRouteChange from './components/ScrollToTopOnRouteChange';  // the new auto scroll on route change
import { PrivacyPolicy } from "./components/PrivacyPolicy/PrivacyPolicy";       // NEW
import { TermsOfService } from "./components/TermsOfService/TermsOfService";    // NEW
import "./App.css";
import { DeliveryMap } from "./components/DeliveryMap/DeliveryMap";

import Loader from './components/Loader/Loader';  // <-- import your Loader here

export const App = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  // Show loader for 3 seconds then hide
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app-container">
      <NavBar />

      {/* Automatically scroll to top on route change */}
      <ScrollToTopOnRouteChange />

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/ourart" element={<Navigate to="/menu" replace />} /> {/* Redirect */}
              <Route path="/location" element={<Location />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/order" element={<OrderForm />} />
              {/* New Routes */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/delivery-map" element={<DeliveryMap />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Your manual scroll to top button */}
      <ScrollToTop />

      <Footer />
    </div>
  );
};

export default App;
