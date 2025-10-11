import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'

export default function Register() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Learner')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    register({ email, role })
    navigate(`/dashboard/${role.toLowerCase()}`, { replace: true })
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create an Account</h2>
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
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  )
}
