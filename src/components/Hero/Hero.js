import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import backgroundVideo from '../../assets/background-video.mov';
import './Hero.css';

export const Hero = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.section 
      className="hero"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="video-background">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>

      <div className="hero-content">
        <motion.div className="hero-text" variants={itemVariants}>
          <h1>{t('hero.welcome')}</h1>
          <p>{t('hero.tagline')}</p>
        </motion.div>

        <motion.div className="hero-cta" variants={itemVariants}>
          <motion.button
            className="explore-button"
            onClick={() => navigate('/ourart')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.orderNow')}
            <ArrowRight className="button-icon" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
