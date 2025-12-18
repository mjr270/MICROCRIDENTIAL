import React from "react";
import { FaLaptopCode, FaUsers, FaGraduationCap, FaCertificate, FaBuilding } from "react-icons/fa";
import "../Style/About.css";

const About = () => {
  const features = [
    { icon: <FaLaptopCode />, title: "Tech-Focused", desc: "Hands-on courses that build job-ready technical skills." },
    { icon: <FaGraduationCap />, title: "Verified Credentials", desc: "Issue verifiable certificates trusted by employers." },
    { icon: <FaUsers />, title: "Community", desc: "Mentorship, study groups, and a thriving learner network." },
  ];

  const stats = [
    { label: "Learners", value: "12,400+" },
    { label: "Institutions", value: "85" },
    { label: "Verified Courses", value: "420" },
    { label: "Partners", value: "60+" },
  ];

  const team = [
    { name: "Aisha Khan", role: "CEO", bio: "Passionate about accessible education and credentialing." },
    { name: "Miguel Reyes", role: "CTO", bio: "Builds scalable systems and developer tools." },
    { name: "Priya Patel", role: "Head of Learning", bio: "Designs curriculum and verifies courses." },
  ];

  const testimonials = [
    { id: 1, quote: "KaushalLink helped me land my first developer role — the certificates mattered.", author: "Jordan M., Developer" },
    { id: 2, quote: "Our institution relies on KaushalLink to certify short professional courses.", author: "Dr. L. Wang, Partner" },
  ];

  return (
    <div className="about-page">
      <main className="about-main">
        <section className="about-hero">
          <h1 className="about-title">About KaushalLink</h1>
          <p className="about-description">We make micro-credentials practical and trusted — for learners, institutions, and employers. Learn the skills that matter and get verified when you succeed.</p>

          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={s.label} className="stat-card" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mission-section">
          <div className="mission-content">
            <h2 className="mission-title">Our mission</h2>
            <p className="mission-text">KaushalLink empowers learners with short, verified learning experiences that map directly to industry needs. We partner with institutions and employers to make credentials meaningful and portable.</p>

            <div className="features-grid">
              {features.map((f, i) => (
                <div key={i} className="feature-card">
                  <div className="feature-icon">{f.icon}</div>
                  <div>
                    <div className="feature-title">{f.title}</div>
                    <div className="feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="why-box">
            <h3 className="why-title">Why KaushalLink?</h3>
            <ul className="why-list">
              <li>Short, focused courses built with industry partners.</li>
              <li>Verifiable badges & certificates employers can trust.</li>
              <li>Flexible pathways: stackable credentials and reskilling.</li>
            </ul>
          </div>
        </section>

        <section className="team-section">
          <h2 className="section-title">Meet the team</h2>
          <div className="team-grid">
            {team.map((m, i) => (
              <div key={m.name} className="team-card" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="team-avatar">{m.name.split(' ').map(n=>n[0]).join('')}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <p className="team-bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-6">What people say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.id} className="testimonial-card" style={{ animationDelay: `${i * 80}ms` }}>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">— {t.author}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <h3 className="cta-title">Ready to get started?</h3>
          <div className="cta-buttons">
            <a href="/register" className="cta-button cta-button-primary">Join as Learner</a>
            <a href="/contact" className="cta-button cta-button-secondary">Contact Sales</a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
