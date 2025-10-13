import React, { useState, useMemo } from "react";

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
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img
              src={selectedFile || user.profilePhoto}
              alt="Profile"
              className="w-36 h-36 object-cover rounded-full border-4 border-blue-500 shadow-md"
            />
            <label className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md cursor-pointer hover:bg-blue-700">
              Change
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">Role: {user.role}</p>
            <p className="text-sm text-gray-500">Institution: {user.institution}</p>
            <p className="text-sm text-gray-400">Joined: {user.joinedDate}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200" />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: microcredentials */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Microcredentials</h2>
            <div className="space-y-3">
              {user.microcredentials.map((cred) => (
                <div key={cred.id} className="p-3 border rounded-lg bg-gray-50">
                  <h3 className="font-medium text-gray-700">{cred.title}</h3>
                  <p className="text-xs text-gray-500">{cred.issuer} • {cred.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Middle: Skills map */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Skill Map</h2>
            <div className="space-y-4">
              {skills.map((s) => (
                <div key={s.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="font-medium text-gray-700">{s.name}</div>
                      <div className="text-xs text-gray-400">Proficiency: {s.level}%</div>
                    </div>
                    <div className="text-xs text-gray-500">{s.level >= 70 ? 'Good' : s.level >= 40 ? 'Learning' : 'Beginner'}</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick controls: mark desired skills */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Desired Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => {
                  const active = desiredSkills.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() =>
                        setDesiredSkills((prev) => (prev.includes(s.id) ? prev.filter((x) => x !== s.id) : [...prev, s.id]))
                      }
                      className={`px-3 py-1 rounded-full text-sm ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Gaps & recommended paths */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Skill Gaps & Recommendations</h2>

            {gaps.length === 0 ? (
              <div className="p-4 border rounded-lg bg-green-50 text-green-700">No major gaps detected. Great job!</div>
            ) : (
              <div className="space-y-4">
                <div className="p-3 border rounded-lg bg-yellow-50">
                  <h3 className="font-medium text-gray-800">Detected Gaps</h3>
                  <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
                    {gaps.map((g) => (
                      <li key={g.id}>{g.name} — needs ~{g.gap}% improvement to reach target proficiency</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Recommended Learning Paths</h3>
                  <div className="space-y-3">
                    {recommendedPaths.map((p) => (
                      <div key={p.id} className="p-3 border rounded-lg bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-gray-800">{p.title}</div>
                            <div className="text-xs text-gray-500">Duration: {p.duration} • Modules: {p.modules}</div>
                          </div>
                          <div className="ml-4">
                            {enrolledPaths.includes(p.id) ? (
                              <button onClick={() => unenroll(p.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded">Unenroll</button>
                            ) : (
                              <button onClick={() => enroll(p.id)} className="px-3 py-1 bg-blue-600 text-white rounded">Enroll</button>
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
