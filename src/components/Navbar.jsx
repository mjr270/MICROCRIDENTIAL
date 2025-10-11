import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { Menu, X } from "lucide-react"; // icons

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/upload", label: "Upload", roles: ["Institution", "Admin"] },
    { to: "/verify", label: "Verify", roles: ["Admin", "Employer"] },
    { to: "/dashboard", label: "Dashboard", roles: ["Learner", "Institution", "Employer", "Admin"] },
  ];

  const visibleLinks = navLinks.filter(
    (link) => !link.roles || (user && link.roles.includes(user.role))
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="font-extrabold text-2xl text-blue-600 dark:text-blue-400 hover:text-blue-700 transition"
        >
          MicroCred
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-medium hover:text-blue-600 transition ${
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-200"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-300">
                {user.email} <span className="text-xs text-gray-400">({user.role})</span>
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 border border-gray-300 hover:border-blue-500 text-gray-700 dark:text-gray-200 rounded-md transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 pb-3 space-y-3 transition-all">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 font-medium ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-200"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="block text-sm text-gray-600 dark:text-gray-300 mb-2">
                {user.email} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-2 border border-gray-300 hover:border-blue-500 rounded-md text-gray-700 dark:text-gray-200"
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
