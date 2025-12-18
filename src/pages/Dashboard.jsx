import React, { useEffect, useMemo, useState } from "react";
import "../Style/Dashboard.css";

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
      <div className="dashboard-loading-wrapper">
        <div className="dashboard-loading-container">
          <div className="dashboard-loading-pulse">
            <div className="dashboard-loading-title" />
            <div className="dashboard-loading-stats">
              <div className="dashboard-loading-stat" />
              <div className="dashboard-loading-stat" />
              <div className="dashboard-loading-stat" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { stats, certificates, activity } = data;

  return (
    <div className="dashboard-wrapper">
      <main className="dashboard-main">
        <div className="dashboard-container">
          <header className="dashboard-header">
            <div className="dashboard-header-text">
              <h1>Welcome back</h1>
              <p>Overview of your learning and achievements</p>
            </div>

            <div className="dashboard-header-actions">
              <div className="dashboard-verified-count">
                <div className="dashboard-verified-label">Verified Courses</div>
                <div className="dashboard-verified-value">{stats.verifiedCourses}</div>
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
                className="dashboard-share-btn"
              >
                Share Profile
              </button>
            </div>
          </header>

          {/* Top stats */}
          <section className="dashboard-stats-grid">
            <div className="dashboard-stat-card">
              <div className="dashboard-stat-label">Courses Completed</div>
              <div className="dashboard-stat-value">{stats.coursesCompleted}</div>
              <div className="dashboard-stat-hint">Keep up the great work — aim for 20!</div>
            </div>

            <div className="dashboard-stat-card">
              <div className="dashboard-stat-label">Certificates Earned</div>
              <div className="dashboard-stat-value">{stats.certificatesEarned}</div>
              <div className="dashboard-stat-hint">Certificates verify your skills.</div>
            </div>

            <div className="dashboard-stat-card">
              <div className="dashboard-stat-label">Active Learning Hours</div>
              <div className="dashboard-stat-value">{stats.activeHours}</div>
              <div className="dashboard-stat-hint">Total hours logged this year.</div>
            </div>
          </section>

          <div className="dashboard-content-grid">
            {/* Left: Courses */}
            <div className="dashboard-courses-section">
              <div className="dashboard-courses-header">
                <h2 className="dashboard-courses-title">Verified courses</h2>
                <div className="dashboard-filter-buttons">
                  {["All", "Verified", "Technical", "Non-Technical"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`dashboard-filter-btn ${filter === f ? "active" : "inactive"}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="dashboard-courses-list">
                {filteredCourses.map((c, idx) => (
                  <article key={c.id} className="dashboard-course-card" style={{ animationDelay: `${idx * 40}ms` }}>
                    <div className="dashboard-course-info">
                      <h3>{c.title}</h3>
                      <div className="dashboard-course-meta">{c.category} • {c.hours} hrs</div>
                    </div>
                    <div className="dashboard-course-actions">
                      {c.verified ? (
                        <span className="dashboard-course-status verified">Verified</span>
                      ) : (
                        <span className="dashboard-course-status inprogress">In progress</span>
                      )}
                      <button
                        onClick={() => setSelectedCourse(c)}
                        className="dashboard-course-view-btn"
                      >
                        View
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right: Certificates & Activity */}
            <aside className="dashboard-sidebar">
              <div className="dashboard-sidebar-card">
                <h3 className="dashboard-sidebar-title">Certificates</h3>
                <ul className="dashboard-certificates-list">
                  {certificates.map((cert) => (
                      <li key={cert.id} className="dashboard-certificate-item">
                      <div className="dashboard-certificate-info">
                        <h4>{cert.name}</h4>
                        <div className="dashboard-certificate-meta">{cert.issuer} • {new Date(cert.date).toLocaleDateString()}</div>
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
                        className="dashboard-certificate-download-btn"
                      >
                        Download
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dashboard-sidebar-card">
                <h3 className="dashboard-sidebar-title">Recent activity</h3>
                <ul className="dashboard-activity-list">
                  {activity.map((a) => (
                    <li key={a.id} className="dashboard-activity-item">
                      <span>{a.text}</span>
                      <span className="dashboard-activity-time">{a.time}</span>
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
          <div className={`dashboard-toast ${toast.type}`}> 
            {toast.message}
          </div>
        )}

        {/* Course drawer/modal */}
        {selectedCourse && (
          <div className="dashboard-modal-overlay">
            <div className="dashboard-modal-content">
              <div className="dashboard-modal-header">
                <div>
                  <h3 className="dashboard-modal-title">{selectedCourse.title}</h3>
                  <div className="dashboard-modal-subtitle">{selectedCourse.category} • {selectedCourse.hours} hrs</div>
                </div>
                <button onClick={() => setSelectedCourse(null)} className="dashboard-modal-close-btn">Close</button>
              </div>
              <div className="dashboard-modal-body">
                <p>This is a placeholder details view. Replace with full course details, progress, and actions (resume, certificate, share).</p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Dashboard;
