import React from 'react';
import { motion } from 'framer-motion';
import './AboutUs.css';

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
      name: "Jane Doe",
      role: "Founder & Creative Director",
      description: "With over 15 years of experience in contemporary art."
    },
    {
      name: "John Smith",
      role: "Lead Curator",
      description: "Specializing in emerging artists and contemporary movements."
    },
    {
      name: "Emma Wilson",
      role: "Art Consultant",
      description: "Expert in art acquisition and collection management."
    }
  ];

  return (
    <motion.div
      className="about-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section className="about-hero" variants={itemVariants}>
        <h1>About OKOA Gallery</h1>
        <p>Celebrating Contemporary Art in the Heart of Tallinn</p>
      </motion.section>

      <motion.section className="about-story" variants={itemVariants}>
        <h2>Our Story</h2>
        <p>
          Founded in 2020, OKOA Gallery has become a cornerstone of Tallinn's contemporary art scene. 
          Our mission is to bridge the gap between artists and art lovers, creating a space where 
          creativity flourishes and new perspectives are celebrated.
        </p>
      </motion.section>

      <motion.section className="about-vision" variants={itemVariants}>
        <h2>Our Vision</h2>
        <p>
          We believe in making contemporary art accessible to everyone while supporting emerging 
          artists and fostering a community of art enthusiasts. Our gallery serves as a platform 
          for artistic expression and cultural exchange.
        </p>
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
                <img src={`/api/placeholder/150/150`} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <h4>{member.role}</h4>
              <p>{member.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="contact-section" variants={itemVariants}>
        <h2>Visit Us</h2>
        <p>
          Experience our collection in person and join us for regular exhibitions, 
          artist talks, and cultural events.
        </p>
        <div className="contact-info">
          <p>Opening Hours: Monday - Friday: 10:00 - 18:00</p>
          <p>Weekend: 11:00 - 16:00</p>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutUs;