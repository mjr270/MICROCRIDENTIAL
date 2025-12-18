import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'
import { burstConfetti } from '../utils/confetti'
import "../Style/Register.css"

export default function Register() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Learner')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) {
      setError('Please enter a valid email')
      return
    }
    setError(null)
    setLoading(true)

    // demo register
    register({ email, role })
    setTimeout(() => {
      setLoading(false)
      try { burstConfetti({ count: 18 }) } catch(e) {}
      navigate(`/dashboard/${role.toLowerCase()}`, { replace: true })
    }, 500)
  }

  return (
    <div className="register-container">
      <h2 className="register-title">Create an Account</h2>
      {error && <div className="register-error">{error}</div>}
      <form onSubmit={handleSubmit} className="register-form">
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
