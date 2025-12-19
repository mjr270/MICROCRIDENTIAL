import React from 'react';
import { NSQF_LEVELS, SECTORS, QUALIFICATION_TYPES } from '../data/nsqf';

export default function NSQFProfile({ documents }) {
  if (!documents || documents.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
        No credentials to display NSQF profile
      </div>
    );
  }

  // Aggregate data
  const totalCredits = documents.reduce((sum, doc) => sum + (doc.credits || 0), 0);
  const highestLevel = documents.reduce((max, doc) => Math.max(max, doc.nsqfLevel || 0), 0);
  const verifiedDocs = documents.filter(d => d.status === 'verified');
  
  // Group by sector
  const bySector = documents.reduce((acc, doc) => {
    const sector = doc.sector || 'others';
    if (!acc[sector]) acc[sector] = [];
    acc[sector].push(doc);
    return acc;
  }, {});

  // Group by NSQF level
  const byLevel = documents.reduce((acc, doc) => {
    const level = doc.nsqfLevel || 0;
    if (level > 0) {
      if (!acc[level]) acc[level] = [];
      acc[level].push(doc);
    }
    return acc;
  }, {});

  // Extract all skills
  const allSkills = new Set();
  documents.forEach(doc => {
    if (doc.skillsAcquired && Array.isArray(doc.skillsAcquired)) {
      doc.skillsAcquired.forEach(skill => allSkills.add(skill));
    }
  });

  const currentLevelInfo = NSQF_LEVELS.find(l => l.level === highestLevel);

  return (
    <div style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#111827' }}>
        📊 NSQF Learner Profile
      </h2>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Credits</div>
          <div style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>{totalCredits}</div>
        </div>
        <div style={{ padding: '1rem', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Highest NSQF Level</div>
          <div style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>Level {highestLevel}</div>
        </div>
        <div style={{ padding: '1rem', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Verified Credentials</div>
          <div style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>{verifiedDocs.length}</div>
        </div>
        <div style={{ padding: '1rem', background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', color: 'white', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Credentials</div>
          <div style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>{documents.length}</div>
        </div>
      </div>

      {/* Current Level Details */}
      {currentLevelInfo && (
        <div style={{ padding: '1.5rem', background: '#f9fafb', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Current Achievement: {currentLevelInfo.name}
          </h3>
          <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
            <strong>Description:</strong> {currentLevelInfo.description}
          </p>
          <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
            <strong>Professional Knowledge:</strong> {currentLevelInfo.professionalKnowledge}
          </p>
          <p style={{ color: '#4b5563' }}>
            <strong>Responsibility:</strong> {currentLevelInfo.responsibility}
          </p>
        </div>
      )}

      {/* Credentials by NSQF Level */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
          Credentials by NSQF Level
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {Object.keys(byLevel).sort((a, b) => Number(b) - Number(a)).map(level => {
            const levelDocs = byLevel[level];
            const levelInfo = NSQF_LEVELS.find(l => l.level === Number(level));
            return (
              <div key={level} style={{ padding: '1rem', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#1f2937' }}>Level {level}: {levelInfo?.name || 'Unknown'}</strong>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{levelDocs.length} credential(s)</span>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {levelDocs.map(doc => doc.name).join(', ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Credentials by Sector */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
          Credentials by Sector
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {Object.keys(bySector).map(sectorId => {
            const sectorDocs = bySector[sectorId];
            const sectorInfo = SECTORS.find(s => s.id === sectorId);
            return (
              <div key={sectorId} style={{ padding: '1rem', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '6px' }}>
                <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                  {sectorInfo?.name || sectorId}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {sectorDocs.length} credential(s)
                </div>
                {sectorInfo && (
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                    {sectorInfo.ssc}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills Acquired */}
      {allSkills.size > 0 && (
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Skills Acquired
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {Array.from(allSkills).map(skill => (
              <span 
                key={skill}
                style={{ 
                  padding: '0.5rem 1rem', 
                  background: '#dbeafe', 
                  color: '#1e40af', 
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Pathway Recommendation */}
      {highestLevel > 0 && highestLevel < 10 && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#92400e' }}>
            📈 Next Steps in Your Learning Pathway
          </h3>
          <p style={{ color: '#78350f', marginBottom: '1rem' }}>
            You're currently at NSQF Level {highestLevel}. Consider pursuing Level {highestLevel + 1} credentials to advance your qualifications.
          </p>
          {NSQF_LEVELS.find(l => l.level === highestLevel + 1) && (
            <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '6px', border: '1px solid #f59e0b' }}>
              <strong>Level {highestLevel + 1}: {NSQF_LEVELS.find(l => l.level === highestLevel + 1).name}</strong>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>
                {NSQF_LEVELS.find(l => l.level === highestLevel + 1).description}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
