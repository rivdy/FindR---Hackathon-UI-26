import React from 'react';
import { ShieldCheck, AlertTriangle, FlaskConical, RotateCcw, FileCog } from 'lucide-react';

interface TopBarProps {
  activeTab: string;
  onOpenQtpp: () => void;
  onResetToNewInput?: () => void;
}

const TAB_CONTEXT: Record<string, { label: string; sub: string }> = {
  formulasi: { label: 'Formulasi', sub: '5 kandidat · akurasi model ≥90%' },
  stabilitas: { label: 'Stabilitas', sub: '8 parameter uji fisik · SOP batch' },
  cpp: { label: 'Proses Kritis', sub: 'CPP · median & simpangan ±3σ · RCA' },
  cma: { label: 'Material Kritis', sub: 'CMA · spesifikasi bahan · CAPA hub' },
};

export const TopBar: React.FC<TopBarProps> = ({ activeTab, onOpenQtpp, onResetToNewInput }) => {
  const ctx = TAB_CONTEXT[activeTab] ?? { label: activeTab, sub: '' };

  return (
    <header
      style={{
        height: '52px',
        background: 'var(--surface-panel)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        gap: '16px',
      }}
    >
      {/* Left: current project + module context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            flexShrink: 0,
          }}
        >
          <FlaskConical size={15} style={{ color: 'var(--brand-teal)' }} />
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            rangkAI Hydro-Moist 2026
          </span>
        </div>

        <div
          style={{
            width: '1px',
            height: '14px',
            background: 'var(--border-subtle)',
            flexShrink: 0,
          }}
        />

        <div style={{ minWidth: 0 }}>
          <span
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}
          >
            {ctx.label}
          </span>
          <span
            style={{
              marginLeft: '7px',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            {ctx.sub}
          </span>
        </div>
      </div>

      {/* Right: status indicators + actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* Halal Gate - structural indicator, not decoration */}
        <div
          style={{ '--badge-color': '#15803d',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 10px',
            borderRadius: '6px',
            background: 'var(--status-clear-bg)',
            border: '1px solid var(--status-clear-border)',
          } as React.CSSProperties}
         className="badge-pill" data-status="true">
          <ShieldCheck size={13} style={{ color: 'var(--status-clear)', flexShrink: 0 }} />
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--status-clear)',
            }}
          >
            Halal tersertifikasi
          </span>
        </div>

        {/* Demo mode notice - amber because it's a real constraint */}
        <div
          style={{ '--badge-color': '#b45309',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 10px',
            borderRadius: '6px',
            background: 'var(--status-review-bg)',
            border: '1px solid var(--status-review-border)',
          } as React.CSSProperties}
         className="badge-pill" data-status="true">
          <AlertTriangle size={13} style={{ color: 'var(--status-review)', flexShrink: 0 }} />
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: '#7A5500',
            }}
          >
            Data simulasi R&D
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '20px', background: 'var(--border-subtle)' }} />

        {/* QTPP config */}
        <button
          onClick={onOpenQtpp}
          className="btn-ghost"
          style={{ fontSize: '0.75rem', padding: '5px 11px' }}
          title="Buka konfigurasi QTPP & dokumen"
        >
          <FileCog size={13} />
          QTPP & Dokumen
        </button>

        {/* New formulation */}
        {onResetToNewInput && (
          <button
            onClick={onResetToNewInput}
            className="btn-ghost"
            style={{
              fontSize: '0.75rem',
              padding: '5px 11px',
              color: 'var(--brand-teal)',
              borderColor: 'var(--status-clear-border)',
              background: 'var(--status-clear-bg)',
            }}
            title="Mulai formulasi baru dari awal"
          >
            <RotateCcw size={13} />
            Formulasi baru
          </button>
        )}
      </div>
    </header>
  );
};
