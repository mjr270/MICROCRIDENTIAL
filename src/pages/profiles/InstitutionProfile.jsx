import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Authcontext";
import { getDocs } from "../../utils/storage";
import { getUsers } from "../../data/users";
import "../../Style/Profile.css";

const InstitutionProfile = () => {
  const { user: authUser, login } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInstitution, setEditedInstitution] = useState(authUser?.institution || '');
  const [institutionDocs, setInstitutionDocs] = useState([]);
  const [institutionLearners, setInstitutionLearners] = useState([]);

  useEffect(() => {
    if (authUser && authUser.institution) {
      const allDocs = getDocs();
      const allUsers = getUsers();
      
      // Get documents from this institution
      const docs = allDocs.filter(d => d.ownerInstitution === authUser.institution);
      setInstitutionDocs(docs);
      
      // Get learners from this institution
      const learners = allUsers.filter(u => 
        u.institution === authUser.institution && u.role === 'Learner'
      );
      setInstitutionLearners(learners);
    }
  }, [authUser]);

  const user = {
    name: authUser ? `${authUser.firstName} ${authUser.lastName}` : "Institution User",
    email: authUser?.email || "institution@example.com",
    role: authUser?.role || "Institution",
    phone: authUser?.phone || "N/A",
    institution: authUser?.institution || "Not specified",
    joinedDate: authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently",
    verifiedDate: authUser?.verifiedAt ? new Date(authUser.verifiedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A",
    profilePhoto: "https://i.pravatar.cc/150?img=5",
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const handleSaveInstitution = () => {
    if (!authUser) return;
    
    import('../../data/users').then(({ updateUser }) => {
      const result = updateUser(authUser.email, { institution: editedInstitution });
      if (result.success) {
        const updatedUser = { ...authUser, institution: editedInstitution };
        login(updatedUser);
        setIsEditing(false);
      }
    });
  };

  const stats = {
    totalDocuments: institutionDocs.length,
    verifiedDocuments: institutionDocs.filter(d => d.status === 'verified').length,
    pendingDocuments: institutionDocs.filter(d => d.status === 'pending').length,
    totalLearners: institutionLearners.length,
  };

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
            <div className="institution-edit-container">
              {isEditing ? (
                <div className="institution-edit">
                  <input
                    type="text"
                    value={editedInstitution}
                    onChange={(e) => setEditedInstitution(e.target.value)}
                    className="institution-input"
                    placeholder="Enter institution name"
                  />
                  <button onClick={handleSaveInstitution} className="save-btn">Save</button>
                  <button onClick={() => { setIsEditing(false); setEditedInstitution(authUser?.institution || ''); }} className="cancel-btn">Cancel</button>
                </div>
              ) : (
                <p className="institution">
                  Institution: {user.institution}
                  <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
                </p>
              )}
            </div>
            <p className="joined">Joined: {user.joinedDate}</p>
            <p className="verified">Verified: {user.verifiedDate}</p>
          </div>
        </div>

        <hr className="profile-divider" />

        <div className="institution-profile-content">
          <h2 className="section-title">Institution Overview</h2>
          
          <div className="institution-stats-grid">
            <div className="institution-stat-card">
              <h3>Total Documents</h3>
              <div className="stat-number">{stats.totalDocuments}</div>
              <div className="stat-breakdown">
                <p>Verified: {stats.verifiedDocuments}</p>
                <p>Pending: {stats.pendingDocuments}</p>
              </div>
            </div>

            <div className="institution-stat-card">
              <h3>Registered Learners</h3>
              <div className="stat-number">{stats.totalLearners}</div>
              <div className="stat-breakdown">
                <p>From {user.institution}</p>
              </div>
            </div>
          </div>

          <div className="institution-learners">
            <h3 className="section-title">Learners from {user.institution}</h3>
            <div className="learner-list">
              {institutionLearners.length > 0 ? (
                institutionLearners.slice(0, 10).map((learner, idx) => (
                  <div key={idx} className="learner-item">
                    <div>
                      <strong>{learner.firstName} {learner.lastName}</strong>
                    </div>
                    <div className="learner-meta">
                      {learner.email} • Joined: {new Date(learner.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-learners">No learners registered yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionProfile;
