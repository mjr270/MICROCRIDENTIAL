import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, UploadCloud, Users, BadgeCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100 min-h-screen flex flex-col justify-between">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-700 dark:text-blue-400 tracking-tight">
          MicroCred
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Empowering learners, institutions, and employers with a unified
          platform to create, manage, and verify micro-credentials securely and
          instantly.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-gray-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-12">
          <img
            src="https://cdn.dribbble.com/userupload/11634377/file/original-1330bb7718d2.png?resize=1024x768"
            alt="MicroCred illustration"
            className="w-full max-w-3xl mx-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Why Choose MicroCred?
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {[
            {
              icon: <UploadCloud className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
              title: "Easy Uploads",
              desc: "Upload, manage, and store credentials securely in a few clicks.",
            },
            {
              icon: <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
              title: "Secure Verification",
              desc: "Blockchain-ready verification ensures document authenticity.",
            },
            {
              icon: <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
              title: "Role-based Access",
              desc: "Different dashboards for Learners, Institutions, Employers, and Admins.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="mb-4 flex justify-center">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-center">{f.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Join the Future of Credential Management
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-blue-100">
          Start uploading, verifying, and sharing credentials securely today.
        </p>
        <Link
          to="/register"
          className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} MicroCred. All rights reserved.
      </footer>
    </div>
  );
}
