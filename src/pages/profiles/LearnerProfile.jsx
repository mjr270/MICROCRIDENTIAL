import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "../../context/Authcontext";
import { getDocs } from "../../utils/storage";
import "../../Style/Profile.css";

const LearnerProfile = () => {
  const { user: authUser, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedInstitution, setEditedInstitution] = useState(authUser?.institution || '');
  const [uploadedDocs, setUploadedDocs] = useState([]);
  
  // Load user's uploaded documents
  useEffect(() => {
    if (authUser && authUser.email) {
      const allDocs = getDocs();
      const userDocs = allDocs.filter(d => d.owner === authUser.email);
      setUploadedDocs(userDocs);
    }
  }, [authUser]);
  
  // Use real user data from AuthContext
  const [user, setUser] = useState({
    name: authUser ? `${authUser.firstName} ${authUser.lastName}` : "Guest User",
    email: authUser?.email || "guest@example.com",
    role: authUser?.role || "Learner",
    phone: authUser?.phone || "N/A",
    institution: authUser?.institution || "Not specified",
    joinedDate: authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently",
    verifiedDate: authUser?.verifiedAt ? new Date(authUser.verifiedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A",
    profilePhoto: "https://i.pravatar.cc/150?img=12",
    microcredentials: uploadedDocs.filter(d => d.status === 'verified').map((d, idx) => ({
      id: idx + 1,
      title: d.name,
      issuer: d.verifiedBy || "System",
      date: new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    })),
  });

  // Update user state when uploadedDocs changes
  useEffect(() => {
    setUser(prev => ({
      ...prev,
      microcredentials: uploadedDocs.filter(d => d.status === 'verified').map((d, idx) => ({
        id: idx + 1,
        title: d.name,
        issuer: d.verifiedBy || "System",
        date: new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      })),
      institution: authUser?.institution || "Not specified"
    }));
  }, [uploadedDocs, authUser]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleSaveInstitution = () => {
    if (!authUser) return;
    
    // Update user data in storage
    import('../../data/users').then(({ updateUser }) => {
      const result = updateUser(authUser.email, { institution: editedInstitution });
      if (result.success) {
        const updatedUser = { ...authUser, institution: editedInstitution };
        login(updatedUser);
        setUser(prev => ({ ...prev, institution: editedInstitution }));
        setIsEditing(false);
      }
    });
  };

  // Skill map: each skill has a proficiency (0-100)
  const [skills, setSkills] = useState([
    { id: 'html', name: 'HTML/CSS', level: 85 },
    { id: 'js', name: 'JavaScript', level: 70 },
    { id: 'react', name: 'React', level: 65 },
    { id: 'node', name: 'Node.js', level: 40 },
    { id: 'docker', name: 'Docker', level: 20 },
  ]);

  const [desiredSkills, setDesiredSkills] = useState(['react', 'node', 'docker']);
  const [enrolledPaths, setEnrolledPaths] = useState([]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const gaps = useMemo(() => {
    const threshold = 70;
    return desiredSkills
      .map((ds) => skills.find((s) => s.id === ds))
      .filter(Boolean)
      .map((s) => ({ ...s, gap: Math.max(0, threshold - s.level) }))
      .filter((s) => s.gap > 0);
  }, [skills, desiredSkills]);

  const recommendedPaths = useMemo(() => {
    return gaps.map((g) => ({
      id: `path-${g.id}`,
      title: `${g.name} Mastery`,
      duration: g.gap > 40 ? '6-8 weeks' : '3-4 weeks',
      modules: g.gap > 40 ? 12 : 6,
      forSkill: g.id,
    }));
  }, [gaps]);

  const enroll = (pathId) => {
    if (!enrolledPaths.includes(pathId)) setEnrolledPaths((p) => [...p, pathId]);
  };

  const unenroll = (pathId) => {
    setEnrolledPaths((p) => p.filter((x) => x !== pathId));
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
            <p className="doc-count">Uploaded Documents: {uploadedDocs.length}</p>
          </div>
        </div>

        <hr className="profile-divider" />

        <div className="profile-grid">
          <div className="profile-section">
            <h2 className="section-title">Microcredentials</h2>
            <div className="credentials-list">
              {user.microcredentials.length > 0 ? (
                user.microcredentials.map((cred) => (
                  <div key={cred.id} className="credential-card">
                    <h3 className="credential-title">{cred.title}</h3>
                    <p className="credential-meta">{cred.issuer} • {cred.date}</p>
                  </div>
                ))
              ) : (
                <p className="no-credentials">No verified credentials yet. Upload documents to get started!</p>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h2 className="section-title">Skill Map</h2>
            <div className="skills-list">
              {skills.map((s) => (
                <div key={s.id} className="skill-card">
                  <div className="skill-header">
                    <div>
                      <div className="skill-name">{s.name}</div>
                      <div className="skill-proficiency">Proficiency: {s.level}%</div>
                    </div>
                    <div className="skill-level-text">{s.level >= 70 ? 'Good' : s.level >= 40 ? 'Learning' : 'Beginner'}</div>
                  </div>
                  <div className="skill-bar-container">
                    <div className="skill-bar" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="desired-skills-section">
              <h3 className="desired-skills-title">Desired Skills</h3>
              <div className="desired-skills-buttons">
                {skills.map((s) => {
                  const active = desiredSkills.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() =>
                        setDesiredSkills((prev) => (prev.includes(s.id) ? prev.filter((x) => x !== s.id) : [...prev, s.id]))
                      }
                      className={`skill-toggle-btn ${active ? 'active' : 'inactive'}`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2 className="gaps-section-title">Skill Gaps & Recommendations</h2>

            {gaps.length === 0 ? (
              <div className="no-gaps-message">No major gaps detected. Great job!</div>
            ) : (
              <div className="gaps-container">
                <div className="detected-gaps-card">
                  <h3 className="detected-gaps-title">Detected Gaps</h3>
                  <ul className="gaps-list">
                    {gaps.map((g) => (
                      <li key={g.id}>{g.name} — needs ~{g.gap}% improvement to reach target proficiency</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="recommended-paths-title">Recommended Learning Paths</h3>
                  <div className="paths-list">
                    {recommendedPaths.map((p) => (
                      <div key={p.id} className="path-card">
                        <div className="path-content">
                          <div>
                            <div className="path-title">{p.title}</div>
                            <div className="path-meta">Duration: {p.duration} • Modules: {p.modules}</div>
                          </div>
                          <div className="path-buttons">
                            {enrolledPaths.includes(p.id) ? (
                              <button onClick={() => unenroll(p.id)} className="unenroll-btn">Unenroll</button>
                            ) : (
                              <button onClick={() => enroll(p.id)} className="enroll-btn">Enroll</button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerProfile;
