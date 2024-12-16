import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import components
import { NavBar } from "./components/NavBar/NavBar";
import { HomePage } from "./components/HomePage/HomePage";
import { OurArt } from "./components/OurArt/OurArt";
import { Location } from "./components/Location/Location";
import { Cart } from "./components/Cart/Cart";
import { AboutUs } from "./components/AboutUs/AboutUs";
import { Footer } from "./components/Footer/Footer";
import "./App.css";

export const App = () => {
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const location = useLocation();

  const addToCart = (art) => {
    setCart(prev => [...prev, { ...art, id: Date.now() }]);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, idx) => idx !== index));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <div className="app-container">
      {/* NavBar Component */}
      <NavBar cartItemCount={cart.length} />

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            className="cart-notification"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Item added to cart
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
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
              <Route 
                path="/ourart" 
                element={<OurArt addToCart={addToCart} />} 
              />
              <Route path="/location" element={<Location />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route 
                path="/cart" 
                element={
                  <Cart 
                    cart={cart} 
                    removeFromCart={removeFromCart}
                    total={calculateTotal()}
                  />
                } 
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;