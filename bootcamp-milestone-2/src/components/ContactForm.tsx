'use client';

import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const result = await emailjs.send(
          'service_24ustej', // Your Service ID
          'template_eozbpsj', // Your Template ID
          formData,
          '3fBU1KtV-kTihJLY2' // Your Public Key
        );

      setSubmitStatus('Email sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('An error occurred while sending the email.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

<label htmlFor="message">Message:</label>
<textarea
  id="message"
  name="message"
  value={formData.message}
  onChange={handleChange}
  required
></textarea>

      <button type="submit">Submit</button>
      {submitStatus && <p>{submitStatus}</p>}
    </form>
  );
}