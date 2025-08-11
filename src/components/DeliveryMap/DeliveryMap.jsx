import React from "react";
import { useNavigate } from "react-router-dom";
import './DeliveryMap.css';
import { useTranslation } from "react-i18next";
import deliveryMap from '../../assets/deliverymap.png';

export const DeliveryMap = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="delivery-map-container">

      {/* Back button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <span className="back-arrow">←</span> {t('deliveryMap.backToMenu')}
      </button>


      <h1 className="map-title">{t("deliveryMap.title")}</h1>

      <div className="map-content">
        <div className="map-image-wrapper">
          <img src={deliveryMap} alt="Delivery Area" className="delivery-map-image" />
        </div>

        <div className="delivery-description">
          <h2>{t("deliveryMap.under20.title")}</h2>
          <ul>
            <li>🟩 {t("deliveryMap.under20.cityCenter")}</li>
            <li>🟥 {t("deliveryMap.under20.outsideCenter")}</li>
            <li>📍 {t("deliveryMap.under20.outsideTallinn")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
