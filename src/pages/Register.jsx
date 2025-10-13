import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'
import { burstConfetti } from '../utils/confetti'

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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create an Account</h2>
      {error && <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200 outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring focus:ring-blue-200 outline-none"
          >
            <option>Learner</option>
            <option>Institution</option>
            <option>Employer</option>
            <option>Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-2 ${loading ? 'bg-blue-400' : 'bg-green-600 hover:bg-green-700'} text-white rounded transition smooth-transform ${loading ? '' : 'hover:scale-105'}`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}
