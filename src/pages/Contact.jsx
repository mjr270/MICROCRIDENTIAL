import React, { useState } from "react";
import { burstConfetti } from "../utils/confetti";

const initialState = { name: "", email: "", message: "" };

const Contact = () => {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim()) return "Please enter your email.";
    // basic email pattern
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(formData.email)) return "Please enter a valid email address.";
    if (!formData.message.trim()) return "Please enter a message.";
    if (formData.message.length < 10) return "Message should be at least 10 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const error = validate();
    if (error) {
      setStatus({ type: "error", message: error });
      return;
    }

    setSubmitting(true);
    try {
      // Placeholder: send to a real API endpoint in production
      const resp = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) throw new Error("Failed to submit. Please try again later.");

  setStatus({ type: "success", message: `Thank you ${formData.name}! We received your message.` });
  // celebrate!
  try { burstConfetti({ count: 20 }); } catch (e) {}
      setFormData(initialState);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Submission failed." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <main className="flex-grow p-6 bg-gray-50 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">Contact Us</h1>
          <p className="text-center text-gray-600 mb-8">Have questions or feedback? We&apos;d love to hear from you. Use the form or reach us directly using the details on the right.</p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <section aria-labelledby="contact-form" className="bg-white p-6 rounded-xl shadow-lg animate-pop smooth-transform">
              <h2 id="contact-form" className="text-2xl font-semibold mb-4">Send a message</h2>

              {status.message && (
                <div
                  role="status"
                  className={`mb-4 p-3 rounded ${status.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"} animate-fade-in`}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required
                    className="mt-1 block w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your full name"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required
                    className="mt-1 block w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Message</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required
                    className="mt-1 block w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-36"
                    placeholder="Tell us how we can help..."
                  />
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center px-5 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-60 smooth-transform hover:scale-105"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(initialState)}
                    className="px-4 py-2 border rounded text-gray-700 hover:border-gray-400 smooth-transform hover:scale-105"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </section>

            {/* Contact Info / Map */}
            <aside className="bg-white p-6 rounded-xl shadow-lg flex flex-col justify-between animate-slide-up smooth-transform">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Our Office</h2>
                <p className="text-gray-600 mb-4">123 MicroCred Street<br/>Knowledge City, Earth</p>

                <div className="mb-4">
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:hello@microcred.example" className="text-blue-600">hello@microcred.example</a>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium">Phone</h3>
                  <a href="tel:+1234567890" className="text-gray-700">+1 (234) 567-890</a>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium">Hours</h3>
                  <p className="text-gray-600">Mon — Fri: 9:00 — 17:00</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">Map Placeholder</div>
                <p className="text-xs text-gray-500 mt-2">Map is a placeholder. Replace with an embedded map component or iframe.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
