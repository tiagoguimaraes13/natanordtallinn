import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 👈 Add this
import './NavBar.css';
import Logo from '../../assets/logo.png';

export const NavBar = ({ cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation(); // 👈 Use translation hook

  const navItems = [
    { path: '/', label: t('navbar.home') },
    { path: '/ourart', label: t('navbar.menu') },
    { path: '/aboutus', label: t('navbar.about') },
    { path: '/location', label: t('navbar.location') },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          {/* Language Selector */}
          <select
            className="language-selector"
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            aria-label={t('navbar.language')}
          >
            <option value="en">EN</option>
            <option value="ee">EE</option>
            <option value="ru">RU</option>
          </select>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="nav-buttons">
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div 
                className="nav-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div 
                className="nav-menu"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
              >
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="nav-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Language Selector in Mobile Menu */}
                <select
                  className="language-selector mobile-lang"
                  value={i18n.language}
                  onChange={(e) => changeLanguage(e.target.value)}
                >
                  <option value="en">EN</option>
                  <option value="ee">EE</option>
                  <option value="ru">RU</option>
                </select>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default NavBar;
