import React, { useMemo } from "react";
import DocumentList from "../../components/DocumentList";
import { getDocs } from "../../utils/storage";
import "../../Style/InstitutionDashboard.css";

export default function InstitutionDashboard() {
  const allDocs = getDocs();
  const institutionDocs = useMemo(
    () => allDocs.filter((d) => d.owner === "Institution"), // replace with dynamic check if needed
    [allDocs]
  );

  const totalDocs = institutionDocs.length;
  const verifiedDocs = institutionDocs.filter((d) => d.status === "verified").length;
  const pendingDocs = institutionDocs.filter((d) => d.status !== "verified").length;

  return (
    <div className="institution-dashboard-container">
      {/* Page Header */}
      <div className="institution-dashboard-header">
        <h1 className="institution-dashboard-title">
          Institution Dashboard
        </h1>
        <p className="institution-dashboard-subtitle">
          Manage and track documents issued by your institution.
        </p>

        {/* Quick Stats */}
        <div className="institution-stats-grid">
          <div className="institution-stat-card total">
            <div className="institution-stat-label">Total Documents</div>
            <div className="institution-stat-value">
              {totalDocs}
            </div>
          </div>
          <div className="institution-stat-card verified">
            <div className="institution-stat-label">Verified</div>
            <div className="institution-stat-value">
              {verifiedDocs}
            </div>
          </div>
          <div className="institution-stat-card pending">
            <div className="institution-stat-label">Pending</div>
            <div className="institution-stat-value">
              {pendingDocs}
            </div>
          </div>
        </div>
      </div>

      {/* Document List Section */}
      <div className="institution-documents-section">
        <h2 className="institution-documents-title">
          Documents
        </h2>
        <DocumentList />
      </div>
    </div>
  );
}
