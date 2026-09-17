import React from 'react';
import { Sparkles, ShieldCheck, AlertTriangle, Layers, FileCog, RotateCcw } from 'lucide-react';

interface TopBarProps {
  activeTab: string;
  onOpenQtpp: () => void;
  onResetToNewInput?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  activeTab, 
  onOpenQtpp, 
  onResetToNewInput 
}) => {
  return (
    <header style={{
      height: '64px',
      borderBottom: '1px solid var(--border-subtle)',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 10,
      boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)'
    }}>
      {/* Left: Project title & breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#eff6ff',
          padding: '6px 12px',
          borderRadius: '8px',
          border: '1px solid #bfdbfe'
        }}>
          <Sparkles size={15} color="#0284c7" />
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#002b5c' }}>
            PROJECT: rangkAI HYDRO-MOIST 2026
          </span>
        </div>
        <div style={{ height: '16px', width: '1px', background: 'var(--border-subtle)' }} />
        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          Modul: <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{activeTab.toUpperCase()}</strong>
        </span>
      </div>

      {/* Right: Actions, New Formulation Button, QTPP config, Halal Gate & Demo pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Reset to New Input Wizard Button */}
        {onResetToNewInput && (
          <button
            onClick={onResetToNewInput}
            className="btn-secondary"
            style={{
              fontSize: '0.78rem',
              padding: '6px 12px',
              color: '#065f46',
              borderColor: '#a7f3d0',
              background: '#ecfdf5',
              fontWeight: 600
            }}
            title="Kembali ke formulir input awal untuk mendemonstrasikan proses baru"
          >
            <RotateCcw size={13} /> Formulasi Baru (Input Ulang)
          </button>
        )}

        {/* QTPP & Document Gate Button */}
        <button
          onClick={onOpenQtpp}
          className="btn-secondary"
          style={{
            fontSize: '0.78rem',
            padding: '6px 12px',
            color: '#0369a1',
            borderColor: '#bfdbfe',
            background: '#eff6ff',
            fontWeight: 600
          }}
        >
          <FileCog size={14} /> QTPP & Dokumen
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          borderRadius: '6px'
        }}>
          <ShieldCheck size={14} color="#059669" />
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#065f46' }}>
            HALAL GATE (✓)
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '6px'
        }}>
          <Layers size={14} color="#0284c7" />
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#1e40af' }}>
            BPOM COMPLIANT
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          background: '#fffbeb',
          border: '1px solid #fde68a',
          borderRadius: '6px'
        }}>
          <AlertTriangle size={14} color="#d97706" />
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#92400e' }}>
            DEMO_ONLY R&D
          </span>
        </div>
      </div>
    </header>
  );
};
