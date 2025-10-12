import React, { useState } from "react";

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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
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

        {/* Microcredential Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Microcredential Details</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {user.microcredentials.map((cred) => (
              <div
                key={cred.id}
                className="p-4 border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-gray-50"
              >
                <h3 className="font-semibold text-gray-700">{cred.title}</h3>
                <p className="text-sm text-gray-500">Issuer: {cred.issuer}</p>
                <p className="text-xs text-gray-400 mt-1">Date: {cred.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
