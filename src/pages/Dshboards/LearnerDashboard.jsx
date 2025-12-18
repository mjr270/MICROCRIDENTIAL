import React, { useMemo } from "react";
import DocumentList from "../../components/DocumentList";
import { getDocs } from "../../utils/storage";
import "../../Style/LearnerDashboard.css";

export default function LearnerDashboard() {
  const allDocs = getDocs();

  // Filter only documents belonging to the current learner
  const learnerDocs = useMemo(
    () => allDocs.filter((d) => d.owner === "Learner"), // replace "Learner" with dynamic user.email if needed
    [allDocs]
  );

  const totalDocs = learnerDocs.length;
  const verifiedDocs = learnerDocs.filter((d) => d.status === "verified").length;
  const pendingDocs = learnerDocs.filter((d) => d.status !== "verified").length;

  return (
    <div className="learner-dashboard-container">
      {/* Page Header */}
      <div className="learner-dashboard-header">
        <h1 className="learner-dashboard-title">
          Learner Dashboard
        </h1>
        <p className="learner-dashboard-subtitle">
          Upload, track, and manage your credentials here.
        </p>

        {/* Quick Stats */}
        <div className="learner-stats-grid">
          <div className="learner-stat-card total">
            <div className="learner-stat-label">Total Documents</div>
            <div className="learner-stat-value">
              {totalDocs}
            </div>
          </div>
          <div className="learner-stat-card verified">
            <div className="learner-stat-label">Verified</div>
            <div className="learner-stat-value">
              {verifiedDocs}
            </div>
          </div>
          <div className="learner-stat-card pending">
            <div className="learner-stat-label">Pending</div>
            <div className="learner-stat-value">
              {pendingDocs}
            </div>
          </div>
        </div>
      </div>

      {/* Document List Section */}
      <div className="learner-documents-section">
        <h2 className="learner-documents-title">
          Your Documents
        </h2>
        <DocumentList />
      </div>
    </div>
  );
}
