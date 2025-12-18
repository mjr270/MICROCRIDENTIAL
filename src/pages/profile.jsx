import React, { useState, useMemo } from "react";
import "../Style/Profile.css";

const Profile = () => {
  // Mock user data (can be replaced with API data)
  const [user, setUser] = useState({
    name: "Zaid Khan",
    email: "zaid.khan@example.com",
    role: "Learner",
    institution: "ABC Institute of Technology",
    joinedDate: "March 2024",
    profilePhoto: "https://i.pravatar.cc/150?img=12", // default placeholder
    microcredentials: [
      { id: 1, title: "Web Development Basics", issuer: "MicroCred Academy", date: "May 2024" },
      { id: 2, title: "React Frontend Essentials", issuer: "MicroCred Pro", date: "July 2024" },
    ],
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // Skill map: each skill has a proficiency (0-100)
  const [skills, setSkills] = useState([
    { id: 'html', name: 'HTML/CSS', level: 85 },
    { id: 'js', name: 'JavaScript', level: 70 },
    { id: 'react', name: 'React', level: 65 },
    { id: 'node', name: 'Node.js', level: 40 },
    { id: 'docker', name: 'Docker', level: 20 },
  ]);

  // Desired skills the learner wants to reach (used for gap detection)
  const [desiredSkills, setDesiredSkills] = useState(['react', 'node', 'docker']);

  const [enrolledPaths, setEnrolledPaths] = useState([]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  // Compute gaps: desired skills where current level < 70 (threshold)
  const gaps = useMemo(() => {
    const threshold = 70;
    return desiredSkills
      .map((ds) => skills.find((s) => s.id === ds))
      .filter(Boolean)
      .map((s) => ({ ...s, gap: Math.max(0, threshold - s.level) }))
      .filter((s) => s.gap > 0);
  }, [skills, desiredSkills]);

  // Simple recommended learning paths (mocked) based on gaps
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
        {/* Profile Header */}
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
            <p className="institution">Institution: {user.institution}</p>
            <p className="joined">Joined: {user.joinedDate}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="profile-divider" />

        <div className="profile-grid">
          {/* Left: microcredentials */}
          <div className="profile-section">
            <h2 className="section-title">Microcredentials</h2>
            <div className="credentials-list">
              {user.microcredentials.map((cred) => (
                <div key={cred.id} className="credential-card">
                  <h3 className="credential-title">{cred.title}</h3>
                  <p className="credential-meta">{cred.issuer} • {cred.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Middle: Skills map */}
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

            {/* Quick controls: mark desired skills */}
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

          {/* Right: Gaps & recommended paths */}
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

export default Profile;
