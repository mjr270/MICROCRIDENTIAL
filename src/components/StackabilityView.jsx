import React from 'react';
import { calculateStackability, LEARNING_PATHWAYS } from '../data/stackability';
import { SECTORS } from '../data/nsqf';

export default function StackabilityView({ credentials }) {
  if (!credentials || credentials.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
        No credentials to analyze stackability
      </div>
    );
  }

  const stackability = calculateStackability(credentials);

  return (
    <div style={{ padding: '1.5rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#111827' }}>
        🔗 Credential Stackability & Learning Pathways
      </h2>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Stackable Credits</div>
          <div style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>{stackability.stackableCredits}</div>
        </div>
        <div style={{ padding: '1rem', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Active Pathways</div>
          <div style={{ fontSize: '2rem', fontWeight: '700', marginTop: '0.5rem' }}>{stackability.pathwayProgress.length}</div>
        </div>
      </div>

      {/* Learning Pathways Progress */}
      {stackability.pathwayProgress.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            Your Learning Pathways
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {stackability.pathwayProgress.map(pathway => {
              const sectorInfo = SECTORS.find(s => s.id === pathway.sector);
              return (
                <div 
                  key={pathway.pathwayId}
                  style={{ 
                    padding: '1.5rem', 
                    background: pathway.isComplete ? '#d1fae5' : '#f9fafb', 
                    borderRadius: '8px',
                    border: `2px solid ${pathway.isComplete ? '#10b981' : '#e5e7eb'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                        {pathway.pathwayName}
                        {pathway.isComplete && ' ✅'}
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {sectorInfo?.name || pathway.sector} • {pathway.completedStages.length} of {pathway.totalStages} stages completed
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937' }}>
                        {pathway.progress}%
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {pathway.earnedCredits}/{pathway.totalCredits} credits
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{ width: '100%', height: '12px', background: '#e5e7eb', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem' }}>
                    <div 
                      style={{ 
                        width: `${pathway.progress}%`, 
                        height: '100%', 
                        background: pathway.isComplete ? '#10b981' : 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>

                  {/* Next Stage */}
                  {pathway.nextStage && !pathway.isComplete && (
                    <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '6px', border: '1px solid #d1d5db' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                        Next Stage: {pathway.nextStage.name} (NSQF Level {pathway.nextStage.level})
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                        Credits: {pathway.nextStage.credits}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {pathway.nextStage.skills.map(skill => (
                          <span 
                            key={skill}
                            style={{ 
                              padding: '0.25rem 0.75rem', 
                              background: '#dbeafe', 
                              color: '#1e40af', 
                              borderRadius: '9999px',
                              fontSize: '0.75rem'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {pathway.isComplete && (
                    <div style={{ padding: '0.75rem', background: '#d1fae5', borderRadius: '6px', border: '1px solid #10b981' }}>
                      <span style={{ color: '#065f46', fontWeight: '600', fontSize: '0.875rem' }}>
                        🎉 Pathway Complete! You've earned all {pathway.totalCredits} credits.
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {stackability.recommendations.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            📌 Recommendations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {stackability.recommendations.map((rec, index) => {
              const bgColors = {
                high: '#fee2e2',
                medium: '#fef3c7',
                low: '#dbeafe'
              };
              const textColors = {
                high: '#991b1b',
                medium: '#92400e',
                low: '#1e40af'
              };
              const icons = {
                continue_pathway: '🎯',
                explore_pathway: '🗺️',
                credit_transfer: '🔄'
              };

              return (
                <div 
                  key={index}
                  style={{ 
                    padding: '1rem', 
                    background: bgColors[rec.priority] || '#f3f4f6',
                    borderRadius: '6px',
                    border: `1px solid ${textColors[rec.priority] || '#d1d5db'}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{icons[rec.type] || '💡'}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: textColors[rec.priority] || '#374151', marginBottom: '0.25rem' }}>
                        {rec.message}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                        {rec.action}
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#9ca3af' }}>
                        <span>Credits: {rec.credits}</span>
                        <span>Sector: {SECTORS.find(s => s.id === rec.sector)?.name || rec.sector}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Pathways */}
      {stackability.pathwayProgress.length === 0 && (
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
            🗺️ Available Learning Pathways
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {LEARNING_PATHWAYS.map(pathway => {
              const sectorInfo = SECTORS.find(s => s.id === pathway.sector);
              return (
                <div 
                  key={pathway.id}
                  style={{ 
                    padding: '1rem', 
                    background: '#f9fafb', 
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                    {pathway.name}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                    {pathway.description}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div>🎯 Target Level: {pathway.targetNSQFLevel}</div>
                    <div>💰 Total Credits: {pathway.totalCredits}</div>
                    <div>📚 Stages: {pathway.stages.length}</div>
                    <div>🏢 {sectorInfo?.name || pathway.sector}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
