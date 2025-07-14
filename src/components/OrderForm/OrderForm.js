import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

const OrderForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    natas: '',
    delivery: 'inside',
    deliveryDay: '',
    preferredTime: '',
    contactMethod: '',
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusSuccess, setStatusSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const n = parseInt(formData.natas, 10);
    if (isNaN(n)) {
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
      if (value === '' || /^[0-9]*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    if (e.target.name === 'natas') {
      let n = parseInt(formData.natas, 10);
      if (isNaN(n) || n < 1) n = 1;
      else if (n > 500) n = 500;
      setFormData((prev) => ({ ...prev, natas: n.toString() }));
    }
  };

  const handleFinalSubmit = () => {
    const n = parseInt(formData.natas, 10);
    const templateParams = {
      title: 'New Order from Nata-Nord Tallinn',
      name: formData.name,
      email: formData.email,
      phone: formData.phone || 'N/A',
      natas: n.toString(),
      delivery: formData.delivery,
      deliveryDay: formData.deliveryDay,
      preferredTime: formData.preferredTime,
      contactMethod: formData.contactMethod,
      total: totalPrice.toString(),
      confirmationMessage: `Dear ${formData.name},\n\nThank you for your order! We will contact you via ${formData.contactMethod || 'your preferred contact method'} to confirm your order and schedule the delivery time.\n\nPreferred payment is cash upon delivery, but we also accept bank transfers.\n\nBest regards,\nNata-Nord Tallinn Team`,
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
          natas: '',
          delivery: 'inside',
          deliveryDay: '',
          preferredTime: '',
          contactMethod: '',
        });
        setTotalPrice(0);
        setShowConfirmation(false);
      })
      .catch((error) => {
        console.error('EmailJS error details:', error);
        setStatusMessage(t('orderForm.errors.sendFailed'));
        setStatusSuccess(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const n = parseInt(formData.natas, 10);
    if (
      !formData.name ||
      !formData.email ||
      !formData.deliveryDay ||
      !formData.preferredTime ||
      !formData.contactMethod ||
      isNaN(n) || n < 1 || n > 500
    ) {
      setStatusMessage(t('orderForm.errors.invalidNatas'));
      setStatusSuccess(false);
      return;
    }

    setShowConfirmation(true);
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <form onSubmit={handleSubmit}>
        <label>
          {t('orderForm.labels.name')}*:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </label>

        <label>
          {t('orderForm.labels.email')}*:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </label>

        <label>
          {t('orderForm.labels.phone')}:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('orderForm.placeholders.phone')} style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </label>

<label>
  {t('orderForm.labels.contactPreference')}*:
  <select
    name="contactMethod"
    value={formData.contactMethod}
    onChange={handleChange}
    required
    style={{ width: '100%', padding: '8px', margin: '5px 0' }}
  >
    <option value="">{t('orderForm.placeholders.contactPreference')}</option>
    <option value="email">{t('orderForm.contactMethods.email')}</option>
    <option value="phone">{t('orderForm.contactMethods.phone')}</option>
    <option value="sms">{t('orderForm.contactMethods.sms') || 'SMS'}</option>
  </select>
</label>


        <label>
          {t('orderForm.labels.natas')}* ({t('orderForm.labels.min')}):
          <input type="number" name="natas" value={formData.natas} onChange={handleChange} onBlur={handleBlur} min={1} max={500} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </label>

        <label>
          {t('orderForm.labels.deliveryLocation')}*:
          <select name="delivery" value={formData.delivery} onChange={handleChange} required style={{ width: '100%', padding: '8px', margin: '5px 0' }}>
            <option value="inside">{t('orderForm.deliveryOptions.inside')}</option>
            <option value="outside">{t('orderForm.deliveryOptions.outside')}</option>
          </select>
        </label>

        <label>
          {t('orderForm.labels.deliveryDay')}*:
          <input type="date" name="deliveryDay" value={formData.deliveryDay} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </label>

        <label>
          {t('orderForm.labels.preferredTime')}*:
          <input type="text" name="preferredTime" value={formData.preferredTime} onChange={handleChange} placeholder={t('orderForm.placeholders.preferredTime')} required style={{ width: '100%', padding: '8px', margin: '5px 0' }} />
        </label>

        <p><strong>{t('orderForm.totalPrice')}: €{totalPrice}</strong></p>

        <button type="submit" style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#d69f2d', color: '#fff', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', width: '100%' }}>
          {t('orderForm.buttons.sendOrder')}
        </button>

        {statusMessage && (
          <p style={{ marginTop: '10px', color: statusSuccess ? 'green' : 'red', fontWeight: '600' }} role="alert">
            {statusMessage}
          </p>
        )}
      </form>

      {showConfirmation && (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#fafafa' }}>
          <h3>{t('orderForm.confirmationTitle')}</h3>
          <p><strong>{t('orderForm.labels.name')}:</strong> {formData.name}</p>
          <p><strong>{t('orderForm.labels.email')}:</strong> {formData.email}</p>
          <p><strong>{t('orderForm.labels.phone')}:</strong> {formData.phone || '—'}</p>
          <p><strong>{t('orderForm.labels.contactMethod')}:</strong> {formData.contactMethod}</p>
          <p><strong>{t('orderForm.labels.natas')}:</strong> {formData.natas}</p>
          <p><strong>{t('orderForm.labels.deliveryLocation')}:</strong> {formData.delivery}</p>
          <p><strong>{t('orderForm.labels.deliveryDay')}:</strong> {formData.deliveryDay}</p>
          <p><strong>{t('orderForm.labels.preferredTime')}:</strong> {formData.preferredTime}</p>
          <p><strong>{t('orderForm.totalPrice')}:</strong> €{totalPrice}</p>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <button onClick={handleFinalSubmit} style={{ padding: '10px 20px', backgroundColor: 'green', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>
              {t('orderForm.buttons.confirmOrder')}
            </button>
            <button onClick={() => setShowConfirmation(false)} style={{ padding: '10px 20px', backgroundColor: 'red', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>
              {t('orderForm.buttons.cancel')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
