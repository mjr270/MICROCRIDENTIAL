import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Globe } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <Link
            to="/"
            className="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 transition"
          >
           KaushalLink
          </Link>

          {/* (Links moved to Navbar) */}
          <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400"> 
            {/* Intentionally left blank; primary navigation is in the Navbar */}
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 text-gray-500">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://microcred.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
              aria-label="Website"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-6" />

        {/* Bottom Section */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          © {year} <span className="font-medium">MicroCred</span> — A demo micro-credential
          frontend built with <span className="text-blue-600 font-medium">React + TailwindCSS</span>.
          <br className="sm:hidden" /> All rights reserved.
        </div>
      </div>
    </footer>
  );
}
