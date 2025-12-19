import React, { useState, useEffect } from 'react';

export default function AuditLogViewer({ logs, maxDisplay = 50 }) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  if (!logs || logs.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
        No audit logs available
      </div>
    );
  }

  const actionTypes = [
    'all',
    'DOCUMENT_CREATED',
    'DOCUMENT_UPDATED',
    'DOCUMENT_DELETED',
    'DOCUMENT_VERIFIED',
    'CREDENTIAL_ISSUED',
    'USER_LOGIN',
    'USER_LOGOUT'
  ];

  const getActionIcon = (action) => {
    const icons = {
      DOCUMENT_CREATED: '📄',
      DOCUMENT_UPDATED: '✏️',
      DOCUMENT_DELETED: '🗑️',
      DOCUMENT_VERIFIED: '✅',
      CREDENTIAL_ISSUED: '🎓',
      USER_LOGIN: '🔓',
      USER_LOGOUT: '🔒'
    };
    return icons[action] || '📋';
  };

  const getActionColor = (action) => {
    const colors = {
      DOCUMENT_CREATED: '#10b981',
      DOCUMENT_UPDATED: '#3b82f6',
      DOCUMENT_DELETED: '#ef4444',
      DOCUMENT_VERIFIED: '#8b5cf6',
      CREDENTIAL_ISSUED: '#f59e0b',
      USER_LOGIN: '#6b7280',
      USER_LOGOUT: '#6b7280'
    };
    return colors[action] || '#6b7280';
  };

  // Filter and search logs
  const filteredLogs = logs
    .filter(log => filter === 'all' || log.action === filter)
    .filter(log => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        log.userId?.toLowerCase().includes(query) ||
        log.action?.toLowerCase().includes(query) ||
        JSON.stringify(log.details || {}).toLowerCase().includes(query)
      );
    })
    .slice(0, maxDisplay);

  return (
    <div style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#111827' }}>
        📊 Audit Log
      </h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
            Filter by Action
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          >
            {actionTypes.map(action => (
              <option key={action} value={action}>
                {action === 'all' ? 'All Actions' : action.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: '2', minWidth: '300px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
            Search
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by user, action, or details..."
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '6px',
              fontSize: '0.875rem'
            }}
          />
        </div>
      </div>

      {/* Log Entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '600px', overflowY: 'auto' }}>
        {filteredLogs.map((log, index) => {
          const isExpanded = expandedId === log.id;
          const timestamp = new Date(log.timestamp || Date.now());
          const actionColor = getActionColor(log.action);

          return (
            <div
              key={log.id || index}
              style={{
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                cursor: log.details ? 'pointer' : 'default'
              }}
              onClick={() => log.details && setExpandedId(isExpanded ? null : log.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{getActionIcon(log.action)}</span>
                    <span 
                      style={{ 
                        fontWeight: '600', 
                        fontSize: '0.95rem',
                        color: actionColor
                      }}
                    >
                      {log.action?.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                    <strong>User:</strong> {log.userId || 'System'}
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                    {timestamp.toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && log.details && (
                    <div style={{ 
                      marginTop: '1rem', 
                      padding: '0.75rem', 
                      background: '#ffffff', 
                      borderRadius: '4px',
                      border: '1px solid #d1d5db'
                    }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        Details:
                      </div>
                      <pre style={{ 
                        fontSize: '0.75rem', 
                        color: '#4b5563', 
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        margin: 0,
                        fontFamily: 'monospace'
                      }}>
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>

                {log.details && (
                  <button 
                    style={{ 
                      padding: '0.25rem 0.5rem', 
                      background: 'transparent', 
                      border: 'none',
                      color: '#6b7280',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    {isExpanded ? '▲' : '▼'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Statistics */}
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
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Total Logs</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
            {logs.length}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Filtered Results</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
            {filteredLogs.length}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Latest Activity</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1f2937' }}>
            {logs[0] ? new Date(logs[0].timestamp).toLocaleTimeString() : 'N/A'}
          </div>
        </div>
      </div>

      {filteredLogs.length === 0 && (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
          No logs match your search criteria
        </div>
      )}
    </div>
  );
}
