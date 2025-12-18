import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Authcontext'
import { saveDoc, getDocs, deleteDoc, saveDocs } from '../utils/storage'
import { burstConfetti } from '../utils/confetti'
import { useNavigate } from 'react-router-dom'
import '../Style/DocumentUpload.css'

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
    <div className="doc-upload-container">
      <div className="doc-upload-header">
        <div className="doc-upload-header-text">
          <h2>Upload Documents</h2>
          <p>Allowed: PDF, PNG, JPG. Files are stored locally for demo purposes. Admins may verify uploaded documents.</p>
        </div>
        <div>
          <button onClick={() => navigate(-1)} className="doc-upload-back-btn">Back</button>
        </div>
      </div>

      <div className="doc-upload-dropzone-wrapper">
        <label className="doc-upload-dropzone">
          <input type="file" onChange={handleInputChange} multiple />
          <div className="doc-upload-dropzone-text">Click to select files or drag them here</div>
        </label>
      </div>

      <div className="doc-upload-list-section">
        <h3 className="doc-upload-list-title">Your uploads</h3>
        {docs.length === 0 ? (
          <div className="doc-upload-empty">No documents uploaded yet.</div>
        ) : (
          <ul className="doc-upload-list">
            {docs.map((d, i) => (
              <li key={d.id} className="doc-upload-item" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="doc-upload-item-info">
                  <h4>{d.name}</h4>
                  <div className="doc-upload-item-meta">{(d.size/1024).toFixed(1)} KB • {d.type} • {new Date(d.createdAt).toLocaleString()}</div>
                </div>
                <div className="doc-upload-item-actions">
                  {uploadingMap[d.id] ? (
                    <div className="doc-upload-progress">
                      <div className="doc-upload-progress-bar-wrapper">
                        <div className="doc-upload-progress-bar" style={{ width: `${uploadingMap[d.id]}%` }} />
                      </div>
                      <div className="doc-upload-progress-text">Uploading {uploadingMap[d.id]}%</div>
                    </div>
                  ) : (
                    <>
                      <span className={`doc-upload-status-badge ${d.status}`}>{d.status}</span>
                      <button onClick={() => handleDownload(d)} className="doc-upload-action-btn">Download</button>
                      <button onClick={() => handleDelete(d.id)} className="doc-upload-action-btn delete">Delete</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {toast && (
        <div className={`doc-upload-toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}
