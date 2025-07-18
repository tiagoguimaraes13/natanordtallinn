import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // 👈 Import
import './AboutUs.css';
import logo2Image from '../../assets/logo.png';
import ProfileImage1 from '../../assets/photo1.png';
import ProfileImage2 from '../../assets/photo3.png';

export const AboutUs = () => {
  const { t } = useTranslation(); // 👈 Hook

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
      role: t("about.tiagoRole"),
      description: t("about.tiagoDesc"),
      image: ProfileImage1
    },
    {
      name: "Sonja Sirkas",
      role: t("about.sonjaRole"),
      description: t("about.sonjaDesc"),
      image: ProfileImage2
    }
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
        <h2>{t("about.ourStory")}</h2>
        <p>{t("about.storyText")}</p>
      </motion.section>

      <motion.section className="about-vision" variants={itemVariants}>
        <div className="vision-content">
          <h2>{t("about.ourVision")}</h2>
          <p>{t("about.visionText")}</p>
        </div>
      </motion.section>

      <motion.section className="team-section" variants={itemVariants}>
        <h2>{t("about.ourTeam")}</h2>
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
        <h2>{t("about.orderNow")}</h2>
        <p>{t("about.orderText")}</p>
        <div className="contact-info">
          <p>{t("about.openingHours")}</p>
          <p>{t("about.weekendHours")}</p>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutUs;
