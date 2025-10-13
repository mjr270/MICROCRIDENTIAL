import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Authcontext'
import { saveDoc, getDocs, deleteDoc, saveDocs } from '../utils/storage'
import { burstConfetti } from '../utils/confetti'
import { useNavigate } from 'react-router-dom'

export default function DocumentUpload(){
  const { user } = useAuth()
  const [docs, setDocs] = useState([])
  const [uploadingMap, setUploadingMap] = useState({}) // id -> progress
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      const all = getDocs().filter(d => d.owner === (user.email || user.role))
      setDocs(all)
    }
  }, [user])

  const toDataUrl = (file) => {
    return new Promise((res, rej) => {
      const reader = new FileReader()
      reader.onload = () => res(reader.result)
      reader.onerror = rej
      reader.readAsDataURL(file)
    })
  }

  const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']

  const handleFiles = async (fileList) => {
    if (!user) return setToast({ type: 'error', message: 'You must be logged in to upload.' })

    const owner = user.email || user.role

    for (const file of Array.from(fileList)) {
      if (!allowedTypes.includes(file.type)) {
        setToast({ type: 'error', message: `File type not supported: ${file.name}` })
        setTimeout(() => setToast(null), 2000)
        continue
      }

      const id = Date.now().toString() + Math.random().toString(36).slice(2,6)
      const doc = {
        id,
        owner,
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: null,
        status: 'uploading',
        createdAt: Date.now()
      }

      // optimistic save with uploading status
      saveDoc(doc)
      setDocs(prev => [doc, ...prev])
      setUploadingMap(prev => ({ ...prev, [id]: 0 }))

      try {
        const dataUrl = await toDataUrl(file)
        // simulate upload progress
        await simulateProgress(id, (p) => setUploadingMap(prev => ({ ...prev, [id]: p })))

        const completed = { ...doc, dataUrl, status: 'pending' }
        saveDoc(completed)
        setDocs(getDocs().filter(d => d.owner === owner))
  setToast({ type: 'success', message: `${file.name} uploaded (demo)` })
  try { burstConfetti({ count: 16 }); } catch(e) {}
        setTimeout(() => setToast(null), 2000)
      } catch (err) {
        setToast({ type: 'error', message: `Failed to read ${file.name}` })
        setTimeout(() => setToast(null), 2000)
      } finally {
        setUploadingMap(prev => {
          const copy = { ...prev }
          delete copy[id]
          return copy
        })
      }
    }
  }

  const simulateProgress = (id, onProgress) => {
    return new Promise((res) => {
      let p = 0
      const t = setInterval(() => {
        p += Math.floor(Math.random() * 20) + 10
        if (p >= 100) {
          onProgress(100)
          clearInterval(t)
          setTimeout(res, 200)
        } else {
          onProgress(p)
        }
      }, 200)
    })
  }

  const handleInputChange = (e) => {
    const files = e.target.files
    if (!files || !files.length) return
    handleFiles(files)
    e.target.value = null
  }

  const handleDelete = (id) => {
    deleteDoc(id)
    setDocs(getDocs().filter(d => d.owner === (user.email || user.role)))
    setToast({ type: 'success', message: 'Deleted' })
    setTimeout(() => setToast(null), 1500)
  }

  const handleDownload = (doc) => {
    if (doc.dataUrl) {
      const a = document.createElement('a')
      a.href = doc.dataUrl
      a.download = doc.name
      document.body.appendChild(a)
      a.click()
      a.remove()
      setToast({ type: 'success', message: 'Download started' })
      setTimeout(() => setToast(null), 1500)
    } else {
      setToast({ type: 'error', message: 'No file data available' })
      setTimeout(() => setToast(null), 1500)
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Upload Documents</h2>
          <p className="text-sm text-gray-600">Allowed: PDF, PNG, JPG. Files are stored locally for demo purposes. Admins may verify uploaded documents.</p>
        </div>
        <div className="text-right">
          <button onClick={() => navigate(-1)} className="px-3 py-1 border rounded smooth-transform hover:scale-105">Back</button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block w-full rounded border-2 border-dashed p-4 text-center hover:border-blue-400 cursor-pointer smooth-transform hover:shadow-lg animate-pop">
          <input type="file" onChange={handleInputChange} multiple className="hidden" />
          <div className="text-sm text-gray-600">Click to select files or drag them here</div>
        </label>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Your uploads</h3>
        {docs.length === 0 ? (
          <div className="text-sm text-gray-500">No documents uploaded yet.</div>
        ) : (
          <ul className="space-y-3">
            {docs.map((d, i) => (
              <li key={d.id} className="p-3 bg-gray-50 rounded flex items-center justify-between animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div>
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-gray-500">{(d.size/1024).toFixed(1)} KB • {d.type} • {new Date(d.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-3">
                  {uploadingMap[d.id] ? (
                    <div className="w-36">
                      <div className="w-full bg-gray-200 h-2 rounded mb-1">
                        <div className="h-2 bg-blue-600 rounded" style={{ width: `${uploadingMap[d.id]}%` }} />
                      </div>
                      <div className="text-xs text-gray-500">Uploading {uploadingMap[d.id]}%</div>
                    </div>
                  ) : (
                    <>
                      <span className={`text-sm px-2 py-1 rounded ${d.status === 'verified' ? 'bg-green-100 text-green-800' : d.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}>{d.status}</span>
                      <button onClick={() => handleDownload(d)} className="px-3 py-1 border rounded text-sm smooth-transform hover:scale-105">Download</button>
                      <button onClick={() => handleDelete(d.id)} className="px-3 py-1 border rounded text-sm text-red-600 smooth-transform hover:scale-105">Delete</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {toast && (
        <div className={`fixed right-6 bottom-6 p-3 rounded shadow ${toast.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'} animate-pop`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}
