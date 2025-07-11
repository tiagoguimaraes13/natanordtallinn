import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    natas: 6,
    delivery: 'inside',
    deliveryDay: '',        // New field for delivery day
    preferredTime: '',      // New field for preferred time
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');

  // Calculate total price whenever natas or delivery changes
  useEffect(() => {
    const n = formData.natas;
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
      else if (n > 100) n = 100;
      setFormData((prev) => ({ ...prev, [name]: n }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setStatusMessage('Please fill out required fields: Name and Email.');
      return;
    }

    if (!formData.deliveryDay || !formData.preferredTime) {
      setStatusMessage('Please specify delivery day and preferred time.');
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
        setStatusMessage('Order sent successfully!');
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
        setStatusMessage('Failed to send order. Please try again.');
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: '500px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}
    >
      <label>
        Name*:
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
        Email*:
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
        Phone:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Optional"
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </label>

      <label>
        Number of Natas* (min 6):
        <input
          type="number"
          name="natas"
          value={formData.natas}
          min={6}
          max={100}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </label>

      <label>
        Delivery Location*:
        <select
          name="delivery"
          value={formData.delivery}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        >
          <option value="inside">Inside Tallinn</option>
          <option value="outside">Outside Tallinn</option>
        </select>
      </label>

      <label>
        Delivery Day*:
        <input
          type="date"
          name="deliveryDay"
          value={formData.deliveryDay}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </label>

      <label>
        Preferred Time*:
        <input
          type="text"
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleChange}
          placeholder="e.g., 14:00 - 16:00"
          required
          style={{ width: '100%', padding: '8px', margin: '5px 0' }}
        />
      </label>

      <p>
        <strong>Total Price: €{totalPrice}</strong>
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
        Send Order
      </button>

      {statusMessage && (
        <p
          style={{
            marginTop: '10px',
            color: statusMessage.includes('successfully') ? 'green' : 'red',
            fontWeight: '600',
          }}
        >
          {statusMessage}
        </p>
      )}
    </form>
  );
};

export default OrderForm;
