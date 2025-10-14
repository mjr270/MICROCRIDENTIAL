import React, { useEffect, useMemo, useState } from "react";

// Mock async fetch to simulate an API. Replace with real API calls.
const fetchDashboardData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          coursesCompleted: 18,
          certificatesEarned: 7,
          activeHours: 92,
          verifiedCourses: 11,
        },
        courses: [
          { id: 1, title: "Intro to JavaScript", category: "Technical", verified: true, hours: 12 },
          { id: 2, title: "UI/UX Basics", category: "Non-Technical", verified: true, hours: 8 },
          { id: 3, title: "Advanced React", category: "Technical", verified: false, hours: 20 },
          { id: 4, title: "Project Management", category: "Non-Technical", verified: true, hours: 10 },
          { id: 5, title: "Data Structures", category: "Technical", verified: true, hours: 15 },
          { id: 6, title: "Communication Skills", category: "Non-Technical", verified: false, hours: 6 },
        ],
        certificates: [
          { id: "c1", name: "JavaScript Fundamentals", issuer: "KaushalLink", date: "2025-08-12" },
          { id: "c2", name: "UX Foundations", issuer: "KaushalLink", date: "2025-06-30" },
          { id: "c3", name: "Data Structures", issuer: "KaushalLink", date: "2024-12-01" },
        ],
        activity: [
          { id: "a1", text: "Completed Intro to JavaScript", time: "2 days ago" },
          { id: "a2", text: "Earned JavaScript Fundamentals certificate", time: "3 weeks ago" },
          { id: "a3", text: "Enrolled in Advanced React", time: "1 month ago" },
        ],
      });
    }, 450);
  });

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchDashboardData().then((d) => {
      if (!cancelled) {
        setData(d);
        setLoading(false);
      }
    });
    return () => (cancelled = true);
  }, []);

  const filteredCourses = useMemo(() => {
    if (!data) return [];
    if (filter === "All") return data.courses;
    if (filter === "Verified") return data.courses.filter((c) => c.verified);
    return data.courses.filter((c) => c.category === filter);
  }, [data, filter]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/3" />
            <div className="grid grid-cols-3 gap-4">
              <div className="h-24 bg-gray-200 rounded" />
              <div className="h-24 bg-gray-200 rounded" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { stats, certificates, activity } = data;

  return (
    <div className="flex flex-col">
      <main className="flex-grow p-6 bg-gray-50 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center justify-between mb-6 animate-slide-up">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Welcome back</h1>
              <p className="text-gray-600">Overview of your learning and achievements</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Verified Courses</div>
                <div className="text-xl font-semibold">{stats.verifiedCourses}</div>
              </div>
              <button
                onClick={async () => {
                  const url = `${window.location.origin}/profile`;
                  try {
                    await navigator.clipboard.writeText(url);
                    setToast({ type: "success", message: "Profile link copied to clipboard" });
                    setTimeout(() => setToast(null), 2500);
                  } catch (e) {
                    setToast({ type: "error", message: "Unable to copy link" });
                    setTimeout(() => setToast(null), 2500);
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded smooth-transform hover:scale-105"
              >
                Share Profile
              </button>
            </div>
          </header>

          {/* Top stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-white rounded-lg shadow flex flex-col animate-pop smooth-transform hover:scale-105">
              <div className="text-sm text-gray-500">Courses Completed</div>
              <div className="text-2xl font-bold">{stats.coursesCompleted}</div>
              <div className="mt-3 text-xs text-gray-500">Keep up the great work — aim for 20!</div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow flex flex-col animate-pop smooth-transform hover:scale-105">
              <div className="text-sm text-gray-500">Certificates Earned</div>
              <div className="text-2xl font-bold">{stats.certificatesEarned}</div>
              <div className="mt-3 text-xs text-gray-500">Certificates verify your skills.</div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow flex flex-col animate-pop smooth-transform hover:scale-105">
              <div className="text-sm text-gray-500">Active Learning Hours</div>
              <div className="text-2xl font-bold">{stats.activeHours}</div>
              <div className="mt-3 text-xs text-gray-500">Total hours logged this year.</div>
            </div>
          </section>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left: Courses */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Verified courses</h2>
                <div className="flex items-center gap-2">
                  {["All", "Verified", "Technical", "Non-Technical"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1 rounded ${filter === f ? "bg-blue-600 text-white" : "bg-white border"}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {filteredCourses.map((c, idx) => (
                  <article key={c.id} className="p-4 bg-white rounded-lg shadow flex items-center justify-between animate-fade-in smooth-transform" style={{ animationDelay: `${idx * 40}ms` }}>
                    <div>
                      <h3 className="font-semibold">{c.title}</h3>
                      <div className="text-sm text-gray-500">{c.category} • {c.hours} hrs</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {c.verified ? (
                        <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded">Verified</span>
                      ) : (
                        <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded">In progress</span>
                      )}
                      <button
                        onClick={() => setSelectedCourse(c)}
                        className="px-3 py-1 border rounded text-sm smooth-transform hover:scale-105"
                      >
                        View
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right: Certificates & Activity */}
            <aside className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow animate-pop smooth-transform">
                <h3 className="font-semibold mb-2">Certificates</h3>
                <ul className="space-y-2">
                  {certificates.map((cert) => (
                      <li key={cert.id} className="flex items-center justify-between animate-slide-up">
                      <div>
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-xs text-gray-500">{cert.issuer} • {new Date(cert.date).toLocaleDateString()}</div>
                      </div>
                      <button
                        onClick={() => {
                          // simulate download of a simple text/pdf blob
                          const content = `Certificate: ${cert.name}\nIssued by: ${cert.issuer}\nDate: ${cert.date}`;
                          const blob = new Blob([content], { type: "text/plain" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `${cert.name.replace(/\s+/g, "_")}.txt`;
                          document.body.appendChild(a);
                            a.click();
                            a.remove();
                            URL.revokeObjectURL(url);
                            setToast({ type: "success", message: "Download started" });
                            try { import('../utils/confetti').then(m => m.burstConfetti({ count: 14 })).catch(() => {}); } catch(e) {}
                            setTimeout(() => setToast(null), 2000);
                        }}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm smooth-transform hover:scale-105"
                      >
                        Download
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-white rounded-lg shadow animate-pop smooth-transform">
                <h3 className="font-semibold mb-2">Recent activity</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  {activity.map((a) => (
                    <li key={a.id} className="flex justify-between items-center">
                      <span>{a.text}</span>
                      <span className="text-xs text-gray-400">{a.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

        {/* Toast */}
        {toast && (
          <div className={`fixed right-6 bottom-6 p-3 rounded shadow ${toast.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"} animate-pop`}> 
            {toast.message}
          </div>
        )}

        {/* Course drawer/modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center animate-fade-in">
            <div className="bg-white rounded-t-lg sm:rounded-lg w-full sm:w-3/4 max-w-2xl p-6 animate-pop smooth-transform">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{selectedCourse.title}</h3>
                  <div className="text-sm text-gray-500">{selectedCourse.category} • {selectedCourse.hours} hrs</div>
                </div>
                <button onClick={() => setSelectedCourse(null)} className="text-gray-500">Close</button>
              </div>
              <div className="mt-4 text-gray-700">
                <p>This is a placeholder details view. Replace with full course details, progress, and actions (resume, certificate, share).</p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Dashboard;
