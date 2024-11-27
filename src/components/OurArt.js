import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Gallery from "./Gallery";
import LayoutOptions from "./LayoutOptions";
import Cart from "./Cart";

function OurArt() {
  const [cart, setCart] = useState([]);
  const location = useLocation(); // To track the current location

  const addToCart = (name, price) => {
    const item = { name, price };
    setCart([...cart, item]);
    console.log(`${name} added to cart!`);
  };

  // Define the menu links
  const menuLinks = [
    { to: "gallery", label: "Gallery" },
    { to: "layout-options", label: "Layouts" },
    { to: "cart", label: "Cart" }
  ];

  return (
    <div>

      {/* Sub Navigation for Gallery, Layouts, and Cart */}
      <nav className="sub-nav">
        {menuLinks.map(({ to, label }) => (
          <Link 
            key={to}
            to={to} 
            className={`sub-nav-item ${location.pathname.includes(to) ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Routes to display different sections */}
      <Routes>
        <Route path="gallery" element={<Gallery addToCart={addToCart} />} />
        <Route path="layout-options" element={<LayoutOptions />} />
        <Route path="cart" element={<Cart cart={cart} />} />
      </Routes>
    </div>
  );
}

export default OurArt;
