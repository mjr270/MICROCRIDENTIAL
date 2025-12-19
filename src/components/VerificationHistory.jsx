import React, { useState, useEffect } from 'react';

export default function VerificationHistory({ documentId, verifications }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!verifications || verifications.length === 0) {
    return (
      <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '6px', textAlign: 'center', color: '#6b7280' }}>
        No verification history available
      </div>
    );
  }

  const sortedVerifications = [...verifications].sort((a, b) => 
    new Date(b.timestamp || b.verifiedAt || 0) - new Date(a.timestamp || a.verifiedAt || 0)
  );

  const getStatusColor = (status) => {
    const colors = {
      verified: { bg: '#d1fae5', text: '#065f46', border: '#10b981' },
      pending: { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' },
      rejected: { bg: '#fee2e2', text: '#991b1b', border: '#ef4444' }
    };
    return colors[status] || { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
  };

  const getStatusIcon = (status) => {
    const icons = {
      verified: '✅',
      pending: '⏳',
      rejected: '❌'
    };
    return icons[status] || '📄';
  };

  return (
    <div style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
        📜 Verification History
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sortedVerifications.map((verification, index) => {
          const colors = getStatusColor(verification.status);
          const isExpanded = expandedId === verification.id;
          const timestamp = new Date(verification.timestamp || verification.verifiedAt || Date.now());
          
          return (
            <div 
              key={verification.id || index}
              style={{ 
                padding: '1rem', 
                background: colors.bg,
                borderRadius: '6px',
                border: `2px solid ${colors.border}`,
                cursor: verification.verificationNotes ? 'pointer' : 'default'
              }}
              onClick={() => verification.verificationNotes && setExpandedId(isExpanded ? null : verification.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{getStatusIcon(verification.status)}</span>
                    <span style={{ fontWeight: '600', color: colors.text, fontSize: '1rem' }}>
                      {verification.status?.charAt(0).toUpperCase() + verification.status?.slice(1) || 'Unknown'}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>Verified by:</strong> {verification.verifiedBy || 'Unknown'}
                  </div>
                  
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                    {timestamp.toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>

                  {verification.verificationNotes && isExpanded && (
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '0.75rem', 
                      background: '#ffffff', 
                      borderRadius: '4px',
                      border: '1px solid ' + colors.border
                    }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        Notes:
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.5' }}>
                        {verification.verificationNotes}
                      </div>
                    </div>
                  )}
                </div>

                {verification.verificationNotes && (
                  <button 
                    style={{ 
                      padding: '0.25rem 0.5rem', 
                      background: 'transparent', 
                      border: 'none',
                      color: colors.text,
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    {isExpanded ? '▲' : '▼'}
                  </button>
                )}
              </div>

              {/* Verification Chain Indicator */}
              {index < sortedVerifications.length - 1 && (
                <div style={{ 
                  height: '20px', 
                  width: '2px', 
                  background: '#d1d5db', 
                  margin: '0.5rem 0 0 0.625rem' 
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Verification Summary */}
      <div style={{ 
        marginTop: '1.5rem', 
        padding: '1rem', 
        background: '#f3f4f6', 
        borderRadius: '6px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Verifications</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
            {sortedVerifications.length}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Current Status</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '600', color: getStatusColor(sortedVerifications[0]?.status).text }}>
            {sortedVerifications[0]?.status?.toUpperCase() || 'UNKNOWN'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Last Updated</div>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1f2937' }}>
            {new Date(sortedVerifications[0]?.timestamp || sortedVerifications[0]?.verifiedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
