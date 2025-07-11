import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Location.css';

export const Location = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6
      }
    }
  };

  // Tallinn coordinates
  const latitude = 59.437;
  const longitude = 24.7450;

  return (
    <div className="location-section">
      <motion.div
        className="location-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="location-content">
          <motion.div className="location-info" variants={contentVariants}>
            <h2>{t('location.title')}</h2>
            <div className="address-details">
              <p className="address">{t('location.address')}</p>
              <p className="city">{t('location.city')}</p>
              <div className="contact-details">
                {/* Phone */}
                <motion.a
                  href="tel:+37258349800"
                  className="contact-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={t('location.callPhone')}
                >
                  <Phone size={20} />
                  <span>+372 58349800</span>
                </motion.a>

                {/* Email */}
                <motion.a
                  href="mailto:natanord.tallinn@gmail.com"
                  className="contact-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={t('location.sendEmail')}
                >
                  <Mail size={20} />
                  <span>natanord.tallinn@gmail.com</span>
                </motion.a>

                {/* Instagram */}
                <motion.a
                  href="https://www.instagram.com/natanord.tallinn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={t('location.instagramProfile')}
                >
                  <Instagram size={20} />
                  <span>@natanord.tallinn</span>
                </motion.a>

                {/* Address */}
                <motion.div className="contact-link" aria-label={t('location.locationLabel')}>
                  <MapPin size={20} />
                  <span>{t('location.locationText')}</span>
                </motion.div>
              </div>

              <div className="hours">
                <h3>{t('location.openingHours')}</h3>
                <p>{t('location.weekdayHours')}</p>
                <p>{t('location.weekendHours')}</p>
              </div>  
            </div>
          </motion.div>

          <motion.div className="map-wrapper" variants={contentVariants}>
            <iframe
              title={t('location.mapTitle')}
              className="map-frame"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.015},${latitude - 0.015},${longitude + 0.015},${latitude + 0.015}&layer=mapnik&marker=${latitude},${longitude}`}
              frameBorder="0"
              allowFullScreen
            />
            <div className="map-actions">
              <a 
                href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-larger"
              >
                {t('location.viewLargerMap')}
              </a>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="get-directions"
              >
                {t('location.getDirections')}
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Location;
