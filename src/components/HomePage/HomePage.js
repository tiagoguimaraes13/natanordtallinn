import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Palette, Users, Sparkles } from 'lucide-react';
import { Hero } from '../Hero/Hero';
import backgroundVideo2 from '../../assets/background-video2.mp4';
import backgroundVideo3 from '../../assets/background-video3.mp4';
import backgroundVideo4 from '../../assets/background-video4.mp4';
import backgroundVideo5 from '../../assets/background-video5.mp4';
import './HomePage.css';

export const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Palette size={32} />,
      title: "Innovative Art",
      description: "Experience pieces that push the boundaries of creativity.",
      video: backgroundVideo3
    },
    {
      icon: <Sparkles size={32} />,
      title: "Inspiring Space",
      description: "Immerse yourself in an environment of artistic brilliance.",
      video: backgroundVideo4
    },
    {
      icon: <Users size={32} />,
      title: "Creative Community",
      description: "Connect with like-minded creators and art enthusiasts.",
      video: backgroundVideo5
    }
  ];

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
        duration: 0.6
      }
    }
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
        <motion.section className="discover-section" variants={itemVariants}>
          <div className="discover-video-background">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="discover-background-video"
            >
              <source src={backgroundVideo2} type="video/mp4" />
            </video>
            <div className="discover-video-overlay"></div>
          </div>
          <div className="discover-content">
            <motion.button
              className="discover-button"
              onClick={() => navigate('/ourart')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover Our Art
              <ArrowRight className="button-icon" />
            </motion.button>
          </div>
        </motion.section>

        <motion.section className="features-section" variants={itemVariants}>
          <h2>Why Choose Us?</h2>
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
                  </video>
                </div>
                <motion.div 
                  className="feature-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
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