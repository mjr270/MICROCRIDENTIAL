import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DocumentContext = createContext();

/**
 * DocumentProvider
 * -------------------------
 * Manages all document operations with localStorage persistence
 * Replaces backend API calls with local state management
 */
export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const [verifications, setVerifications] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const storedDocs = localStorage.getItem('kaushallink_documents');
      const storedVerifications = localStorage.getItem('kaushallink_verifications');
      const storedAuditLogs = localStorage.getItem('kaushallink_audit_logs');

      if (storedDocs) setDocuments(JSON.parse(storedDocs));
      if (storedVerifications) setVerifications(JSON.parse(storedVerifications));
      if (storedAuditLogs) setAuditLogs(JSON.parse(storedAuditLogs));
    } catch (error) {
      console.error('Error loading documents from storage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('kaushallink_documents', JSON.stringify(documents));
    }
  }, [documents, loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('kaushallink_verifications', JSON.stringify(verifications));
    }
  }, [verifications, loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('kaushallink_audit_logs', JSON.stringify(auditLogs));
    }
  }, [auditLogs, loading]);

  // Audit log helper
  const logAudit = useCallback((action, userId, details) => {
    const newLog = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
      action,
      userId,
      details,
      timestamp: new Date().toISOString(),
    };
    setAuditLogs(prev => [newLog, ...prev]);
  }, []);

  // ===== DOCUMENT OPERATIONS =====

  const getDocuments = useCallback((filters = {}) => {
    let filtered = [...documents];

    if (filters.status) {
      filtered = filtered.filter(doc => doc.status === filters.status);
    }
    if (filters.owner) {
      filtered = filtered.filter(doc => doc.owner === filters.owner);
    }
    if (filters.sector) {
      filtered = filtered.filter(doc => doc.sector === filters.sector);
    }
    if (filters.nsqfLevel) {
      filtered = filtered.filter(doc => doc.nsqfLevel === parseInt(filters.nsqfLevel));
    }
    if (filters.institution) {
      filtered = filtered.filter(doc => 
        doc.ownerInstitution && 
        doc.ownerInstitution.toLowerCase() === filters.institution.toLowerCase()
      );
    }

    return filtered;
  }, [documents]);

  const getDocument = useCallback((id) => {
    return documents.find(doc => doc.id === id);
  }, [documents]);

  const createDocument = useCallback((documentData) => {
    const newDoc = {
      id: documentData.id || Date.now().toString() + Math.random().toString(36).slice(2, 6),
      ...documentData,
      createdAt: documentData.createdAt || Date.now(),
      updatedAt: Date.now(),
      status: documentData.status || 'pending',
    };

    setDocuments(prev => [newDoc, ...prev]);
    logAudit('DOCUMENT_CREATED', documentData.owner, { 
      documentId: newDoc.id, 
      documentName: newDoc.name 
    });

    return newDoc;
  }, [logAudit]);

  const updateDocument = useCallback((id, updates) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id 
        ? { ...doc, ...updates, id, updatedAt: Date.now() }
        : doc
    ));

    logAudit('DOCUMENT_UPDATED', updates.updatedBy || 'system', { documentId: id });
  }, [logAudit]);

  const deleteDocument = useCallback((id, userId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    logAudit('DOCUMENT_DELETED', userId || 'system', { documentId: id });
  }, [logAudit]);

  // ===== VERIFICATION OPERATIONS =====

  const verifyDocument = useCallback((id, verificationData) => {
    const doc = documents.find(d => d.id === id);
    if (!doc) return null;

    const { status, verifiedBy, verificationNotes } = verificationData;

    // Update document
    setDocuments(prev => prev.map(d => 
      d.id === id 
        ? {
            ...d,
            status: status || 'verified',
            verifiedBy,
            verifiedAt: Date.now(),
            verificationNotes: verificationNotes || '',
            updatedAt: Date.now(),
          }
        : d
    ));

    // Add verification record
    const verification = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
      documentId: id,
      documentName: doc.name,
      owner: doc.owner,
      verifiedBy,
      status,
      verificationNotes,
      timestamp: new Date().toISOString(),
    };
    setVerifications(prev => [verification, ...prev]);

    logAudit('DOCUMENT_VERIFIED', verifiedBy, { 
      documentId: id, 
      status, 
      documentName: doc.name 
    });

    return verification;
  }, [documents, logAudit]);

  const getDocumentVerifications = useCallback((id) => {
    return verifications.filter(v => v.documentId === id);
  }, [verifications]);

  const getAllVerifications = useCallback((filters = {}) => {
    let filtered = [...verifications];

    if (filters.verifiedBy) {
      filtered = filtered.filter(v => v.verifiedBy === filters.verifiedBy);
    }
    if (filters.status) {
      filtered = filtered.filter(v => v.status === filters.status);
    }

    return filtered;
  }, [verifications]);

  // ===== LEARNER PROFILE =====

  const getLearnerProfile = useCallback((email) => {
    const learnerDocs = documents.filter(doc => doc.owner === email);

    const totalCredits = learnerDocs.reduce((sum, doc) => sum + (doc.credits || 0), 0);
    const highestNSQFLevel = learnerDocs.reduce((max, doc) => Math.max(max, doc.nsqfLevel || 0), 0);
    const verifiedCount = learnerDocs.filter(doc => doc.status === 'verified').length;

    const bySector = learnerDocs.reduce((acc, doc) => {
      const sector = doc.sector || 'others';
      acc[sector] = (acc[sector] || 0) + 1;
      return acc;
    }, {});

    const skills = new Set();
    learnerDocs.forEach(doc => {
      if (doc.skillsAcquired && Array.isArray(doc.skillsAcquired)) {
        doc.skillsAcquired.forEach(skill => skills.add(skill));
      }
    });

    return {
      email,
      totalCredentials: learnerDocs.length,
      verifiedCredentials: verifiedCount,
      totalCredits,
      highestNSQFLevel,
      credentialsBySector: bySector,
      skills: Array.from(skills),
      credentials: learnerDocs.map(doc => ({
        id: doc.id,
        name: doc.name,
        nsqfLevel: doc.nsqfLevel,
        sector: doc.sector,
        credits: doc.credits,
        status: doc.status,
        createdAt: doc.createdAt,
      })),
    };
  }, [documents]);

  // ===== INSTITUTION OPERATIONS =====

  const getInstitutionDocuments = useCallback((institution) => {
    return documents.filter(doc => 
      doc.ownerInstitution && 
      doc.ownerInstitution.toLowerCase() === institution.toLowerCase()
    );
  }, [documents]);

  const issueCredential = useCallback((institution, credentialData) => {
    const newDoc = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
      ...credentialData,
      ownerInstitution: institution,
      issuer: institution,
      issuedAt: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: 'verified',
    };

    setDocuments(prev => [newDoc, ...prev]);
    logAudit('CREDENTIAL_ISSUED', institution, { 
      documentId: newDoc.id, 
      recipient: newDoc.owner 
    });

    return newDoc;
  }, [logAudit]);

  // ===== SEARCH & ANALYTICS =====

  const searchDocuments = useCallback((query, filters = {}) => {
    let filtered = [...documents];

    // Text search
    if (query && query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(doc =>
        (doc.name || '').toLowerCase().includes(q) ||
        (doc.ownerName || '').toLowerCase().includes(q) ||
        (doc.sector || '').toLowerCase().includes(q) ||
        (doc.skillsAcquired || []).some(skill => skill.toLowerCase().includes(q))
      );
    }

    // Apply filters
    if (filters.nsqfLevelMin) {
      filtered = filtered.filter(doc => (doc.nsqfLevel || 0) >= filters.nsqfLevelMin);
    }
    if (filters.nsqfLevelMax) {
      filtered = filtered.filter(doc => (doc.nsqfLevel || 0) <= filters.nsqfLevelMax);
    }
    if (filters.sectors && filters.sectors.length > 0) {
      filtered = filtered.filter(doc => filters.sectors.includes(doc.sector));
    }
    if (filters.creditsMin) {
      filtered = filtered.filter(doc => (doc.credits || 0) >= filters.creditsMin);
    }
    if (filters.status) {
      filtered = filtered.filter(doc => doc.status === filters.status);
    }

    return filtered;
  }, [documents]);

  const getAnalytics = useCallback(() => {
    return {
      totalDocuments: documents.length,
      verifiedDocuments: documents.filter(d => d.status === 'verified').length,
      pendingDocuments: documents.filter(d => d.status === 'pending').length,
      rejectedDocuments: documents.filter(d => d.status === 'rejected').length,
      totalCredits: documents.reduce((sum, doc) => sum + (doc.credits || 0), 0),
      totalVerifications: verifications.length,
      documentsBySector: documents.reduce((acc, doc) => {
        const sector = doc.sector || 'others';
        acc[sector] = (acc[sector] || 0) + 1;
        return acc;
      }, {}),
      documentsByNSQFLevel: documents.reduce((acc, doc) => {
        const level = doc.nsqfLevel || 0;
        if (level > 0) {
          acc[`Level ${level}`] = (acc[`Level ${level}`] || 0) + 1;
        }
        return acc;
      }, {}),
      recentActivity: auditLogs.slice(0, 20),
    };
  }, [documents, verifications, auditLogs]);

  const getAuditLogs = useCallback((filters = {}) => {
    let filtered = [...auditLogs];

    if (filters.userId) {
      filtered = filtered.filter(log => log.userId === filters.userId);
    }
    if (filters.action) {
      filtered = filtered.filter(log => log.action === filters.action);
    }

    const limit = parseInt(filters.limit || 100);
    return filtered.slice(0, limit);
  }, [auditLogs]);

  const value = {
    documents,
    verifications,
    auditLogs,
    loading,
    // Document operations
    getDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    // Verification operations
    verifyDocument,
    getDocumentVerifications,
    getAllVerifications,
    // Learner profile
    getLearnerProfile,
    // Institution operations
    getInstitutionDocuments,
    issueCredential,
    // Search & analytics
    searchDocuments,
    getAnalytics,
    getAuditLogs,
  };

  return (
    <DocumentContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
          <div className="text-gray-600 dark:text-gray-300 text-sm animate-pulse">
            Loading documents...
          </div>
        </div>
      ) : (
        children
      )}
    </DocumentContext.Provider>
  );
};

/**
 * useDocuments Hook
 * -------------------------
 * Access document operations across the app
 */
export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within DocumentProvider');
  }
  return context;
};
