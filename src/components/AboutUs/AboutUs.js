import React from 'react';
import { motion } from 'framer-motion';
import './AboutUs.css';
import logo2Image from '../../assets/logo.png';
import ProfileImage1 from '../../assets/photo1.png';
import ProfileImage2 from '../../assets/photo2.png';

export const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const teamMembers = [
    {
      name: "Tiago Guimarães",
      role: "Founder & Baker",
      description: "Passionate Portuguese baker in traditional pastry making.",
      image: ProfileImage1
    },
    {
      name: "Sonja Sirkas",
      role: "Co-Founder & Manager",
      description: "Estonian native with a love for pastries and customer service.",
      image: ProfileImage2
    },
  ];

  return (
    <motion.div
      className="about-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section 
        className="about-hero relative min-h-screen bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: `url(${logo2Image})` }}
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-6" />
      </motion.section>

      <motion.section className="about-story" variants={itemVariants}>
        <h2>Our Story</h2>
        <p>
          Nata-Nord Tallinn started in 2025, inspired by a love for baking and a desire to bring the taste of Portugal to Estonia. Founded by a Portuguese native living in Tallinn, it all began with a simple idea: to share the traditional pastel de nata with the local community.
          <br /><br />
          What began as a small kitchen project quickly grew as more people discovered and loved our pastries. Using a family recipe and fresh ingredients, we bake every nata with care and pride.
          <br /><br />
          Today, Nata-Nord is a little slice of Portugal in the heart of Tallinn — sharing warm, flaky natas and a passion for good food.
        </p>
      </motion.section>

      <motion.section className="about-vision" variants={itemVariants}>
        <div className="vision-content">
          <h2>Our Vision</h2>
          <p>
            At Nata-Nord Tallinn, we want to share the true taste of Portugal with everyone in Tallinn. We bake fresh, tasty pastéis de nata with care and use the best ingredients.
            <br /><br />
            Our goal is to bring joy and good moments through our pastries and make everyone feel welcome.
          </p>
        </div>
      </motion.section>

      <motion.section className="team-section" variants={itemVariants}>
        <h2>Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="team-member"
              variants={itemVariants}
            >
              <div className="member-photo">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="contact-section" variants={itemVariants}>
        <h2>Make your order</h2>
        <p>
          Experience our collection of fresh Pasteis de Nata, available for order online.
        </p>
        <div className="contact-info">
          <p>Opening Hours: Monday - Friday: 10:00 - 20:00</p>
          <p>Weekend: 10:00 - 18:00</p>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutUs;
