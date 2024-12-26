import React, { useState } from "react";
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
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === art.id);
    
    if (existingItem) {
      // If item exists, update quantity
      setCart(cart.map(item =>
        item.id === art.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ));
    } else {
      // If item doesn't exist, add it with quantity 1
      setCart(prev => [...prev, { ...art, id: Date.now(), quantity: 1 }]);
    }

    // Show notification
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  return (
    <div className="app-container">
      {/* NavBar Component */}
      <NavBar cartItemCount={getTotalItems()} />

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            className="cart-notification"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            Item added to cart successfully!
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
                    updateQuantity={updateQuantity}
                    total={calculateTotal()}
                  />
                } 
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default App;