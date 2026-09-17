import React, { useState } from 'react';
import { TrialBatch, ProcessStep } from '../types';
import { MOCK_TRIAL_BATCH } from '../data/mockData';
import {
  ClipboardCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Play,
  RotateCcw,
  Thermometer,
  Activity,
  Clock,
  ShieldAlert
} from 'lucide-react';

interface TrialBatchPageProps {
  onNavigateToRCA: () => void;
}

export const TrialBatchPage: React.FC<TrialBatchPageProps> = ({ onNavigateToRCA }) => {
  const [batch, setBatch] = useState<TrialBatch>(MOCK_TRIAL_BATCH);

  const completedStepsCount = batch.steps.filter(s => s.status === 'COMPLETED').length;
  const deviationStepsCount = batch.steps.filter(s => s.status === 'DEVIATION').length;

  return (
    <div className="module-page" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Batch Header & Summary */}
      <div className="glass-panel" style={{
        padding: '20px',
        borderLeft: '4px solid var(--amber-warning)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px'
      }} data-mobile-wrap="true">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} data-mobile-wrap="true">
            <ClipboardCheck size={20} color="var(--amber-warning)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Batch Execution SOP: {batch.batch_number}
            </h2>
            <span className="badge-pill badge-amber">
              <AlertTriangle size={12} /> Deviation Flagged
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Formula: <strong>{batch.candidate_name}</strong> | Operator: <strong>{batch.operator_name}</strong> | Batch Size: <strong>{batch.target_mass_kg} kg</strong>
          </p>
        </div>

        {/* Action button to RCA */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} data-mobile-wrap="true">
          <button
            onClick={onNavigateToRCA}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)',
              fontSize: '0.85rem'
            }}
          >
            Investigasi di 6M Fishbone RCA <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Deviation Notification Callout */}
      {batch.deviation_reason && (
        <div style={{
          padding: '16px 20px',
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }} data-mobile-wrap="true">
          <ShieldAlert size={22} color="var(--rose-danger)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--rose-danger)' }}>
              QA Physical Stability Failure: Phase Separation Terdeteksi!
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
              {batch.deviation_reason}
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              marginTop: '8px',
              fontSize: '0.78rem',
              color: 'var(--text-muted)'
            }} data-mobile-wrap="true">
              <span>Measured Viscosity: <strong className="font-mono-calc" style={{ color: 'var(--rose-danger)' }}>{batch.measured_viscosity_cps?.toLocaleString()} cPs</strong> (Target: min 18,000 cPs)</span>
              <span>Measured pH: <strong className="font-mono-calc" style={{ color: '#fff' }}>{batch.measured_ph}</strong> (Pass)</span>
            </div>
          </div>
        </div>
      )}

      {/* Step-by-Step SOP Execution Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          Parameter Target vs Aktual Tiap Langkah SOP
        </h3>

        {batch.steps.map((step) => {
          const isDeviation = step.status === 'DEVIATION';
          return (
            <div
              key={step.id}
              className="glass-panel"
              style={{
                padding: '16px 20px',
                borderLeft: isDeviation ? '4px solid var(--rose-danger)' : '4px solid var(--emerald-neon)',
                background: isDeviation ? 'rgba(244, 63, 94, 0.04)' : 'var(--bg-glass)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }} data-mobile-wrap="true">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} data-mobile-wrap="true">
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: isDeviation ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: isDeviation ? 'var(--rose-danger)' : 'var(--emerald-neon)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    {step.order}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>
                      {step.name}
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Alat: {step.equipment} | {step.phase}
                    </span>
                  </div>
                </div>

                <div>
                  {isDeviation ? (
                    <span className="badge-pill badge-rose">
                      <AlertTriangle size={11} /> Step Deviation
                    </span>
                  ) : (
                    <span className="badge-pill badge-emerald">
                      <CheckCircle2 size={11} /> Tervalidasi Lab
                    </span>
                  )}
                </div>
              </div>

              {/* Target vs Actual Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                background: 'rgba(0,0,0,0.2)',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '0.78rem'
              }} data-mobile-grid="true">
                {/* Temperature */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }} data-mobile-wrap="true">
                    <Thermometer size={14} /> Suhu (°C)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }} data-mobile-wrap="true">
                    <span className="font-mono-calc" style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: step.actual_temp_c !== step.target_temp_c ? 'var(--amber-warning)' : '#fff'
                    }}>
                      {step.actual_temp_c}°C
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                      (Target: {step.target_temp_c}°C)
                    </span>
                  </div>
                </div>

                {/* Agitator / Homogenizer RPM */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }} data-mobile-wrap="true">
                    <Activity size={14} /> Kecepatan Pengadukan (RPM)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }} data-mobile-wrap="true">
                    <span className="font-mono-calc" style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: step.actual_rpm !== step.target_rpm ? 'var(--rose-danger)' : '#fff'
                    }}>
                      {step.actual_rpm?.toLocaleString()} RPM
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                      (Target: {step.target_rpm.toLocaleString()} RPM)
                    </span>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }} data-mobile-wrap="true">
                    <Clock size={14} /> Durasi Waktu
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }} data-mobile-wrap="true">
                    <span className="font-mono-calc" style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: step.actual_duration_min !== step.target_duration_min ? 'var(--amber-warning)' : '#fff'
                    }}>
                      {step.actual_duration_min} Menit
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                      (Target: {step.target_duration_min} Menit)
                    </span>
                  </div>
                </div>
              </div>

              {/* Endpoint or Deviation Note */}
              <div style={{ marginTop: '10px', fontSize: '0.76rem', color: isDeviation ? 'var(--rose-danger)' : 'var(--text-secondary)' }}>
                {isDeviation ? (
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }} data-mobile-wrap="true">
                    <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
                    <span><strong>Catatan Deviasi:</strong> {step.operator_notes}</span>
                  </div>
                ) : (
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Kriteria Endpoint:</strong> {step.endpoint_criteria}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
