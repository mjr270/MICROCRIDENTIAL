import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Authcontext";
import { getDocs } from "../../utils/storage";
import "../../Style/Profile.css";

const EmployerProfile = () => {
  const { user: authUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [verifiedDocs, setVerifiedDocs] = useState([]);
  const [savedCandidates, setSavedCandidates] = useState([]);

  useEffect(() => {
    const allDocs = getDocs();
    const verified = allDocs.filter(d => d.status === 'verified');
    setVerifiedDocs(verified);
  }, []);

  const user = {
    name: authUser ? `${authUser.firstName} ${authUser.lastName}` : "Employer User",
    email: authUser?.email || "employer@example.com",
    role: authUser?.role || "Employer",
    phone: authUser?.phone || "N/A",
    institution: authUser?.institution || "Not specified",
    joinedDate: authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently",
    verifiedDate: authUser?.verifiedAt ? new Date(authUser.verifiedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A",
    profilePhoto: "https://i.pravatar.cc/150?img=8",
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const toggleSaveCandidate = (email) => {
    setSavedCandidates(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  // Group documents by owner
  const candidateProfiles = verifiedDocs.reduce((acc, doc) => {
    const key = doc.owner;
    if (!acc[key]) {
      acc[key] = {
        email: doc.owner,
        name: doc.ownerName || doc.owner,
        institution: doc.ownerInstitution || 'N/A',
        documents: [],
      };
    }
    acc[key].documents.push(doc);
    return acc;
  }, {});

  const candidates = Object.values(candidateProfiles);

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-photo-container">
            <img
              src={selectedFile || user.profilePhoto}
              alt="Profile"
              className="profile-photo"
            />
            <label className="photo-change-label">
              Change
              <input type="file" accept="image/*" className="photo-input" onChange={handlePhotoChange} />
            </label>
          </div>

          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="email">{user.email}</p>
            <p className="role">Role: {user.role}</p>
            <p className="phone">Phone: {user.phone}</p>
            <p className="institution">Company: {user.institution}</p>
            <p className="joined">Joined: {user.joinedDate}</p>
            <p className="verified">Verified: {user.verifiedDate}</p>
          </div>
        </div>

        <hr className="profile-divider" />

        <div className="employer-profile-content">
          <h2 className="section-title">Hiring Dashboard</h2>
          
          <div className="employer-stats">
            <div className="employer-stat-card">
              <h3>Total Candidates</h3>
              <div className="stat-number">{candidates.length}</div>
              <p>With verified credentials</p>
            </div>

            <div className="employer-stat-card">
              <h3>Saved Candidates</h3>
              <div className="stat-number">{savedCandidates.length}</div>
              <p>For future reference</p>
            </div>

            <div className="employer-stat-card">
              <h3>Total Credentials</h3>
              <div className="stat-number">{verifiedDocs.length}</div>
              <p>Verified documents available</p>
            </div>
          </div>

          <div className="candidates-section">
            <h3 className="section-title">Verified Candidates</h3>
            <div className="candidates-list">
              {candidates.length > 0 ? (
                candidates.map((candidate, idx) => (
                  <div key={idx} className="candidate-card">
                    <div className="candidate-info">
                      <h4>{candidate.name}</h4>
                      <p className="candidate-institution">{candidate.institution}</p>
                      <p className="candidate-email">{candidate.email}</p>
                      <div className="candidate-docs">
                        <strong>Credentials: {candidate.documents.length}</strong>
                        <ul>
                          {candidate.documents.slice(0, 3).map((doc, i) => (
                            <li key={i}>{doc.name}</li>
                          ))}
                          {candidate.documents.length > 3 && (
                            <li>+{candidate.documents.length - 3} more...</li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleSaveCandidate(candidate.email)}
                      className={savedCandidates.includes(candidate.email) ? 'unsave-btn' : 'save-btn'}
                    >
                      {savedCandidates.includes(candidate.email) ? '★ Saved' : '☆ Save'}
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-candidates">No verified candidates yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
