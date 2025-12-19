import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Globe } from "lucide-react";
import "../Style/Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Brand */}
          <Link
            to="/"
            className="footer-brand"
          >
           KaushalLink
          </Link>

          {/* (Links moved to Navbar) */}
          <div className="footer-spacer"> 
            {/* Intentionally left blank; primary navigation is in the Navbar */}
          </div>

          {/* Social Icons */}
          <div className="footer-social">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <Github className="footer-social-icon" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <Linkedin className="footer-social-icon" />
            </a>
            <a
              href="https://kaushallink.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Website"
            >
              <Globe className="footer-social-icon" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom Section */}
        <div className="footer-bottom">
          © {year} <span className="brand-name">KaushalLink</span> — A demo micro-credential
          frontend built with <span className="tech-stack">React + TailwindCSS</span>.
          <br className="line-break" /> All rights reserved.
        </div>
      </div>
    </footer>
  );
}
