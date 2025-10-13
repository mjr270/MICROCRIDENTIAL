import React from "react";
import { FaLaptopCode, FaUsers, FaGraduationCap, FaCertificate, FaBuilding } from "react-icons/fa";

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
    { id: 1, quote: "MicroCred helped me land my first developer role — the certificates mattered.", author: "Jordan M., Developer" },
    { id: 2, quote: "Our institution relies on MicroCred to certify short professional courses.", author: "Dr. L. Wang, Partner" },
  ];

  return (
    <div className="flex flex-col">
      <main className="flex-grow p-6 bg-gradient-to-b from-white to-blue-50">
  <section className="max-w-6xl mx-auto text-center py-12 animate-slide-up">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>About MicroCred</h1>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-6">We make micro-credentials practical and trusted — for learners, institutions, and employers. Learn the skills that matter and get verified when you succeed.</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {stats.map((s, i) => (
              <div key={s.label} className="bg-white p-4 rounded-lg shadow smooth-transform hover:scale-105 animate-pop" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="text-sm text-gray-500">{s.label}</div>
                <div className="text-xl font-semibold">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center mb-12">
            <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-semibold">Our mission</h2>
            <p className="text-gray-700">MicroCred empowers learners with short, verified learning experiences that map directly to industry needs. We partner with institutions and employers to make credentials meaningful and portable.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {features.map((f, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow flex items-start gap-3">
                  <div className="text-blue-600 text-2xl mt-1">{f.icon}</div>
                  <div>
                    <div className="font-medium">{f.title}</div>
                    <div className="text-sm text-gray-600">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

            <div className="bg-white p-6 rounded-lg shadow animate-pop">
            <h3 className="font-semibold mb-2">Why MicroCred?</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Short, focused courses built with industry partners.</li>
              <li>Verifiable badges & certificates employers can trust.</li>
              <li>Flexible pathways: stackable credentials and reskilling.</li>
            </ul>
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-6">Meet the team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <div key={m.name} className="bg-white p-4 rounded-lg shadow text-center smooth-transform hover:translate-y-1 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-2xl font-semibold text-blue-700 mb-3">{m.name.split(' ').map(n=>n[0]).join('')}</div>
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-gray-500">{m.role}</div>
                <p className="text-sm text-gray-600 mt-2">{m.bio}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-6">What people say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={t.id} className="bg-white p-4 rounded-lg shadow animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                <p className="text-gray-700">“{t.quote}”</p>
                <div className="text-sm text-gray-500 mt-3">— {t.author}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto text-center py-8">
          <h3 className="text-xl font-semibold mb-3">Ready to get started?</h3>
          <div className="flex items-center justify-center gap-4">
            <a href="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg smooth-transform hover:scale-105 transition">Join as Learner</a>
            <a href="/contact" className="px-6 py-3 border rounded-lg smooth-transform hover:scale-105 transition">Contact Sales</a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
