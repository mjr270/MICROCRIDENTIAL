import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import {
  ShieldCheck,
  UploadCloud,
  Users,
  BadgeCheck,
  Star,
  Globe,
  BookOpen,
  Building,
} from "lucide-react";

export default function LandingPage() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const openImage = (src) => {
    if (src && src !== imageSrc) setImageSrc(src);
    setImgLoading(true);
    setIsOpen(true);
  };
  const closeImage = () => setIsOpen(false);

  const heroSrcDefault =
    "https://t4.ftcdn.net/jpg/01/99/95/19/360_F_199951929_ESl4xOIf7mQYe5uqMNsLVexQO2Pxrfgw.jpg";
  const fallbackSrc = "https://picsum.photos/1024/768?random=1";

  const [imageSrc, setImageSrc] = useState(heroSrcDefault);
  const [imgLoading, setImgLoading] = useState(true);

  const handleImgError = () => {
    if (imageSrc !== fallbackSrc) setImageSrc(fallbackSrc);
  };
  const handleImgLoad = () => setImgLoading(false);

  // sample data for cards and partners
  const stats = [
    { label: "Learners", value: "18k+", color: "bg-blue-50" },
    { label: "Institutions", value: "450+", color: "bg-green-50" },
    { label: "Credentials Issued", value: "24k+", color: "bg-yellow-50" },
  ];

  const courses = [
    { id: 1, title: "Web Dev Basics", issuer: "MicroCred Academy", img: "https://picsum.photos/400/240?random=11" },
    { id: 2, title: "React Frontend Essentials", issuer: "MicroCred Pro", img: "https://picsum.photos/400/240?random=12" },
    { id: 3, title: "Data Literacy", issuer: "Data Institute", img: "https://picsum.photos/400/240?random=13" },
  ];

  const partners = [
    { name: "ABC Institute", logo: "https://picsum.photos/200/80?random=21" },
    { name: "Global University", logo: "https://picsum.photos/200/80?random=22" },
    { name: "Career Hub", logo: "https://picsum.photos/200/80?random=23" },
    { name: "Tech Labs", logo: "https://picsum.photos/200/80?random=24" },
  ];

  const testimonials = [
    { id: 1, name: "Ayesha R.", note: "KaushalLink helped our students showcase short courses — employers love the verifiable badges!" },
    { id: 2, name: "Mark D.", note: "Fast, secure verification and seamless integration for our institution." },
  ];

  // newsletter state
  const [email, setEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // simple email validation
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) {
      setNewsletterMsg("Please enter a valid email.");
      return;
    }
    // simulate subscribe
    setNewsletterMsg("Thanks — we'll keep you updated!");
    setEmail("");
    setTimeout(() => setNewsletterMsg(""), 4000);
  };

  // gallery images: user-provided Adobe image and data URIs + placeholders
  const imageGallery = [
    // Adobe/stock image (from user's link)
    "https://t4.ftcdn.net/jpg/01/99/95/19/360_F_199951929_ESl4xOIf7mQYe5uqMNsLVexQO2Pxrfgw.jpg",
    // The user-provided data URIs (trimmed if necessary) - using the full strings from the user's message
    "data:image/jpeg;base64,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",
    // second data URI (shorter sample to avoid extremely large file in repo)
    "data:image/jpeg;base64,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"
    ,
    // small placeholders
    "https://picsum.photos/600/360?random=31",
    "https://picsum.photos/600/360?random=32",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
      {/* HERO */}
      <header className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight mb-4 text-blue-700 dark:text-blue-400">
            Build, Share, and Verify Micro-credentials — instantly.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-lg">
            Empower learners, institutions, and employers with verifiable, portable micro-credentials. Fast issuer onboarding, secure verification, and discoverable credentials.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <Link to="/register" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
              Get Started
            </Link>
            {!user && (
              <Link to="/login" className="inline-flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-lg hover:border-blue-500">
                Sign In
              </Link>
            )}
            <a href="#features" className="inline-flex items-center gap-2 px-5 py-3 bg-white border rounded-lg">
              Learn More
            </a>
          </div>

          <div className="flex gap-4 items-center">
            {stats.map((s) => (
              <div key={s.label} className="p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800">
                <div className="text-sm text-gray-500">{s.label}</div>
                <div className="text-xl font-bold">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="w-full max-w-3xl mx-auto rounded-xl shadow-lg overflow-hidden">
            {imgLoading && (
              <div className="w-full h-64 flex items-center justify-center bg-gray-100">
                <div className="text-sm text-gray-500">Loading image…</div>
              </div>
            )}
            <button onClick={openImage} className="w-full block focus:outline-none">
              <img src={imageSrc} alt="Hero" onError={handleImgError} onLoad={handleImgLoad} className="w-full h-auto object-cover" />
            </button>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">What you can do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <UploadCloud className="w-8 h-8 text-blue-600" />, title: 'Issue & Upload', desc: 'Create verified credentials in minutes.' },
            { icon: <BadgeCheck className="w-8 h-8 text-green-600" />, title: 'Verify', desc: 'Built-in verification for employers and institutions.' },
            { icon: <Users className="w-8 h-8 text-yellow-500" />, title: 'Manage Learners', desc: 'Role-based dashboards and reporting.' },
          ].map((f, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES / CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Featured micro-credentials</h3>
          <Link to="/upload" className="text-sm text-blue-600">Browse all</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div key={c.id} className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
              <img src={c.img} alt={c.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h4 className="font-semibold">{c.title}</h4>
                <div className="text-sm text-gray-500 mb-3">{c.issuer}</div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">Verified</div>
                  <Link to="/upload" className="text-blue-600 text-sm">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS / INSTITUTES */}
      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-12" id="how-it-works">
        <h3 className="text-2xl font-bold text-center mb-6">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <div className="text-3xl text-blue-600 mb-3">1</div>
            <h4 className="font-semibold mb-2">Create micro-credentials</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Issuers create short, verifiable credentials using our templates and metadata fields.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <div className="text-3xl text-blue-600 mb-3">2</div>
            <h4 className="font-semibold mb-2">Share with learners</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Learners receive credentials that they can share publicly or privately with employers.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <div className="text-3xl text-blue-600 mb-3">3</div>
            <h4 className="font-semibold mb-2">Verify instantly</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">Employers and institutions verify credentials with one click — no manual checks.</p>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SIGNUP */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-xl font-bold">Stay in the loop</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Subscribe to product updates, partner news, and upcoming features.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full md:w-auto">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your email"
                className="px-4 py-3 rounded-lg border w-full md:w-80 focus:ring-2 focus:ring-blue-300"
                aria-label="Email address"
              />
              <button type="submit" className="px-4 py-3 bg-blue-600 text-white rounded-lg">Subscribe</button>
            </form>
          </div>
          {newsletterMsg && <div className="mt-4 text-sm text-green-600">{newsletterMsg}</div>}
        </div>
      </section>
      {/* Gallery removed — hero now uses the main Adobe image with fallback */}

      <section className="bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-extrabold">Trusted by institutions worldwide</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">Universities, training providers, and employers use KaushalLink to issue, share and verify short-form credentials.</p>
            <div className="mt-4 inline-flex items-center gap-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow">
              <div className="text-lg font-bold text-blue-600">450+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">institutions onboarded</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((p) => (
              <div key={p.name} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition flex items-center gap-3">
                <div className="flex-shrink-0 w-20 h-12 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded">
                  <img src={p.logo} alt={p.name} className="max-h-10 object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-xs text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">Verified</div>
                  </div>
                  <div className="text-xs text-gray-500">Partner since 2023</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-center mb-8">What people say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-blue-100 text-blue-600 rounded-full p-3"><Star className="w-5 h-5" /></div>
                <div className="font-semibold">{t.name}</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
          <p className="mb-6 text-blue-100">Create your first micro-credential and make it discoverable to employers and institutions worldwide.</p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold">Create account</Link>
            <Link to="/upload" className="px-6 py-3 border border-white rounded-lg">Upload credential</Link>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {isOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={closeImage}>
          <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden max-w-4xl w-full shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-3 flex justify-end">
              <button onClick={closeImage} className="text-gray-600 dark:text-gray-300 hover:text-gray-900">Close</button>
            </div>
            <img src={imageSrc} alt="Hero large" className="w-full h-auto" onError={handleImgError} />
          </div>
        </div>
      )}

      <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-12">
        © {new Date().getFullYear()} KaushalLink — built with ❤️ for modern learning.
      </footer>
    </div>
  );
}
