import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { Mail, Lock, UserCircle2, LogIn, Eye, EyeOff } from "lucide-react";
import { burstConfetti } from "../utils/confetti";
import "../Style/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple validation
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setError("");
    setStatus("Signing in...");

    // Use new authentication system
    import('../data/users').then(({ authenticateUser }) => {
      const result = authenticateUser(email, password);
      
      setStatus(null);
      
      if (result.success) {
        // Update user with correct role from database
        const userData = { ...result.user };
        login(userData);
        
        const rolePathMap = {
          Learner: "/dashboard/learner",
          Institution: "/dashboard/institution",
          Employer: "/dashboard/employer",
          Admin: "/dashboard/admin",
        };
        
        navigate(rolePathMap[userData.role] || from, { replace: true });
        try { burstConfetti({ count: 10 }); } catch (e) {}
      } else if (result.needsVerification) {
        setError(result.message);
        setTimeout(() => {
          navigate('/verification', { state: { email: result.email } });
        }, 1500);
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <UserCircle2 className="login-icon" />
          <h2 className="login-title">
            Welcome Back
          </h2>
          <p className="login-subtitle">
            Sign in to continue to KaushalLink
          </p>
        </div>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        {status && (
          <div className="login-status">{status}</div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
          <div className="login-form-group">
            <label className="login-label">
              Email Address
            </label>
            <div className="login-input-wrapper">
              <Mail className="login-input-icon" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-form-group">
            <label className="login-label">
              Password
            </label>
            <div className="login-input-wrapper">
              <Lock className="login-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword(s => !s)} className="login-password-toggle">
                {showPassword ? <EyeOff className="login-password-toggle-icon" /> : <Eye className="login-password-toggle-icon" />}
              </button>
            </div>
          </div>



          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition smooth-transform hover:scale-105"
            >
              <LogIn className="w-5 h-5" /> Sign In
            </button>
            <Link
              to="/register"
              className="w-full sm:w-auto text-center px-5 py-2.5 border border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition"
            >
              Register
            </Link>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
