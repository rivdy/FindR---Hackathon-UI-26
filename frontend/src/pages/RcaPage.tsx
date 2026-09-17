import React, { useState } from 'react';
import { FishboneBranch, FiveWhyItem } from '../types';
import { MOCK_FISHBONE_BRANCHES, MOCK_FIVE_WHYS } from '../data/mockData';
import { 
  GitFork, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  BrainCircuit, 
  ArrowRight, 
  Cpu, 
  GitBranch, 
  FlaskConical, 
  UserCheck, 
  Gauge, 
  CloudRain 
} from 'lucide-react';

interface RcaPageProps {
  onNavigateToCapa: () => void;
}

export const RcaPage: React.FC<RcaPageProps> = ({ onNavigateToCapa }) => {
  const [branches] = useState<FishboneBranch[]>(MOCK_FISHBONE_BRANCHES);
  const [fiveWhys] = useState<FiveWhyItem[]>(MOCK_FIVE_WHYS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Machine');
  const [activeCauseId, setActiveCauseId] = useState<string>('c-m1');

  const selectedBranch = branches.find(b => b.category === selectedCategory);
  const activeCause = selectedBranch?.causes.find(c => c.id === activeCauseId) || selectedBranch?.causes[0];

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Machine': return <Cpu size={18} />;
      case 'Method': return <GitBranch size={18} />;
      case 'Material': return <FlaskConical size={18} />;
      case 'Man': return <UserCheck size={18} />;
      case 'Measurement': return <Gauge size={18} />;
      case 'Environment': return <CloudRain size={18} />;
      default: return <GitFork size={18} />;
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header with incident context */}
      <div className="glass-panel" style={{
        padding: '20px',
        borderLeft: '4px solid var(--amber-warning)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GitFork size={20} color="var(--amber-warning)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Evidence-Based Root Cause Analysis (6M Ishikawa & 5-Whys)
            </h2>
            <span className="badge-pill badge-amber">Incident LOT-MOIST-26-04B</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Masalah: <strong>Phase separation antara fase air dan fase minyak setelah penyimpanan uji stabilitas termal (45°C)</strong>.
          </p>
        </div>

        <button
          onClick={onNavigateToCapa}
          className="btn-primary"
          style={{ fontSize: '0.85rem' }}
        >
          Cari Solusi di CAPA Knowledge Base <ArrowRight size={16} />
        </button>
      </div>

      {/* Interactive 6M Fishbone Diagram SVG */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
              Diagram Ishikawa 6M Interaktif
            </h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Klik cabang 6M untuk melihat hipotesis, data sensor alat, dan status verifikasi bukti.
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px', fontSize: '0.72rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--rose-danger)' }}>
              <CheckCircle2 size={12} /> Confirmed Root Cause
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--amber-warning)' }}>
              <HelpCircle size={12} /> Hypothesis
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
              <XCircle size={12} /> Ruled Out
            </span>
          </div>
        </div>

        {/* 6M Category Selector Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {branches.map(branch => {
            const isSelected = selectedCategory === branch.category;
            const hasConfirmed = branch.causes.some(c => c.status === 'CONFIRMED_CAUSE');
            return (
              <button
                key={branch.category}
                onClick={() => {
                  setSelectedCategory(branch.category);
                  setActiveCauseId(branch.causes[0]?.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: isSelected 
                    ? '1px solid #0284c7' 
                    : '1px solid #cbd5e1',
                  background: isSelected 
                    ? '#eff6ff' 
                    : '#ffffff',
                  color: isSelected ? '#0284c7' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all 0.15s ease'
                }}
              >
                {getCategoryIcon(branch.category)}
                <span>{branch.category}</span>
                {hasConfirmed && (
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--rose-danger)'
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Visual Fishbone Spine & Detail Split View */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '20px',
          marginTop: '10px'
        }}>
          {/* Causes List for Selected Branch */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Daftar Faktor Cabang: <strong style={{ color: '#002b5c' }}>{selectedCategory}</strong>
            </div>

            {selectedBranch?.causes.map(cause => {
              const isCauseActive = activeCause?.id === cause.id;
              return (
                <div
                  key={cause.id}
                  onClick={() => setActiveCauseId(cause.id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: isCauseActive 
                      ? '1px solid #0284c7' 
                      : '1px solid #e2e8f0',
                    background: isCauseActive ? '#eff6ff' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: isCauseActive ? '#0284c7' : '#0f172a'
                    }}>
                      {cause.text}
                    </span>
                    {cause.status === 'CONFIRMED_CAUSE' ? (
                      <span className="badge-pill badge-rose" style={{ fontSize: '0.65rem' }}>
                        Confirmed Root Cause
                      </span>
                    ) : cause.status === 'RULED_OUT' ? (
                      <span className="badge-pill badge-neutral" style={{ fontSize: '0.65rem' }}>
                        Ruled Out
                      </span>
                    ) : (
                      <span className="badge-pill badge-amber" style={{ fontSize: '0.65rem' }}>
                        Hypothesis
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                    {cause.detail}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Cause Evidence Panel */}
          {activeCause && (
            <div style={{
              background: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 2px 8px rgba(15,23,42,0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge-pill badge-cyan">Evidence & Investigation Audit</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ID: {activeCause.id}</span>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#002b5c' }}>
                  {activeCause.text}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {activeCause.detail}
                </p>
              </div>

              {/* Evidence log box */}
              <div style={{
                background: '#f8fafc',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                fontSize: '0.78rem'
              }}>
                <div style={{ color: '#059669', fontWeight: 700, marginBottom: '4px' }}>
                  Bukti Terverifikasi (Hard Evidence):
                </div>
                <div style={{ color: '#0f172a', lineHeight: 1.4 }}>
                  {activeCause.evidence || 'Tidak ada bukti sensor terekam untuk hipotesis ini.'}
                </div>
              </div>

              <div style={{
                fontSize: '0.74rem',
                color: 'var(--text-secondary)',
                background: '#f1f5f9',
                padding: '8px 10px',
                borderRadius: '6px'
              }}>
                <strong>Likelihood:</strong> {activeCause.likelihood} | <strong>Verification:</strong> {activeCause.status}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5-Whys Investigation Tree with Cognitive Bias Checks */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: '#002b5c' }}>
              <BrainCircuit size={18} color="var(--cyan-neon)" />
              5-Whys Systematic Investigation & Bias Detection
            </h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Memastikan root cause didasari fakta mekanis riil, sekaligus mencegah bias kognitif formulator (Anchoring & Premature Closure).
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {fiveWhys.map((why) => (
            <div 
              key={why.order}
              style={{
                padding: '14px 16px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: '0 1px 3px rgba(15,23,42,0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--cyan-glow)',
                    color: 'var(--cyan-neon)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800
                  }}>
                    W{why.order}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {why.question}
                  </span>
                </div>
                <span className="badge-pill badge-emerald" style={{ fontSize: '0.65rem' }}>
                  <CheckCircle2 size={10} /> Confirmed Evidence
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '32px' }}>
                <strong>Jawaban:</strong> {why.answer}
              </div>

              {why.cognitive_bias_alert && (
                <div style={{
                  marginLeft: '32px',
                  padding: '6px 10px',
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  color: '#a5b4fc',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <BrainCircuit size={13} color="#a5b4fc" />
                  <span><strong>Cognitive Bias Check:</strong> {why.cognitive_bias_alert}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
