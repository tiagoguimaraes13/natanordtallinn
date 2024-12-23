import React from 'react';
import { motion } from 'framer-motion';
import './Location.css';

export const Location = () => {
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
  const longitude = 24.7535;

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
            <h2>Visit Our Gallery</h2>
            <div className="address-details">
              <p className="address">Viru väljak 4/6</p>
              <p className="city">10111 Tallinn, Estonia</p>
              <div className="contact-details">
                <p>Phone: +372 123 4567</p>
                <p>Email: info@okoagallery.ee</p>
              </div>
              <div className="hours">
                <h3>Opening Hours</h3>
                <p>Monday - Friday: 10:00 - 18:00</p>
                <p>Saturday - Sunday: 11:00 - 16:00</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="map-wrapper" variants={contentVariants}>
            <iframe
              title="Tallinn Map"
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
                View Larger Map
              </a>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="get-directions"
              >
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Location;