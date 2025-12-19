import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Authcontext";
import { getUsers, getPendingUsers } from "../../data/users";
import { getDocs } from "../../utils/storage";
import "../../Style/Profile.css";

const AdminProfile = () => {
  const { user: authUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allDocs, setAllDocs] = useState([]);

  useEffect(() => {
    const users = getUsers();
    const pending = getPendingUsers();
    const docs = getDocs();
    
    setAllUsers(users);
    setPendingUsers(pending);
    setAllDocs(docs);
  }, []);

  const user = {
    name: authUser ? `${authUser.firstName} ${authUser.lastName}` : "Admin User",
    email: authUser?.email || "admin@example.com",
    role: authUser?.role || "Admin",
    phone: authUser?.phone || "N/A",
    institution: authUser?.institution || "Not specified",
    joinedDate: authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently",
    verifiedDate: authUser?.verifiedAt ? new Date(authUser.verifiedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A",
    profilePhoto: "https://i.pravatar.cc/150?img=3",
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const stats = {
    totalUsers: allUsers.length,
    pendingVerifications: pendingUsers.length,
    totalDocuments: allDocs.length,
    verifiedDocuments: allDocs.filter(d => d.status === 'verified').length,
    pendingDocuments: allDocs.filter(d => d.status === 'pending').length,
    learners: allUsers.filter(u => u.role === 'Learner').length,
    institutions: allUsers.filter(u => u.role === 'Institution').length,
    employers: allUsers.filter(u => u.role === 'Employer').length,
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
            <p className="institution">Institution: {user.institution}</p>
            <p className="joined">Joined: {user.joinedDate}</p>
            <p className="verified">Verified: {user.verifiedDate}</p>
          </div>
        </div>

        <hr className="profile-divider" />

        <div className="admin-profile-content">
          <h2 className="section-title">System Overview</h2>
          
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <h3>Users</h3>
              <div className="stat-number">{stats.totalUsers}</div>
              <div className="stat-breakdown">
                <p>Learners: {stats.learners}</p>
                <p>Institutions: {stats.institutions}</p>
                <p>Employers: {stats.employers}</p>
              </div>
            </div>

            <div className="admin-stat-card">
              <h3>Documents</h3>
              <div className="stat-number">{stats.totalDocuments}</div>
              <div className="stat-breakdown">
                <p>Verified: {stats.verifiedDocuments}</p>
                <p>Pending: {stats.pendingDocuments}</p>
              </div>
            </div>

            <div className="admin-stat-card">
              <h3>Pending Verifications</h3>
              <div className="stat-number">{stats.pendingVerifications}</div>
              <div className="stat-breakdown">
                <p>User accounts awaiting email verification</p>
              </div>
            </div>
          </div>

          <div className="admin-activities">
            <h3 className="section-title">Recent Users</h3>
            <div className="user-list">
              {allUsers.slice(0, 5).map((u, idx) => (
                <div key={idx} className="user-item">
                  <div>
                    <strong>{u.firstName} {u.lastName}</strong>
                    <span className="user-role"> ({u.role})</span>
                  </div>
                  <div className="user-meta">
                    {u.institution} • {u.email}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
