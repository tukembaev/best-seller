'use client'
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can integrate with NextAPI for form submission
    console.log('Form submitted:', formData);
    // Reset form or show success message
    setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
  };

  const maxChars = 200;
  const remainingChars = maxChars - formData.message.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label htmlFor="firstName" className="block text-xs font-medium text-slate-700 mb-1">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="First name"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="lastName" className="block text-xs font-medium text-slate-700 mb-1">
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Last name"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">
          Your email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Your email"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-xs font-medium text-slate-700 mb-1">
          Phone number
        </label>
        <div className="flex">
          <select className="px-2 py-2 text-sm border border-r-0 border-slate-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
            <option>+7</option>
            <option>+1</option>
            <option>+44</option>
          </select>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="flex-1 px-3 py-2 text-sm border border-l-0 border-slate-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Phone number"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-medium text-slate-700 mb-1">
          How can we help?
        </label>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            placeholder="How can we help?"
            maxLength={maxChars}
          />
          <div className="absolute bottom-2 right-2 text-xs text-slate-500">
            {remainingChars}/{maxChars}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 hover:scale-103 active:scale-95 transition font-semibold text-sm"
      >
        Submit
      </button>
      <p className="text-xs text-slate-500 text-center">
        By contacting us, you agree to our{' '}
        <a href="#" className="text-blue-500 hover:underline">Terms of service</a>{' '}
        and{' '}
        <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
      </p>
    </form>
  );
}