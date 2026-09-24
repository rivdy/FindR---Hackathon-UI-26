import React, { useState } from 'react';
import { ContextSignal } from './ModuleHero';
import { FormulaCandidate, FormulaReplacementSolution } from '../types';
import { MOCK_CANDIDATES } from '../data/mockData';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  RefreshCw,
  GitFork,
  Activity,
  TrendingUp,
  BarChart2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CandidateComparisonProps {
  onSelectForTrial: (candidate: FormulaCandidate) => void;
  onNavigateToRca?: () => void;
}

export const CandidateComparison: React.FC<CandidateComparisonProps> = ({
  onSelectForTrial,
  onNavigateToRca
}) => {
  const candidates = MOCK_CANDIDATES;
  const [activeSolutionCandidate, setActiveSolutionCandidate] = useState<FormulaCandidate | null>(null);

  const handleLaunchTrial = (c: FormulaCandidate) => {
    onSelectForTrial(c);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="glass-panel module-header" style={{
        padding: '18px 22px',
        borderLeft: '4px solid var(--emerald-neon)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }} data-mobile-wrap="true">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} data-mobile-wrap="true">
            <Sparkles size={20} color="var(--emerald-neon)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
              5 Prediksi Formulasi Tertinggi & Metrik Evaluasi Model
            </h3>
            <span className="badge-pill badge-emerald">5 Candidates Ranked</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Evaluasi model: Akurasi & Presisi (≥90% Baik, &lt;90% Jelek), Koefisien Korelasi (≥0.90 Baik, &lt;0.90 Jelek). Penegakan otomatis BPOM & Sertifikasi Halal.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', fontSize: '0.74rem' }} data-mobile-wrap="true">
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--emerald-neon)' }}>
            <CheckCircle2 size={13} /> BPOM / Halal Lolos
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--rose-danger)' }}>
            <XCircle size={13} /> Pelanggaran Regulasi
          </span>
        </div>
      </div>

      <ContextSignal kind="regulation" />
      {/* 5 Cards Horizontal Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }} data-mobile-grid="true">
        {candidates.map((cand, index) => {
          const isRankOne = index === 0;
          const isBpomViolated = !cand.bpom_compliant;
          const isHalalViolated = !cand.halal_compliant;
          const hasViolation = isBpomViolated || isHalalViolated;

          return (
            <div
              key={cand.id}
              className={`glass-panel candidate-card ${isRankOne ? 'glass-panel-elevated' : ''}`}
              style={{
                padding: '22px',
                animationDelay: `${index * 65}ms`,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                background: '#ffffff',
                border: isRankOne
                  ? '2px solid #0284c7'
                  : hasViolation
                  ? '1px solid #fecdd3'
                  : '1px solid #e2e8f0',
                position: 'relative',
                boxShadow: isRankOne ? '0 8px 24px -4px rgba(2, 132, 199, 0.12)' : 'var(--shadow-card)'
              }}
            >
              {/* Badge Rank */}
              {isRankOne && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: 'linear-gradient(135deg, #002b5c 0%, #0284c7 100%)',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '3px 12px',
                  borderRadius: '9999px',
                  boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)'
                }}>
                  PREDIKSI #1 REKOMENDASI TERTINGGI
                </div>
              )}

              {/* Title & Statuses */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} data-mobile-wrap="true">
                  <span className="badge-pill badge-neutral font-mono-calc" style={{ background: '#f1f5f9', color: '#002b5c', fontWeight: 700 }}>{cand.code}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Rank #{index + 1}</span>
                </div>

                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  marginTop: '8px',
                  color: isBpomViolated ? 'var(--rose-danger)' : '#002b5c',
                  textDecoration: isBpomViolated ? 'line-through' : 'none'
                }}>
                  {cand.name}
                </h4>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                  {cand.tagline}
                </p>
              </div>

              {/* Status BPOM & Status Halal Banners */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                fontSize: '0.75rem'
              }} data-mobile-grid="true">
                {/* BPOM Check */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }} className={cand.bpom_compliant ? 'badge-pill badge-clear' : 'badge-pill badge-violation'} data-mobile-wrap="true">
                  {cand.bpom_compliant ? (
                    <>
                      <CheckCircle2 size={14} />
                      <span style={{ fontWeight: 600 }}>BPOM Sesuai</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={14} />
                      <span style={{ fontWeight: 600 }}>BPOM Tidak Lolos</span>
                    </>
                  )}
                </div>

                {/* Halal Check */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }} className={cand.halal_compliant ? 'badge-pill badge-clear' : 'badge-pill badge-violation'} data-mobile-wrap="true">
                  {cand.halal_compliant ? (
                    <>
                      <CheckCircle2 size={14} />
                      <span style={{ fontWeight: 600 }}>Halal Aman</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={14} />
                      <span style={{ fontWeight: 600 }}>Halal Tidak Lolos</span>
                    </>
                  )}
                </div>
              </div>

              {/* BPOM Violation Alert Notice */}
              {cand.bpom_violation_detail && (
                <div style={{
                  padding: '8px 10px',
                  background: 'rgba(244, 63, 94, 0.1)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  color: 'var(--rose-danger)',
                  lineHeight: 1.35
                }}>
                  <strong>Pelanggaran BPOM:</strong> {cand.bpom_violation_detail}
                </div>
              )}

              {/* Halal Violation Alert Notice */}
              {cand.halal_violation_detail && (
                <div style={{
                  padding: '8px 10px',
                  background: 'rgba(245, 158, 11, 0.1)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  color: 'var(--amber-warning)',
                  lineHeight: 1.35
                }}>
                  <strong>Pelanggaran Halal:</strong> {cand.halal_violation_detail}
                </div>
              )}

              {/* Model Performance Metrics with Graphical Progress Bars & Labels */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '14px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Performa Prediksi Model
                </div>

                {/* Accuracy */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }} data-mobile-wrap="true">
                    <span style={{ color: 'var(--text-secondary)' }}>Akurasi (≥90% Bagus):</span>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} data-mobile-wrap="true">
                      <span className="font-mono-calc" style={{ fontWeight: 700, color: '#002b5c' }}>
                        {cand.metrics.accuracy_pct}%
                      </span>
                      <span className={`badge-pill ${cand.metrics.accuracy_label === 'BAIK' ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                        {cand.metrics.accuracy_label}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${cand.metrics.accuracy_pct}%`,
                      height: '100%',
                      background: cand.metrics.accuracy_label === 'BAIK' ? 'var(--emerald-neon)' : 'var(--rose-danger)'
                    }} />
                  </div>
                </div>

                {/* Precision */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }} data-mobile-wrap="true">
                    <span style={{ color: 'var(--text-secondary)' }}>Presisi (≥90% Bagus):</span>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} data-mobile-wrap="true">
                      <span className="font-mono-calc" style={{ fontWeight: 700, color: '#002b5c' }}>
                        {cand.metrics.precision_pct}%
                      </span>
                      <span className={`badge-pill ${cand.metrics.precision_label === 'BAIK' ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                        {cand.metrics.precision_label}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${cand.metrics.precision_pct}%`,
                      height: '100%',
                      background: cand.metrics.precision_label === 'BAIK' ? 'var(--emerald-neon)' : 'var(--rose-danger)'
                    }} />
                  </div>
                </div>

                {/* Correlation */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }} data-mobile-wrap="true">
                    <span style={{ color: 'var(--text-secondary)' }}>Korelasi ($r$, ≥0.90 Bagus):</span>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} data-mobile-wrap="true">
                      <span className="font-mono-calc" style={{ fontWeight: 700, color: '#002b5c' }}>
                        {cand.metrics.correlation_r}
                      </span>
                      <span className={`badge-pill ${cand.metrics.correlation_label === 'BAIK' ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                        {cand.metrics.correlation_label}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${cand.metrics.correlation_r * 100}%`,
                      height: '100%',
                      background: cand.metrics.correlation_label === 'BAIK' ? 'var(--cyan-neon)' : 'var(--rose-danger)'
                    }} />
                  </div>
                </div>
              </div>

              {/* Key Specs */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.76rem',
                borderTop: '1px solid #f1f5f9',
                paddingTop: '10px'
              }} data-mobile-wrap="true">
                <span style={{ color: 'var(--text-muted)' }}>Status Bahan:</span>
                <span className="font-mono-calc" style={{ fontWeight: 700, color: cand.bpom_compliant && cand.halal_compliant ? 'var(--emerald-neon)' : 'var(--rose-danger)' }}>
                  {cand.bpom_compliant && cand.halal_compliant ? 'CoA & BPOM Lolos' : 'Peringatan Regulasi'}
                </span>
              </div>

              {/* Violation Solution Box / Button */}
              {cand.replacement_solution && (
                <div style={{ marginTop: 'auto' }}>
                  <button
                    onClick={() => setActiveSolutionCandidate(activeSolutionCandidate?.id === cand.id ? null : cand)}
                    className="btn-secondary"
                    style={{
                      width: '100%',
                      fontSize: '0.76rem',
                      padding: '6px 10px',
                      color: 'var(--cyan-neon)',
                      borderColor: 'rgba(6, 182, 212, 0.3)'
                    }}
                  >
                    <RefreshCw size={13} />
                    {activeSolutionCandidate?.id === cand.id ? 'Tutup Solusi Formula' : 'Solusi: Lihat Formula Pengganti'}
                  </button>

                  {/* Expanded Replacement Details */}
                  {activeSolutionCandidate?.id === cand.id && (
                    <div style={{
                      marginTop: '8px',
                      padding: '12px',
                      background: 'rgba(6, 182, 212, 0.08)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <div style={{ fontWeight: 700, color: 'var(--cyan-neon)' }}>
                        {cand.replacement_solution.replacement_title}
                      </div>
                      <div style={{ color: 'var(--text-muted)' }}>
                        Bahan Bermasalah: <strong style={{ color: 'var(--rose-danger)' }}>{cand.replacement_solution.culprit_ingredient}</strong>
                      </div>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        <strong>Substitusi Rekomendasi AI:</strong>
                        <ul style={{ paddingLeft: '16px', marginTop: '4px' }}>
                          {cand.replacement_solution.replacements.map((r, i) => (
                            <li key={i}>{r.inci_name} ({r.percentage}%) - {r.function}</li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ color: 'var(--emerald-neon)', marginTop: '2px' }}>
                         {cand.replacement_solution.regulatory_gain}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons: If Violated -> Trigger RCA & CAPA! Otherwise -> Launch Trial */}
              <div style={{ marginTop: 'auto', paddingTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {hasViolation ? (
                  <button
                    onClick={onNavigateToRca}
                    className="btn-primary"
                    style={{
                      width: '100%',
                      fontSize: '0.8rem',
                      background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
                      boxShadow: '0 0 15px rgba(244, 63, 94, 0.3)'
                    }}
                  >
                    <GitFork size={14} /> AI Rekomendasi: Investigasi RCA & CAPA
                  </button>
                ) : (
                  <button
                    onClick={() => handleLaunchTrial(cand)}
                    className={isRankOne ? 'btn-primary' : 'btn-secondary'}
                    style={{ width: '100%', fontSize: '0.82rem' }}
                  >
                    Eksekusi ke Batch Trial <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
