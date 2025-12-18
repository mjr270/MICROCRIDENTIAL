import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { Menu, X } from "lucide-react"; // icons
import { useLanguage } from "../context/LanguageContext.jsx";
import "../Style/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  

  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { to: "/", label: t('home') },
    { to: "/about", label: t('about') },
    { to: "/contact", label: t('contact') },
    { to: "/upload", label: t('upload'), roles: ["Learner", "Institution"] },
    { to: "/verify", label: t('verify'), roles: ["Admin", "Employer"] },
    { to: "/dashboard", label: t('dashboard'), roles: ["Learner", "Institution", "Employer", "Admin"] },
  ];

  const visibleLinks = navLinks.filter(
    (link) => !link.roles || (user && link.roles.includes(user.role))
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand"
        >
         KaushalLink
        </Link>

        {/* Desktop Links */}
        <div className="navbar-desktop-links">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "active" : ""
                  }`
                }
              >
                Profile
              </NavLink>
              <span className="user-email-badge">
                {user.email} <span className="role">({user.role})</span>
              </span>
              <button
                onClick={handleLogout}
                className="logout-btn"
              >
                Logout
              </button>
              {/* Language selector */}
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="language-selector">
                <option value="en">EN</option>
                <option value="hi">HI</option>
                <option value="bn">BN</option>
                <option value="ta">TA</option>
                <option value="te">TE</option>
              </select>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="login-btn"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="register-btn"
              >
                Register
              </Link>
              <select value={lang} onChange={(e) => setLang(e.target.value)} className="language-selector">
                <option value="en">EN</option>
                <option value="hi">HI</option>
                <option value="bn">BN</option>
                <option value="ta">TA</option>
                <option value="te">TE</option>
              </select>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `mobile-nav-link ${
                  isActive
                    ? "active"
                    : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <div className="mobile-user-section">
              <span className="mobile-user-email">
                {user.email} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="mobile-logout-btn"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="mobile-auth-section">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="mobile-login-btn"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="mobile-register-btn"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
