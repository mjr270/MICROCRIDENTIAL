import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDocuments } from "../../context/DocumentContext";
import { getDocs } from "../../utils/storage";
import { useAuth } from "../../context/Authcontext";
import { createOffer, getOffersByEmployer } from "../../utils/storage";
import "../../Style/EmployerDashboard.css";

export default function EmployerDashboard() {
  const { user } = useAuth();
  const { getDocuments } = useDocuments();
  const [allDocs, setAllDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterInstitution, setFilterInstitution] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerForm, setOfferForm] = useState({
    position: "",
    salary: "",
    location: "",
    jobType: "Full-time",
    description: ""
  });
  const [toast, setToast] = useState(null);
  const [myOffers, setMyOffers] = useState([]);

  useEffect(() => {
    try {
      const docs = getDocuments();
      setAllDocs(docs || []);
      if (user?.email) {
        const offers = getOffersByEmployer(user.email);
        setMyOffers(offers);
      }
    } catch (error) {
      console.error("Error loading documents:", error);
      setAllDocs([]);
    } finally {
      setLoading(false);
    }
  }, [user, getDocuments]);

  const verifiedDocs = useMemo(
    () => allDocs.filter((d) => d.status === "verified"),
    [allDocs]
  );

  const filteredDocs = useMemo(() => {
    let filtered = [...verifiedDocs];
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          (d.name || "").toLowerCase().includes(q) ||
          (d.ownerName || "").toLowerCase().includes(q) ||
          (d.ownerInstitution || "").toLowerCase().includes(q)
      );
    }
    
    if (filterInstitution) {
      filtered = filtered.filter((d) => 
        d.ownerInstitution && 
        d.ownerInstitution.toLowerCase() === filterInstitution.toLowerCase()
      );
    }
    
    return filtered;
  }, [verifiedDocs, searchQuery, filterInstitution]);

  const institutions = useMemo(() => {
    const instSet = new Set();
    verifiedDocs.forEach((d) => {
      if (d.ownerInstitution && d.ownerInstitution !== 'Not specified') {
        instSet.add(d.ownerInstitution);
      }
    });
    return Array.from(instSet).sort();
  }, [verifiedDocs]);

  const totalVerified = verifiedDocs.length;
  
  const handleMakeOffer = (doc) => {
    setSelectedDoc(doc);
    setShowOfferModal(true);
  };
  
  const handleOfferSubmit = (e) => {
    e.preventDefault();
    if (!user?.email) {
      setToast({ type: 'error', message: 'You must be logged in to make offers.' });
      setTimeout(() => setToast(null), 2000);
      return;
    }
    
    if (!selectedDoc) return;
    
    // Check if offer already exists for this learner and position
    const existingOffer = myOffers.find(
      o => o.learnerEmail === selectedDoc.owner && 
      o.position.toLowerCase() === offerForm.position.toLowerCase() &&
      o.status === 'pending'
    );
    
    if (existingOffer) {
      setToast({ type: 'error', message: 'You already have a pending offer for this position to this learner.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    
    const offer = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
      employerEmail: user.email,
      employerName: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email,
      learnerEmail: selectedDoc.owner,
      learnerName: selectedDoc.ownerName,
      documentId: selectedDoc.id,
      position: offerForm.position,
      salary: offerForm.salary,
      location: offerForm.location,
      jobType: offerForm.jobType,
      description: offerForm.description,
      status: 'pending', // pending, accepted, rejected
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    createOffer(offer);
    // Refresh offers from storage
    const updatedOffers = getOffersByEmployer(user.email);
    setMyOffers(updatedOffers);
    
    setToast({ type: 'success', message: `Offer sent to ${selectedDoc.ownerName}!` });
    setTimeout(() => setToast(null), 3000);
    
    setShowOfferModal(false);
    setOfferForm({
      position: "",
      salary: "",
      location: "",
      jobType: "Full-time",
      description: ""
    });
    setSelectedDoc(null);
  };
  
  const handleDownload = (doc) => {
    if (doc.dataUrl) {
      const a = document.createElement('a');
      a.href = doc.dataUrl;
      a.download = doc.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  if (loading) {
    return (
      <div className="employer-dashboard-container">
        <div className="employer-dashboard-header">
          <h1 className="employer-dashboard-title">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="employer-dashboard-container">
      {/* Page Header */}
      <div className="employer-dashboard-header">
        <h1 className="employer-dashboard-title">
          Employer Dashboard
        </h1>
        <p className="employer-dashboard-subtitle">
          Browse verified credentials from learners and institutions.
        </p>
        <div style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: '#92400e', margin: 0 }}>
            ℹ️ <strong>Note:</strong> Only verified documents are visible here. Learners' uploaded documents must be verified by Admin or Institution first.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
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
        </div>

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

      {/* Search and Filter Section */}
      <div className="employer-search-section" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name, owner, or institution..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: '1',
            minWidth: '250px',
            padding: '0.75rem',
            border: '2px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            backgroundColor: '#ffffff',
            color: '#111827'
          }}
        />
        <select
          value={filterInstitution}
          onChange={(e) => setFilterInstitution(e.target.value)}
          style={{
            padding: '0.75rem',
            border: '2px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.95rem',
            minWidth: '200px',
            backgroundColor: '#ffffff',
            color: '#111827'
          }}
        >
          <option value="">All Institutions</option>
          {institutions.map((inst) => (
            <option key={inst} value={inst}>{inst}</option>
          ))}
        </select>
      </div>

      {/* My Offers Section */}
      {myOffers.length > 0 && (
        <div className="employer-offers-section" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>My Job Offers</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {myOffers.slice(0, 5).map((offer) => (
              <div
                key={offer.id}
                style={{
                  padding: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f9fafb'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{offer.position}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>To: {offer.learnerName}</p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{offer.salary} • {offer.location}</p>
                  </div>
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: offer.status === 'accepted' ? '#d1fae5' : offer.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                      color: offer.status === 'accepted' ? '#065f46' : offer.status === 'rejected' ? '#991b1b' : '#92400e'
                    }}
                  >
                    {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verified Documents Section */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }}>Verified Credentials ({filteredDocs.length})</h2>
      <div className="employer-documents-list">
        {filteredDocs.length === 0 ? (
          <p className="employer-no-docs">
            {verifiedDocs.length === 0 ? 'No verified documents yet.' : 'No documents match your search criteria.'}
          </p>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="employer-doc-card"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div className="employer-doc-info">
                <div className="employer-doc-name" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                  {doc.name}
                </div>
                <div className="employer-doc-meta" style={{ color: '#374151', marginBottom: '0.25rem' }}>
                  <strong>Owner:</strong> {doc.ownerName || doc.owner} ({doc.ownerRole || 'Unknown'})
                </div>
                <div className="employer-doc-meta" style={{ color: '#374151', marginBottom: '0.25rem' }}>
                  <strong>Institution:</strong> {doc.ownerInstitution || 'Not specified'}
                </div>
                <div className="employer-doc-meta" style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Uploaded: {new Date(doc.createdAt).toLocaleString()}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div className="employer-doc-status">
                  Verified
                </div>
                <button
                  onClick={() => handleDownload(doc)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  View
                </button>
                <button
                  onClick={() => handleMakeOffer(doc)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Make Offer
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Offer Modal */}
      {showOfferModal && selectedDoc && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowOfferModal(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.75rem',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              Make Job Offer to {selectedDoc.ownerName}
            </h3>
            <form onSubmit={handleOfferSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Position *</label>
                <input
                  type="text"
                  required
                  value={offerForm.position}
                  onChange={(e) => setOfferForm({ ...offerForm, position: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Salary *</label>
                <input
                  type="text"
                  required
                  value={offerForm.salary}
                  onChange={(e) => setOfferForm({ ...offerForm, salary: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                  placeholder="e.g., $80,000 - $100,000"
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location *</label>
                <input
                  type="text"
                  required
                  value={offerForm.location}
                  onChange={(e) => setOfferForm({ ...offerForm, location: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                  placeholder="e.g., San Francisco, CA / Remote"
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Job Type *</label>
                <select
                  value={offerForm.jobType}
                  onChange={(e) => setOfferForm({ ...offerForm, jobType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                <textarea
                  value={offerForm.description}
                  onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    resize: 'vertical'
                  }}
                  placeholder="Brief description of the role..."
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Send Offer
                </button>
                <button
                  type="button"
                  onClick={() => setShowOfferModal(false)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
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
