import React, { useMemo, useState, useEffect } from "react";
import VerifyDocuments from "../VerifyDocument.jsx";
import { useDocuments } from "../../context/DocumentContext";
import { getDocs } from "../../utils/storage.js";
import "../../Style/AdminDashboard.css";

export default function AdminDashboard() {
  const { getDocuments, loading: contextLoading } = useDocuments();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const allDocs = getDocuments();
      setDocs(allDocs || []);
    } catch (error) {
      console.error("Error loading documents:", error);
      setDocs([]);
    } finally {
      setLoading(false);
    }
  }, [getDocuments]);

  const { totalDocs, verifiedDocs, pendingDocs } = useMemo(() => {
    const total = docs.length;
    const verified = docs.filter((d) => d.status === "verified").length;
    const pending = docs.filter((d) => d.status !== "verified").length;
    return { totalDocs: total, verifiedDocs: verified, pendingDocs: pending };
  }, [docs]);

  if (loading) {
    return (
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">Loading...</h1>
        </div>
      </div>
    );
  }

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
