import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const stats = [
    { title: "Courses Completed", value: 12, color: "bg-blue-100", progress: 80 },
    { title: "Certificates Earned", value: 5, color: "bg-green-100", progress: 50 },
    { title: "Active Learning Hours", value: 48, color: "bg-yellow-100", progress: 60 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-6 bg-gray-50">
        <h1 className="text-5xl font-bold mb-6 text-center">Dashboard</h1>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className={`p-6 rounded-xl shadow-lg ${stat.color}`}>
              <h2 className="text-xl font-semibold mb-2">{stat.title}</h2>
              <p className="text-3xl font-bold mb-4">{stat.value}</p>
              <div className="w-full bg-gray-300 h-2 rounded">
                <div className="h-2 rounded bg-blue-600" style={{ width: `${stat.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
