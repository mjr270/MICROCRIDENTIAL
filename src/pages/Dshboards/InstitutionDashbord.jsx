import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";
import { useDocuments } from "../../context/DocumentContext";
import DocumentList from "../../components/DocumentList";
import { getDocs } from "../../utils/storage";
import "../../Style/InstitutionDashboard.css";

export default function InstitutionDashboard() {
  const { user } = useAuth();
  const { getDocuments } = useDocuments();
  const [allDocs, setAllDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const docs = getDocuments();
      setAllDocs(docs || []);
    } catch (error) {
      console.error("Error loading documents:", error);
      setAllDocs([]);
    } finally {
      setLoading(false);
    }
  }, [getDocuments]);

  const institutionDocs = useMemo(
    () => {
      if (!user) return allDocs.filter((d) => d.owner === "Institution");
      // Show documents from learners at this institution (case-insensitive)
      return allDocs.filter((d) => 
        (d.ownerInstitution && user.institution && 
         d.ownerInstitution.toLowerCase() === user.institution.toLowerCase()) || 
        d.owner === user.email
      );
    },
    [allDocs, user]
  );
  
  const learnersByInstitution = useMemo(
    () => {
      if (!user || !user.institution) return [];
      // Show all learner documents from this institution (case-insensitive)
      return allDocs.filter((d) => 
        d.ownerInstitution && user.institution &&
        d.ownerInstitution.toLowerCase() === user.institution.toLowerCase() && 
        d.ownerRole === 'Learner'
      );
    },
    [allDocs, user]
  );

  const { totalDocs, verifiedDocs, pendingDocs } = useMemo(() => {
    const total = institutionDocs.length;
    const verified = institutionDocs.filter((d) => d.status === "verified").length;
    const pending = institutionDocs.filter((d) => d.status !== "verified").length;
    return { totalDocs: total, verifiedDocs: verified, pendingDocs: pending };
  }, [institutionDocs]);

  if (loading) {
    return (
      <div className="institution-dashboard-container">
        <div className="institution-dashboard-header">
          <h1 className="institution-dashboard-title">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="institution-dashboard-container">
      {/* Page Header */}
      <div className="institution-dashboard-header">
        <h1 className="institution-dashboard-title">
          Institution Dashboard
        </h1>
        <p className="institution-dashboard-subtitle">
          Manage and track documents from learners at your institution.
        </p>
        
        {user?.institution && (
          <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#dbeafe', border: '1px solid #3b82f6', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#1e40af', margin: 0 }}>
              📚 Showing documents from: <strong>{user.institution}</strong>
            </p>
          </div>
        )}
        
        {!user?.institution && (
          <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#fee2e2', border: '1px solid #ef4444', borderRadius: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#991b1b', margin: 0 }}>
              ⚠️ No institution set. Please update your profile to see learner documents.
            </p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div style={{ marginTop: '1rem', marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
          <Link 
            to="/verify" 
            className="btn btn-primary"
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              display: 'inline-block',
              fontWeight: '500'
            }}
          >
            Verify Documents
          </Link>
          <Link 
            to="/upload" 
            className="btn btn-secondary"
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#10b981',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              display: 'inline-block',
              fontWeight: '500'
            }}
          >
            Upload Document
          </Link>
        </div>

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
