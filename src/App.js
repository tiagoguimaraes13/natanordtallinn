import React from "react";
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
import ScrollToTop from './components/ScrollToTop';
import "./App.css";

export const App = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <NavBar />
      <ScrollToTop />

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
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default App;
