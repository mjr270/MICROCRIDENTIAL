import React, { useState } from "react";
import { burstConfetti } from "../utils/confetti";
import "../Style/Contact.css";

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
    <div className="contact-page">
      <main className="contact-main">
        <div className="contact-container">
          <div className="contact-header">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">Have questions or feedback? We&apos;d love to hear from you. Use the form or reach us directly using the details on the right.</p>
          </div>

          <div className="contact-grid">
            {/* Contact Form */}
            <section aria-labelledby="contact-form" className="contact-form-section">
              <h2 id="contact-form" className="contact-form-title">Send a message</h2>

              {status.message && (
                <div
                  role="status"
                  className={`contact-status ${status.type === "success" ? "contact-status-success" : "contact-status-error"}`}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <label className="contact-form-group">
                  <span className="contact-label">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required
                    className="contact-input"
                    placeholder="Your full name"
                  />
                </label>

                <label className="contact-form-group">
                  <span className="contact-label">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required
                    className="contact-input"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="contact-form-group">
                  <span className="contact-label">Message</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required
                    className="contact-textarea"
                    placeholder="Tell us how we can help..."
                  />
                </label>

                <div className="contact-form-buttons">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="contact-button contact-button-submit"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(initialState)}
                    className="contact-button contact-button-reset"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </section>

            {/* Contact Info / Map */}
            <aside className="contact-info-section">
              <div>
                <h2 className="contact-info-title">Our Office</h2>
                <p className="contact-info-address">123 MicroCred Street<br/>Knowledge City, Earth</p>

                <div className="contact-info-item">
                  <h3 className="contact-info-label">Email</h3>
                  <a href="mailto:hello@microcred.example" className="contact-info-link">hello@KaushalLink.example</a>
                </div>

                <div className="contact-info-item">
                  <h3 className="contact-info-label">Phone</h3>
                  <a href="tel:+1234567890" className="contact-info-text">+1 (234) 567-890</a>
                </div>

                <div className="contact-info-item">
                  <h3 className="contact-info-label">Hours</h3>
                  <p className="contact-info-text">Mon — Fri: 9:00 — 17:00</p>
                </div>
              </div>

              <div className="contact-map">
                <div className="contact-map-placeholder">Map Placeholder</div>
                <p className="contact-map-note">Map is a placeholder. Replace with an embedded map component or iframe.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
