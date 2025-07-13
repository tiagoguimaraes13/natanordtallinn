import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Instagram size={20} />, url: 'https://www.instagram.com/natanord.tallinn/', label: 'Instagram' },
    { icon: <Mail size={20} />, url: 'mailto:natanord.tallinn@gmail.com', label: 'Email' },
  ];

  const footerLinks = [
    {
      title: t('footer.navigation'),
      links: [
        { name: t('navbar.home'), path: '/' },
        { name: t('navbar.menu'), path: '/ourart' },
        { name: t('navbar.about'), path: '/aboutus' },
        { name: t('navbar.location'), path: '/location' },
      ],
    },
    {
      title: t('footer.contact'),
      items: [
        { icon: <Phone size={16} />, text: '+372 58349800' },
        { icon: <Mail size={16} />, text: 'natanord.tallinn@gmail.com' },
        { icon: <MapPin size={16} />, text: t('footer.onlineShopLocation') },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { name: t('footer.privacyPolicy'), path: '/privacy-policy' },    // updated path
        { name: t('footer.termsOfService'), path: '/terms-of-service' }, // updated path
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h2>{t('footer.brandName')}</h2>
          <p>{t('footer.brandDescription')}</p>
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
          <p>
            &copy; {currentYear} {t('footer.brandName')}. {t('footer.allRightsReserved')}
          </p>
          <p>{t('footer.builtBy')}</p>  {/* <-- new line */}
          <p>{t('footer.builtWithLove')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
