import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Star, Users } from 'lucide-react'; // Changed icons to bakery-related
import { Hero } from '../Hero/Hero';
import backgroundVideo3 from '../../assets/background-video.mov'; // Replace with bakery videos
import backgroundVideo4 from '../../assets/background-video.mov';
import backgroundVideo5 from '../../assets/background-video.mov';
import './HomePage.css';

export const HomePage = () => {

  const features = [
    {
      icon: <Coffee size={32} />,
      title: "Authentic Portuguese Recipe",
      description: "Handcrafted pastéis de nata made with love and tradition.",
      video: backgroundVideo3
    },
    {
      icon: <Star size={32} />,
      title: "Warm & Cozy Bakery",
      description: "Enjoy a welcoming atmosphere perfect for every visit.",
      video: backgroundVideo4
    },
    {
      icon: <Users size={32} />,
      title: "Community Favorite",
      description: "Join fellow nata lovers in sharing moments and memories.",
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

        <motion.section className="features-section" variants={itemVariants}>
          <h2>Why Choose Nata-Nord Tallinn?</h2>
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
