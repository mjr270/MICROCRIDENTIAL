import React, { useState } from 'react';
import { exportCredential, generateBadgeFile, createShareableURL } from '../utils/credentials';

export default function CredentialExporter({ document }) {
  const [format, setFormat] = useState('openbadge3');
  const [toast, setToast] = useState(null);

  if (!document) {
    return null;
  }

  const formats = [
    { id: 'openbadge3', name: 'Open Badge 3.0', description: 'Latest Open Badges standard' },
    { id: 'openbadge2', name: 'Open Badge 2.0', description: 'Legacy Open Badges format' },
    { id: 'w3c', name: 'W3C Verifiable Credential', description: 'W3C standard format' },
    { id: 'json', name: 'JSON', description: 'Raw JSON data' }
  ];

  const handleExport = () => {
    try {
      const credential = exportCredential(document, format);
      const dataStr = JSON.stringify(credential, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `credential-${document.id}-${format}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setToast({ type: 'success', message: `Exported as ${format}` });
      setTimeout(() => setToast(null), 2000);
    } catch (error) {
      setToast({ type: 'error', message: 'Export failed' });
      setTimeout(() => setToast(null), 2000);
    }
  };

  const handleCopyJSON = () => {
    try {
      const credential = exportCredential(document, format);
      navigator.clipboard.writeText(JSON.stringify(credential, null, 2));
      setToast({ type: 'success', message: 'Copied to clipboard' });
      setTimeout(() => setToast(null), 2000);
    } catch (error) {
      setToast({ type: 'error', message: 'Copy failed' });
      setTimeout(() => setToast(null), 2000);
    }
  };

  const handleShare = () => {
    const shareUrl = createShareableURL(document);
    navigator.clipboard.writeText(shareUrl);
    setToast({ type: 'success', message: 'Share link copied' });
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
        📤 Export Credential
      </h3>

      {/* Format Selector */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.75rem', color: '#374151' }}>
          Select Export Format
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {formats.map(f => (
            <div
              key={f.id}
              onClick={() => setFormat(f.id)}
              style={{
                padding: '1rem',
                border: `2px solid ${format === f.id ? '#3b82f6' : '#e5e7eb'}`,
                borderRadius: '6px',
                cursor: 'pointer',
                background: format === f.id ? '#eff6ff' : '#ffffff',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                {f.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                {f.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#374151' }}>
          Preview
        </label>
        <div style={{ 
          padding: '1rem', 
          background: '#f9fafb', 
          borderRadius: '6px', 
          border: '1px solid #e5e7eb',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <pre style={{ 
            fontSize: '0.75rem', 
            color: '#4b5563',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            margin: 0,
            fontFamily: 'monospace'
          }}>
            {JSON.stringify(exportCredential(document, format), null, 2)}
          </pre>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={handleExport}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          💾 Download File
        </button>
        <button
          onClick={handleCopyJSON}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          📋 Copy JSON
        </button>
        <button
          onClick={handleShare}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#8b5cf6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          🔗 Copy Share Link
        </button>
      </div>

      {/* Standards Info */}
      <div style={{ 
        marginTop: '1.5rem', 
        padding: '1rem', 
        background: '#eff6ff', 
        borderRadius: '6px',
        border: '1px solid #3b82f6'
      }}>
        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>
          📜 Credential Standards
        </div>
        <div style={{ fontSize: '0.75rem', color: '#1e40af', lineHeight: '1.6' }}>
          This credential is exportable in multiple standard formats:
          <ul style={{ margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
            <li><strong>Open Badges:</strong> Globally recognized micro-credential standard</li>
            <li><strong>W3C Verifiable Credentials:</strong> Cryptographically secure standard</li>
            <li><strong>NSQF Aligned:</strong> Integrated with National Skills Framework</li>
          </ul>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '2rem',
            right: '2rem',
            padding: '1rem 1.5rem',
            background: toast.type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            borderRadius: '6px',
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
