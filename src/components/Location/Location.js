import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, ExternalLink } from 'lucide-react';
import './Location.css';

export const Location = () => {
  const contactInfo = [
    {
      icon: <Clock className="contact-icon" />,
      title: 'Opening Hours',
      details: ['Monday - Friday: 10:00 - 19:00', 'Saturday: 11:00 - 16:00', 'Sunday: Closed'],
    },
    {
      icon: <Phone className="contact-icon" />,
      title: 'Contact',
      details: ['+372 123 4567', 'info@okoa.ee'],
      links: ['tel:+3721234567', 'mailto:info@okoa.ee'],
    },
    {
      icon: <MapPin className="contact-icon" />,
      title: 'Address',
      details: ['Narva mnt 1', '10111 Tallinn', 'Estonia'],
      link: 'https://www.google.com/maps?q=59.437,24.7535',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="location-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="location-header" variants={itemVariants}>
        <h1>Visit Our Gallery in Tallinn</h1>
        <p>Experience art in the heart of Estonia's capital</p>
      </motion.div>

      <motion.div className="map-section" variants={itemVariants}>
        <div className="map-container">
          <img 
            src="/api/placeholder/800/400"
            alt="Map showing OKOA Gallery location"
            className="map-image"
          />
          <motion.div 
            className="map-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3>OKOA Gallery</h3>
            <p>Narva mnt 1, Tallinn</p>
            <motion.a 
              href="https://www.google.com/maps?q=59.437,24.7535" 
              target="_blank" 
              rel="noopener noreferrer"
              className="directions-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Directions
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <div className="location-content">
        <motion.section className="about-section" variants={itemVariants}>
          <h2>Welcome to OKOA Gallery</h2>
          <p>
            Nestled in the heart of Tallinn's vibrant cultural district, OKOA Gallery is more than
            just an art space – it's a journey through creativity and imagination.
          </p>
          <p>
            Our carefully curated collection features unique pieces that blend traditional
            craftsmanship with contemporary vision, creating an unforgettable art experience.
          </p>
        </motion.section>

        <motion.section className="contact-section" variants={itemVariants}>
          <h2>Plan Your Visit</h2>
          <div className="contact-grid">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="contact-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="contact-card-header">
                  <div className="icon-wrapper">
                    {info.icon}
                  </div>
                  <h3>{info.title}</h3>
                </div>
                <div className="contact-details">
                  {info.details.map((detail, idx) => (
                    info.links ? (
                      <a 
                        key={idx}
                        href={info.links[idx]}
                        className="contact-link"
                        target={info.links[idx].startsWith('http') ? '_blank' : undefined}
                        rel={info.links[idx].startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {detail}
                      </a>
                    ) : (
                      <p key={idx}>{detail}</p>
                    )
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Location;