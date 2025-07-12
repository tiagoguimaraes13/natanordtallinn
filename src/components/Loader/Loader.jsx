import React, { useState, useEffect } from 'react';
import './Loader.css';
import logo from '../../assets/logo.png'; // adjust path to your logo
import { useTranslation } from 'react-i18next';

const Loader = () => {
  const { t } = useTranslation();
  const messages = [
    t('loader.welcome.en'),
    t('loader.welcome.et'),
    t('loader.welcome.ru'),
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 1500); // change message every 3.5 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="loader-container">
      <img src={logo} alt="Nata-Nord Logo" className="loader-logo" />
      <p key={current} className="fade-message">
        {messages[current]}
      </p>
    </div>
  );
};

export default Loader;
