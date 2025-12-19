import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Authcontext'
import { useDocuments } from '../context/DocumentContext'
import { saveDoc, getDocs, deleteDoc, saveDocs } from '../utils/storage'
import { burstConfetti } from '../utils/confetti'
import { useNavigate } from 'react-router-dom'
import { NSQF_LEVELS, SECTORS, QUALIFICATION_TYPES, SAMPLE_QUALIFICATION_PACKS } from '../data/nsqf'
import '../Style/DocumentUpload.css'

export default function DocumentUpload(){
  const { user } = useAuth()
  const { createDocument, getDocuments } = useDocuments()
  const [docs, setDocs] = useState([])
  const [uploadingMap, setUploadingMap] = useState({}) // id -> progress
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()
  
  // NSQF metadata
  const [nsqfLevel, setNsqfLevel] = useState(3)
  const [sector, setSector] = useState('')
  const [qualificationType, setQualificationType] = useState('micro_credential')
  const [credits, setCredits] = useState(0)
  const [duration, setDuration] = useState('')
  const [skillsAcquired, setSkillsAcquired] = useState('')
  const [qualificationPack, setQualificationPack] = useState('')

  useEffect(() => {
    if (user) {
      const owner = user.email || user.role
      const userDocs = getDocuments({ owner })
      setDocs(userDocs)
    }
  }, [user, getDocuments])

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

    // Sanitize owner email/role to prevent XSS
    const owner = (user.email || user.role).trim()

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
        ownerName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : owner,
        ownerRole: user.role || 'Learner',
        ownerInstitution: user.institution || 'Not specified',
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: null,
        status: 'uploading',
        createdAt: Date.now(),
        // NSQF metadata
        nsqfLevel: nsqfLevel || 3,
        sector: sector || 'others',
        qualificationType: qualificationType || 'micro_credential',
        credits: credits || 0,
        duration: duration || '',
        skillsAcquired: skillsAcquired ? skillsAcquired.split(',').map(s => s.trim()) : [],
        qualificationPack: qualificationPack || ''
      }

      // optimistic save with uploading status
      saveDoc(doc)
      setDocs(prev => [doc, ...prev])
      setUploadingMap(prev => ({ ...prev, [id]: 0 }))

      try {
        const dataUrl = await toDataUrl(file)
        // simulate upload progress
        await simulateProgress(id, (p) => setUploadingMap(prev => ({ ...prev, [id]: p })))

        const completed = { ...doc, dataUrl, status: 'pending', uploadedAt: Date.now() };
        saveDoc(completed);
        createDocument(completed);
        
        // Update user's uploaded documents list
        if (user.email) {
          import('../data/users').then(({ updateUser, getUsers }) => {
            const users = getUsers();
            const currentUser = users.find(u => u.email === user.email);
            if (currentUser) {
              const updatedDocs = [...(currentUser.uploadedDocuments || []), id];
              updateUser(user.email, { uploadedDocuments: updatedDocs });
            }
          });
        }
        
        // Refresh the document list from context
        const refreshedDocs = getDocuments({ owner });
        setDocs(refreshedDocs);
        setToast({ type: 'success', message: `${file.name} uploaded (demo)` });
        try { burstConfetti({ count: 16 }); } catch(e) {}
        setTimeout(() => setToast(null), 2000);
      } catch (err) {
        setToast({ type: 'error', message: `Failed to read ${file.name}` });
        setTimeout(() => setToast(null), 2000);
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
    deleteDoc(id);
    const owner = user.email || user.role;
    setDocs(getDocuments({ owner }));
    setToast({ type: 'success', message: 'Deleted' });
    setTimeout(() => setToast(null), 1500);
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

      {/* NSQF Metadata Form */}
      <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #e5e7eb' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Credential Metadata (NSQF Aligned)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.875rem', fontWeight: '500' }}>NSQF Level *</label>
            <select 
              value={nsqfLevel} 
              onChange={(e) => setNsqfLevel(Number(e.target.value))}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
            >
              {NSQF_LEVELS.map(level => (
                <option key={level.level} value={level.level}>
                  Level {level.level} - {level.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.875rem', fontWeight: '500' }}>Sector</label>
            <select 
              value={sector} 
              onChange={(e) => setSector(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
            >
              <option value="">Select Sector</option>
              {SECTORS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.875rem', fontWeight: '500' }}>Qualification Type</label>
            <select 
              value={qualificationType} 
              onChange={(e) => setQualificationType(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
            >
              {QUALIFICATION_TYPES.map(qt => (
                <option key={qt.id} value={qt.id}>{qt.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.875rem', fontWeight: '500' }}>Credits</label>
            <input 
              type="number" 
              value={credits} 
              onChange={(e) => setCredits(Number(e.target.value))}
              placeholder="e.g., 60"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.875rem', fontWeight: '500' }}>Duration</label>
            <input 
              type="text" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 6 months"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.875rem', fontWeight: '500' }}>Qualification Pack ID</label>
            <input 
              type="text" 
              value={qualificationPack} 
              onChange={(e) => setQualificationPack(e.target.value)}
              placeholder="e.g., QP-IT-001"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
            />
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.875rem', fontWeight: '500' }}>Skills Acquired (comma-separated)</label>
          <input 
            type="text" 
            value={skillsAcquired} 
            onChange={(e) => setSkillsAcquired(e.target.value)}
            placeholder="e.g., Web Development, JavaScript, React"
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' }}
          />
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
                  <div className="doc-upload-item-meta">
                    {(d.size/1024).toFixed(1)} KB • {d.type} • {new Date(d.createdAt).toLocaleString()}
                    {d.nsqfLevel && <span> • NSQF Level {d.nsqfLevel}</span>}
                    {d.sector && <span> • {SECTORS.find(s => s.id === d.sector)?.name || d.sector}</span>}
                    {d.credits > 0 && <span> • {d.credits} Credits</span>}
                  </div>
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
