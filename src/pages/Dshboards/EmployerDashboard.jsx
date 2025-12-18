import React, { useMemo } from "react";
import { getDocs } from "../../utils/storage";
import "../../Style/EmployerDashboard.css";

export default function EmployerDashboard() {
  const allDocs = getDocs();
  const verifiedDocs = useMemo(
    () => allDocs.filter((d) => d.status === "verified"),
    [allDocs]
  );

  const totalVerified = verifiedDocs.length;

  return (
    <div className="employer-dashboard-container">
      {/* Page Header */}
      <div className="employer-dashboard-header">
        <h1 className="employer-dashboard-title">
          Employer Dashboard
        </h1>
        <p className="employer-dashboard-subtitle">
          View all verified credentials uploaded by learners and institutions.
        </p>

        {/* Quick Stats */}
        <div className="employer-stats-grid">
          <div className="employer-stat-card">
            <div className="employer-stat-label">Verified Documents</div>
            <div className="employer-stat-value">
              {totalVerified}
            </div>
          </div>
        </div>
      </div>

      {/* Verified Documents Section */}
      <div className="employer-documents-list">
        {verifiedDocs.length === 0 ? (
          <p className="employer-no-docs">
            No verified documents yet.
          </p>
        ) : (
          verifiedDocs.map((doc) => (
            <div
              key={doc.id}
              className="employer-doc-card"
            >
              <div className="employer-doc-info">
                <div className="employer-doc-name">
                  {doc.name}
                </div>
                <div className="employer-doc-meta">
                  {doc.owner} • {new Date(doc.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="employer-doc-status">
                Verified
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
