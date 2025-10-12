import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been sent.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 bg-gray-50">
        <h1 className="text-5xl font-bold mb-6 text-center">Contact Us</h1>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full mb-4 p-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full mb-4 p-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required className="w-full mb-4 p-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"></textarea>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">Send Message</button>
          </form>

          {/* Map / Info */}
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-semibold mb-4">Our Office</h2>
            <p className="text-gray-600 mb-4">123 MicroCred Street, Knowledge City, Earth</p>
            <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center text-gray-500">Map Placeholder</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
