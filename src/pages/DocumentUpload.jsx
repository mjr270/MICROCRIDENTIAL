import React, { useState } from 'react'
import { useAuth } from '../context/Authcontext'
import { saveDoc, getDocs } from '../utils/storage'
import { useNavigate } from 'react-router-dom'

export default function DocumentUpload(){
  const { user } = useAuth()
  const [files, setFiles] = useState([])
  const navigate = useNavigate()

  const handleChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const dataUrl = await toDataUrl(file)
    const doc = {
      id: Date.now().toString(),
      owner: user?.email || user?.role,
      name: file.name,
      size: file.size,
      type: file.type,
      dataUrl,
      status: 'pending',
      createdAt: Date.now()
    }
    saveDoc(doc)
    setFiles(getDocs().filter(d => d.owner === doc.owner))
    alert('Document uploaded (demo). Admin can verify from /verify.')
  }

  const toDataUrl = (file) => {
    return new Promise((res, rej) => {
      const reader = new FileReader()
      reader.onload = () => res(reader.result)
      reader.onerror = rej
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
      <p className="text-sm text-gray-600 mb-4">Allowed: PDF, images. Uploaded docs are stored locally (demo).</p>
      <div className="space-y-3">
        <input type="file" onChange={handleChange} />
        <button onClick={() => navigate(-1)} className="px-3 py-1 border rounded">Back</button>
      </div>
    </div>
  )
}
