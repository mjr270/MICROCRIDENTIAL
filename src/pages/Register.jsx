import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'
import { burstConfetti } from '../utils/confetti'
import "../Style/Register.css"

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [institution, setInstitution] = useState('')
  const [role, setRole] = useState('Learner')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      setError('First name and last name are required')
      return
    }
    
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) {
      setError('Please enter a valid email')
      return
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    
    // Check password complexity
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      setError('Password must contain uppercase, lowercase, and numbers')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    const phoneRe = /^[0-9]{10,15}$/
    if (!phoneRe.test(phone.replace(/[\s-()]/g, ''))) {
      setError('Please enter a valid phone number (10-15 digits)')
      return
    }
    
    setError(null)
    setLoading(true)

    // Import and use the new registration system
    import('../data/users').then(({ registerUser }) => {
      const result = registerUser({
        email,
        password,
        firstName,
        lastName,
        phone: phone.replace(/[\s-()]/g, ''),
        institution: institution.trim() || 'Not specified',
        role
      })
      
      setLoading(false)
      
      if (result.success) {
        try { burstConfetti({ count: 18 }) } catch(e) {}
        // Navigate to verification page
        navigate('/verification', { 
          state: { 
            email,
            message: `Verification code: ${result.verificationCode}` 
          } 
        })
      } else {
        setError(result.message)
      }
    })
  }

  return (
    <div className="register-container">
      <h2 className="register-title">Create an Account</h2>
      {error && <div className="register-error">{error}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-form-row">
          <div className="register-form-group">
            <label className="register-label">First Name</label>
            <input
              required
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="register-input"
              placeholder="John"
            />
          </div>
          <div className="register-form-group">
            <label className="register-label">Last Name</label>
            <input
              required
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="register-input"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="register-form-group">
          <label className="register-label">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="register-input"
            placeholder="you@example.com"
          />
        </div>

        <div className="register-form-group">
          <label className="register-label">Phone Number</label>
          <input
            required
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="register-input"
            placeholder="1234567890"
          />
        </div>

        <div className="register-form-group">
          <label className="register-label">University / College / Institution</label>
          <input
            type="text"
            value={institution}
            onChange={e => setInstitution(e.target.value)}
            className="register-input"
            placeholder="e.g., MIT, Harvard University, ABC College"
          />
        </div>

        <div className="register-form-group">
          <label className="register-label">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="register-input"
            placeholder="••••••••"
            minLength="6"
          />
        </div>

        <div className="register-form-group">
          <label className="register-label">Confirm Password</label>
          <input
            required
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="register-input"
            placeholder="••••••••"
          />
        </div>

        <div className="register-form-group">
          <label className="register-label">Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="register-select"
          >
            <option>Learner</option>
            <option>Institution</option>
            <option>Employer</option>
            <option>Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className={`register-button ${loading ? 'register-button-loading' : 'register-button-primary'}`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}
