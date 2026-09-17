import React, { useState } from 'react';
import { MOCK_CMA_ATTRIBUTES } from '../data/mockData';
import { CapaPage } from './CapaPage';
import { exportCmaPdf } from '../utils/pdfGenerator';
import { 
  FlaskConical, 
  Info, 
  ShieldAlert, 
  CheckCircle2,
  Download 
} from 'lucide-react';

export const CmaPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'attributes' | 'capa'>('attributes');
  const cmaAttributes = MOCK_CMA_ATTRIBUTES;

  const handleDownloadPdf = () => {
    exportCmaPdf(cmaAttributes);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{
        padding: '18px 22px',
        borderLeft: '4px solid var(--cyan-neon)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FlaskConical size={20} color="var(--cyan-neon)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              CMA (Critical Material Attributes) & CAPA Hub
            </h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Evaluasi kepatuhan atribut kritis bahan baku (droplet size, kemurnian HPLC, offset HLB) dan preseden solusi CAPA historis.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={handleDownloadPdf}
            className="btn-secondary"
            style={{
              fontSize: '0.78rem',
              padding: '7px 14px',
              color: '#0284c7',
              borderColor: '#bfdbfe',
              background: '#eff6ff',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Download laporan spesifikasi atribut kritis material (CMA)"
          >
            <Download size={14} /> Download Laporan CMA PDF
          </button>

          <button
            onClick={() => setActiveSubTab(activeSubTab === 'capa' ? 'attributes' : 'capa')}
            className="btn-secondary"
            style={{ fontSize: '0.78rem', borderColor: '#cbd5e1' }}
          >
            <ShieldAlert size={13} /> {activeSubTab === 'capa' ? 'Lihat Spesifikasi CMA' : 'Buka CAPA Knowledge Hub'}
          </button>
        </div>
      </div>

      {/* Sub navigation bar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '12px'
      }}>
        <button
          onClick={() => setActiveSubTab('attributes')}
          className={activeSubTab === 'attributes' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '8px 14px' }}
        >
          <FlaskConical size={14} /> Atribut Material Kritis (Spesifikasi & Uji)
        </button>

        <button
          onClick={() => setActiveSubTab('capa')}
          className={activeSubTab === 'capa' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '8px 14px' }}
        >
          <ShieldAlert size={14} /> CAPA Knowledge Base (100 Kasus Preseden)
        </button>
      </div>

      {/* Subtab 1: CMA Attributes Table */}
      {activeSubTab === 'attributes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#1e40af'
          }}>
            <Info size={18} color="#0284c7" style={{ flexShrink: 0 }} />
            <div>
              <strong>Atribut Kritis Material (CMA):</strong> Spesifikasi fisiko-kimia bahan baku yang mempengaruhi langsung <em>Critical Quality Attributes</em> (CQA) kestabilan emulsi dan kepatuhan registrasi.
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ color: 'var(--text-muted)', textAlign: 'left', borderBottom: '1px solid var(--border-subtle)', background: '#f8fafc' }}>
                  <th style={{ padding: '10px 8px' }}>Nama Material / Bahan</th>
                  <th style={{ padding: '10px 8px' }}>Atribut Kritis (CMA)</th>
                  <th style={{ padding: '10px 8px' }}>Target Spesifikasi</th>
                  <th style={{ padding: '10px 8px' }}>Hasil Ukur Aktual</th>
                  <th style={{ padding: '10px 8px', width: '120px' }}>Status</th>
                  <th style={{ padding: '10px 8px' }}>Pengaruh ke CQA</th>
                </tr>
              </thead>
              <tbody>
                {cmaAttributes.map(cma => (
                  <tr key={cma.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 700, color: '#0f172a' }}>
                      {cma.material_name}
                    </td>
                    <td style={{ padding: '12px 8px', color: 'var(--text-primary)' }}>
                      {cma.attribute_name}
                    </td>
                    <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)' }}>
                      {cma.target_spec}
                    </td>
                    <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--brand-blue)' }}>
                      {cma.actual_measured}
                    </td>
                    <td style={{ padding: '12px 8px' }}>
                      <span className="badge-pill badge-emerald">
                        <CheckCircle2 size={12} /> {cma.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontSize: '0.76rem' }}>
                      {cma.impact_to_cqa}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 2: CAPA Knowledge Base */}
      {activeSubTab === 'capa' && (
        <div style={{ marginTop: '-12px' }}>
          <CapaPage />
        </div>
      )}
    </div>
  );
};
