import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

const OrderForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    natas: 6,
    delivery: 'inside',
    deliveryDay: '',
    preferredTime: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusSuccess, setStatusSuccess] = useState(false);

  // Calculate total price whenever natas or delivery changes
  useEffect(() => {
    const n = formData.natas;
    if (!n || n < 6) {
      setTotalPrice(0);
      return;
    }
    let pricePerUnit = n >= 11 ? 1 : 1.25;

    let deliveryCost = 0;
    if (formData.delivery === 'inside') {
      deliveryCost = n < 20 ? 2 : 0;
    } else {
      deliveryCost = n < 20 ? 5 : 3;
    }

    const total = n * pricePerUnit + deliveryCost;
    setTotalPrice(total.toFixed(2));
  }, [formData.natas, formData.delivery]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'natas') {
      let n = parseInt(value, 10);
      if (isNaN(n) || n < 6) n = 6;
      else if (n > 500) n = 500;
      setFormData((prev) => ({ ...prev, [name]: n }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setStatusMessage(t('orderForm.errors.requiredFields'));
      setStatusSuccess(false);
      return;
    }

    if (!formData.deliveryDay || !formData.preferredTime) {
      setStatusMessage(t('orderForm.errors.deliveryDetails'));
      setStatusSuccess(false);
      return;
    }

    const templateParams = {
      title: "New Order from Nata-Nord Tallinn",
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'N/A',
      natas: formData.natas.toString(),
      delivery: formData.delivery,
      deliveryDay: formData.deliveryDay,
      preferredTime: formData.preferredTime,
      total: totalPrice.toString(),
      confirmationMessage: `
        Dear ${formData.name},

        Thank you for your order! We will contact you soon to confirm your order and schedule the delivery time.

        Preferred payment is cash upon delivery, but we also accept bank transfers.

        Best regards,
        Nata-Nord Tallinn Team
      `,
    };

    emailjs
      .send(
        'service_nps8917',
        'template_y1hgplh',
        templateParams,
        'KCPKWCL1tWAyr6yl0'
      )
      .then(() => {
        setStatusMessage(t('orderForm.successMessage'));
        setStatusSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          natas: 6,
          delivery: 'inside',
          deliveryDay: '',
          preferredTime: '',
        });
        setTotalPrice(0);
      })
      .catch((error) => {
        console.error('EmailJS error details:', error);
        setStatusMessage(t('orderForm.errors.sendFailed'));
        setStatusSuccess(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: '500px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}
    >
      <label>
        {t('orderForm.labels.name')}*:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </label>

      <label>
        {t('orderForm.labels.email')}*:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </label>

      <label>
        {t('orderForm.labels.phone')}:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t('orderForm.placeholders.phone')}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </label>

      <label>
        {t('orderForm.labels.natas')}* ({t('orderForm.labels.min')} 6):
        <input
          type="number"
          name="natas"
          value={formData.natas}
          min={6}
          max={500}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </label>

      <label>
        {t('orderForm.labels.deliveryLocation')}*:
        <select
          name="delivery"
          value={formData.delivery}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        >
          <option value="inside">{t('orderForm.deliveryOptions.inside')}</option>
          <option value="outside">{t('orderForm.deliveryOptions.outside')}</option>
        </select>
      </label>

      <label>
        {t('orderForm.labels.deliveryDay')}*:
        <input
          type="date"
          name="deliveryDay"
          value={formData.deliveryDay}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
          min={new Date().toISOString().split('T')[0]} // delivery date can't be in the past
        />
      </label>

      <label>
        {t('orderForm.labels.preferredTime')}*:
        <input
          type="text"
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleChange}
          placeholder={t('orderForm.placeholders.preferredTime')}
          required
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </label>

      <p>
        <strong>{t('orderForm.totalPrice')}: €{totalPrice}</strong>
      </p>

      <button
        type="submit"
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          backgroundColor: '#d69f2d',
          color: '#fff',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '600',
          width: '100%',
        }}
      >
        {t('orderForm.buttons.sendOrder')}
      </button>

      {statusMessage && (
        <p
          style={{
            marginTop: '10px',
            color: statusSuccess ? 'green' : 'red',
            fontWeight: '600',
          }}
          role="alert"
        >
          {statusMessage}
        </p>
      )}
    </form>
  );
};

export default OrderForm;
