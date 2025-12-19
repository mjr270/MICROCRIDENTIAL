import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";
import { useDocuments } from "../../context/DocumentContext";
import DocumentList from "../../components/DocumentList";
import { getDocs, getOffersByLearner, updateOfferStatus } from "../../utils/storage";
import { NSQF_LEVELS, SECTORS } from "../../data/nsqf";
import "../../Style/LearnerDashboard.css";

export default function LearnerDashboard() {
  const { user } = useAuth();
  const { getDocuments } = useDocuments();
  const [allDocs, setAllDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobOffers, setJobOffers] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const docs = getDocuments();
      setAllDocs(docs || []);
      if (user?.email) {
        const offers = getOffersByLearner(user.email);
        setJobOffers(offers);
      }
    } catch (error) {
      console.error("Error loading documents:", error);
      setAllDocs([]);
    } finally {
      setLoading(false);
    }
  }, [user, getDocuments]);

  const learnerDocs = useMemo(
    () => {
      if (!user) return allDocs.filter((d) => d.owner === "Learner");
      // Show user's own documents
      return allDocs.filter((d) => d.owner === user.email);
    },
    [allDocs, user]
  );
  
  const institutionDocs = useMemo(
    () => {
      if (!user || !user.institution) return [];
      // Show documents from same institution (for collaboration - case-insensitive)
      return allDocs.filter((d) => 
        d.ownerInstitution && user.institution &&
        d.ownerInstitution.toLowerCase() === user.institution.toLowerCase() && 
        d.owner !== user.email &&
        d.status === 'verified'
      );
    },
    [allDocs, user]
  );

  const { totalDocs, verifiedDocs, pendingDocs, totalCredits, highestNSQFLevel } = useMemo(() => {
    const total = learnerDocs.length;
    const verified = learnerDocs.filter((d) => d.status === "verified").length;
    const pending = learnerDocs.filter((d) => d.status !== "verified").length;
    const credits = learnerDocs.reduce((sum, doc) => sum + (doc.credits || 0), 0);
    const maxLevel = learnerDocs.reduce((max, doc) => Math.max(max, doc.nsqfLevel || 0), 0);
    return { totalDocs: total, verifiedDocs: verified, pendingDocs: pending, totalCredits: credits, highestNSQFLevel: maxLevel };
  }, [learnerDocs]);

  if (loading) {
    return (
      <div className="learner-dashboard-container">
        <div className="learner-dashboard-header">
          <h1 className="learner-dashboard-title">Loading...</h1>
        </div>
      </div>
    );
  }

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
        
        {/* Action Buttons */}
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Link 
            to="/upload" 
            className="btn btn-primary"
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
          <div className="learner-stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="learner-stat-label">Total Credits (NSQF)</div>
            <div className="learner-stat-value">
              {totalCredits}
            </div>
          </div>
          <div className="learner-stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <div className="learner-stat-label">Highest NSQF Level</div>
            <div className="learner-stat-value">
              {highestNSQFLevel > 0 ? `Level ${highestNSQFLevel}` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Job Offers Section */}
      {jobOffers.length > 0 && (
        <div className="learner-offers-section" style={{ marginBottom: '2rem' }}>
          <h2 className="learner-documents-title" style={{ marginBottom: '1rem' }}>
            Job Offers ({jobOffers.filter(o => o.status === 'pending').length} pending)
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {jobOffers.map((offer) => (
              <div
                key={offer.id}
                style={{
                  padding: '1.5rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  backgroundColor: offer.status === 'pending' ? '#fffbeb' : '#f9fafb',
                  borderColor: offer.status === 'pending' ? '#fbbf24' : '#e5e7eb'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                      {offer.position}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      From: {offer.employerName}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#374151' }}>
                      <span>💰 {offer.salary}</span>
                      <span>📍 {offer.location}</span>
                      <span>⏰ {offer.jobType}</span>
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '0.375rem 0.875rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      backgroundColor: offer.status === 'accepted' ? '#d1fae5' : offer.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                      color: offer.status === 'accepted' ? '#065f46' : offer.status === 'rejected' ? '#991b1b' : '#92400e'
                    }}
                  >
                    {offer.status.toUpperCase()}
                  </span>
                </div>
                {offer.description && (
                  <p style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '1rem', lineHeight: '1.6' }}>
                    {offer.description}
                  </p>
                )}
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '1rem' }}>
                  Received: {new Date(offer.createdAt).toLocaleString()}
                </p>
                {offer.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => {
                        updateOfferStatus(offer.id, 'accepted');
                        setJobOffers(getOffersByLearner(user.email));
                        setToast({ type: 'success', message: 'Offer accepted! 🎉' });
                        setTimeout(() => setToast(null), 3000);
                      }}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}
                    >
                      ✓ Accept Offer
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to reject this offer?')) {
                          updateOfferStatus(offer.id, 'rejected');
                          setJobOffers(getOffersByLearner(user.email));
                          setToast({ type: 'error', message: 'Offer rejected.' });
                          setTimeout(() => setToast(null), 3000);
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}
                    >
                      ✗ Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NSQF Profile Section */}
      {learnerDocs.length > 0 && (
        <div className="learner-documents-section">
          {React.createElement(require('../../components/NSQFProfile').default, { documents: learnerDocs })}
        </div>
      )}

      {/* Stackability & Learning Pathways */}
      {learnerDocs.length > 0 && (
        <div className="learner-documents-section">
          {React.createElement(require('../../components/StackabilityView').default, { credentials: learnerDocs })}
        </div>
      )}

      {/* Document List Section */}
      <div className="learner-documents-section">
        <h2 className="learner-documents-title">
          Your Documents
        </h2>
        <DocumentList />
      </div>

      {/* Institution Documents Section */}
      {institutionDocs.length > 0 && user && user.institution && (
        <div className="learner-documents-section" style={{ marginTop: '2rem' }}>
          <h2 className="learner-documents-title">
            Documents from {user.institution}
          </h2>
          <div className="institution-docs-list">
            {institutionDocs.map((doc) => (
              <div key={doc.id} className="institution-doc-card">
                <div className="doc-info">
                  <h4>{doc.name}</h4>
                  <p className="doc-owner">By: {doc.ownerName || doc.owner}</p>
                  <p className="doc-date">{new Date(doc.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="doc-status-badge verified">Verified</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            padding: '1rem 1.5rem',
            backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: 1001,
            fontWeight: '500'
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
