import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Star, Users } from 'lucide-react';
import { Hero } from '../Hero/Hero';
import { useTranslation } from 'react-i18next';
import './HomePage.css';

export const HomePage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Coffee size={32} />,
      title: t('home.features.authenticTitle'),
      description: t('home.features.authenticDesc'),
      video: '/videos/vid1.mp4',
    },
    {
      icon: <Star size={32} />,
      title: t('home.features.cozyTitle'),
      description: t('home.features.cozyDesc'),
      video: '/videos/vid2.mp4',
    },
    {
      icon: <Users size={32} />,
      title: t('home.features.communityTitle'),
      description: t('home.features.communityDesc'),
      video: '/videos/vid3.mp4',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="homepage">
      <Hero />

      <motion.main
        className="homepage-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.section className="features-section" variants={itemVariants}>
          <h2>{t('home.features.title')}</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="feature-video-background">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="feature-background-video"
                  >
                    <source src={feature.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <motion.div
                  className="feature-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
};

export default HomePage;
