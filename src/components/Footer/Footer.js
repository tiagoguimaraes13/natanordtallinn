import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook size={20} />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <Instagram size={20} />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Mail size={20} />, url: 'mailto:info@okoa.ee', label: 'Email' },
  ];

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Our Art', path: '/ourart' },
        { name: 'About Us', path: '/aboutus' },
        { name: 'Location', path: '/location' },
      ],
    },
    {
      title: 'Contact',
      items: [
        { icon: <Phone size={16} />, text: '+372 123 4567' },
        { icon: <Mail size={16} />, text: 'info@okoa.ee' },
        { icon: <MapPin size={16} />, text: 'Narva mnt 1, Tallinn' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Shipping Policy', path: '/shipping' },
        { name: 'Returns', path: '/returns' },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>OKOA Gallery</h2>
          <p>Contemporary Art in the Heart of Tallinn</p>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="social-icon"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="footer-links-container">
          {footerLinks.map((section, index) => (
            <div key={index} className="footer-section">
              <h3>{section.title}</h3>
              {section.links ? (
                <ul>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="contact-items">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <span className="contact-icon">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} OKOA Gallery. All rights reserved.</p>
          <p>Built with ❤️ in Estonia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;