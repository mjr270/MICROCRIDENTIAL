import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Mail, RefreshCw } from 'lucide-react';
import { verifyUser, resendVerificationCode } from '../data/users';
import { useAuth } from '../context/Authcontext';
import { burstConfetti } from '../utils/confetti';
import '../Style/Verification.css';

export default function Verification() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  // Auto-focus on first input
  useEffect(() => {
    const firstInput = document.getElementById('code-0');
    if (firstInput) firstInput.focus();
  }, []);

  const handleInputChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) {
      setError('Please paste only numbers');
      return;
    }

    const newCode = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setCode(newCode);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    const lastInput = document.getElementById(`code-${lastIndex}`);
    if (lastInput) lastInput.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');

    if (verificationCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      const result = verifyUser(email, verificationCode);

      if (result.success) {
        setSuccess(result.message);
        try { burstConfetti({ count: 30 }); } catch(e) {}
        
        // Auto-login the user
        login(result.user);
        
        setTimeout(() => {
          // Redirect to appropriate dashboard based on role
          const dashboardRoutes = {
            'Admin': '/admin-dashboard',
            'Learner': '/learner-dashboard',
            'Institution': '/institution-dashboard',
            'Employer': '/employer-dashboard'
          };
          navigate(dashboardRoutes[result.user.role] || '/dashboard');
        }, 1500);
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 800);
  };

  const handleResend = () => {
    setResending(true);
    setError('');
    setSuccess('');

    setTimeout(() => {
      const result = resendVerificationCode(email);
      
      if (result.success) {
        setSuccess(`${result.message} Code: ${result.verificationCode}`);
        setCode(['', '', '', '', '', '']);
        const firstInput = document.getElementById('code-0');
        if (firstInput) firstInput.focus();
      } else {
        setError(result.message);
      }
      setResending(false);
    }, 1000);
  };

  return (
    <div className="verification-page">
      <div className="verification-container">
        <div className="verification-header">
          <div className="verification-icon-wrapper">
            <ShieldCheck className="verification-icon" />
          </div>
          <h2 className="verification-title">Verify Your Account</h2>
          <p className="verification-subtitle">
            We've sent a 6-digit verification code to
          </p>
          <div className="verification-email">
            <Mail className="verification-email-icon" />
            <span>{email}</span>
          </div>
        </div>

        {error && (
          <div className="verification-error">
            {error}
          </div>
        )}

        {success && (
          <div className="verification-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="verification-form">
          <div className="verification-code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="verification-code-input"
                disabled={loading}
              />
            ))}
          </div>

          <button
            type="submit"
            className={`verification-submit-btn ${loading ? 'loading' : ''}`}
            disabled={loading || code.some(d => !d)}
          >
            {loading ? 'Verifying...' : 'Verify Account'}
          </button>
        </form>

        <div className="verification-resend">
          <p>Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={resending}
            className="verification-resend-btn"
          >
            <RefreshCw className={`verification-resend-icon ${resending ? 'spinning' : ''}`} />
            {resending ? 'Resending...' : 'Resend Code'}
          </button>
        </div>

        <div className="verification-footer">
          <Link to="/register" className="verification-back-link">
            Back to Registration
          </Link>
        </div>
      </div>
    </div>
  );
}
