import React, { useMemo } from "react";
import VerifyDocuments from "../VerifyDocument.jsx";
import { getDocs } from "../../utils/storage.js";
import "../../Style/AdminDashboard.css";

export default function AdminDashboard() {
  // Example: quick stats for admin dashboard
  const docs = getDocs();
  const totalDocs = docs.length;
  const verifiedDocs = docs.filter((d) => d.status === "verified").length;
  const pendingDocs = docs.filter((d) => d.status !== "verified").length;

  return (
    <div className="admin-dashboard-container">
      {/* Page Header */}
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">
          Admin Dashboard
        </h1>
        <p className="admin-dashboard-subtitle">
          Manage and verify uploaded credentials below.
        </p>

        {/* Quick Stats */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card total">
            <div className="admin-stat-label">Total Documents</div>
            <div className="admin-stat-value">
              {totalDocs}
            </div>
          </div>
          <div className="admin-stat-card verified">
            <div className="admin-stat-label">Verified</div>
            <div className="admin-stat-value">
              {verifiedDocs}
            </div>
          </div>
          <div className="admin-stat-card pending">
            <div className="admin-stat-label">Pending</div>
            <div className="admin-stat-value">
              {pendingDocs}
            </div>
          </div>
        </div>
      </div>

      {/* Document Verification Section */}
      <div className="admin-verify-section">
        <h2 className="admin-verify-title">
          Verify Documents
        </h2>
        <VerifyDocuments />
      </div>
    </div>
  );
}
