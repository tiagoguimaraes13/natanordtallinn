import React from 'react';
import { motion } from 'framer-motion';
import './Menu.css';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Menu = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        {t('menu.title')}
      </motion.h1>

      <motion.div 
        className="menu-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2>{t('menu.pricingTitle')}</h2>
        <ul>
          <li>📦 <strong>{t('menu.minOrderLabel')}:</strong> {t('menu.minOrderUnits')}</li>
          <li>🥮 {t('menu.priceRange1')}: <strong>{t('menu.price1')}</strong></li>
          <li>🥮 {t('menu.priceRange2')}: <strong>{t('menu.price2')}</strong></li>
        </ul>

        <h2>{t('menu.deliveryTitle')}</h2>
        <ul>
          <li>
            🚚 {t('menu.deliveryCityCenter')}: <strong>{t('menu.deliveryCityCenterPrice')}</strong><br />
            🎉 {t('menu.freeDeliveryThreshold')}
          </li>
          <li>🚚 {t('menu.deliveryOutside')}: <strong>{t('menu.deliveryOutsidePrice')}</strong></li>
          <li>{t('menu.deliveryOutsideDiscount')} <strong>{t('menu.deliveryOutsideDiscountPrice')}</strong></li>
        </ul>

        {/* Delivery Map Link */}
        <Link to="/delivery-map" className="delivery-map-link">
          {t('menu.seeDeliveryMap')}
        </Link>

        <button className="order-button" onClick={handleOrderClick}>
          {t('menu.orderButton')}
        </button>
      </motion.div>
    </div>
  );
};

export default Menu;
