import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Wallet,
  Building2,
  Bitcoin,
  ShoppingCart,
  AlertCircle,
  Check,
} from 'lucide-react';
import './Cart.css';

export const Cart = ({ cart, removeFromCart }) => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [section, setSection] = useState('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [creditCardInfo, setCreditCardInfo] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!personalInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!validateEmail(personalInfo.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!personalInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!validatePhone(personalInfo.phone)) {
      newErrors.phone = 'Valid phone number is required';
    }

    if (paymentMethod === 'creditCard') {
      if (!creditCardInfo.number.trim()) {
        newErrors.cardNumber = 'Card number is required';
      }
      if (!creditCardInfo.expiry.trim()) {
        newErrors.expiry = 'Expiry date is required';
      }
      if (!creditCardInfo.cvc.trim()) {
        newErrors.cvc = 'CVC is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }

    if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }

    if (name === 'cvc') {
      formattedValue = value.slice(0, 3);
    }

    setCreditCardInfo((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setFormSuccess(true);
        setTimeout(() => {
          setFormSuccess(false);
          setSection('cart');
        }, 3000);
      } catch (error) {
        setErrors({ submit: 'Payment failed. Please try again.' });
      }
      setIsSubmitting(false);
    }
  };

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
      },
    },
  };

  const paymentMethods = [
    { id: 'creditCard', icon: CreditCard, label: 'Credit Card' },
    { id: 'paypal', icon: Wallet, label: 'PayPal' },
    { id: 'bankTransfer', icon: Building2, label: 'Bank Transfer' },
    { id: 'crypto', icon: Bitcoin, label: 'Cryptocurrency' },
  ];

  return (
    <div className="cart-container">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="cart-wrapper"
      >
        <div className="progress-steps">
          {['cart', 'shipping', 'payment'].map((step, index) => (
            <motion.div
              key={step}
              className={`progress-step ${section === step ? 'active' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSection(step)}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-label">{step.charAt(0).toUpperCase() + step.slice(1)}</div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {section === 'cart' && (
            <motion.div
              key="cart"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="section-container"
            >
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingCart className="empty-cart-icon" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="cart-items">
                  {cart.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="cart-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      {/* Cart item content */}
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {section === 'shipping' && (
            <motion.div
              key="shipping"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="section-container"
            >
              <form className="shipping-form">
                {Object.entries(personalInfo).map(([field, value]) => (
                  <div key={field} className="form-group">
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={value}
                      onChange={(e) =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          [field]: e.target.value,
                        }))
                      }
                      className={errors[field] ? 'error' : ''}
                    />
                    {errors[field] && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="error-message"
                      >
                        <AlertCircle className="error-icon" />
                        {errors[field]}
                      </motion.span>
                    )}
                  </div>
                ))}
              </form>
            </motion.div>
          )}

          {section === 'payment' && (
            <motion.div
              key="payment"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="section-container"
            >
              <div className="payment-methods">
                {paymentMethods.map(({ id, icon: Icon, label }) => (
                  <motion.div
                    key={id}
                    className={`payment-method ${paymentMethod === id ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod(id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="payment-icon" />
                    <span>{label}</span>
                  </motion.div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {paymentMethod === 'creditCard' && (
                  <motion.div
                    key="creditCard"
                    variants={containerVariants}
                    className="credit-card-form"
                  >
                    {/* Credit card form fields */}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="navigation-buttons">
          <motion.button
            className="back-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (section === 'shipping') setSection('cart');
              if (section === 'payment') setSection('shipping');
            }}
            disabled={section === 'cart'}
          >
            Back
          </motion.button>

          <motion.button
            className={`continue-button ${isSubmitting ? 'submitting' : ''} ${
              formSuccess ? 'success' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (section === 'cart') setSection('shipping');
              if (section === 'shipping') setSection('payment');
              if (section === 'payment') handleSubmit();
            }}
          >
            {isSubmitting ? (
              <div className="loading-spinner" />
            ) : formSuccess ? (
              <Check className="success-icon" />
            ) : section === 'payment' ? (
              'Pay Now'
            ) : (
              'Continue'
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// Also keep default export for backward compatibility
export default Cart;