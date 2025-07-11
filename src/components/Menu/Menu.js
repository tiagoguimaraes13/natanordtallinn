import React from 'react';
import { motion } from 'framer-motion';
import './Menu.css'; // Create this for custom styles
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/order');
  };

  return (
    <div className="menu-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Natas Menu
      </motion.h1>

      <motion.div 
        className="menu-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2>Pricing</h2>
        <ul>
          <li>📦 <strong>Minimum order:</strong> 6 units</li>
          <li>🥮 6–10 units: <strong>1.25€ per unit</strong></li>
          <li>🥮 11+ units: <strong>1.00€ per unit</strong></li>
        </ul>

        <h2>Delivery</h2>
        <ul>
          <li>🚚 Delivery in Tallinn City Center: <strong>2.00€</strong></li>
          <li>🎉 Free delivery for orders over <strong>20 units</strong></li>
        </ul>

        <button className="order-button" onClick={handleOrderClick}>
          Order Online
        </button>
      </motion.div>
    </div>
  );
};

export default Menu;
