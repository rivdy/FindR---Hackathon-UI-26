import React, { useState } from 'react';
import { MOCK_STABILITY_RESULTS } from '../data/mockData';
import { TrialBatchPage } from './TrialBatchPage';
import { exportStabilityPdf } from '../utils/pdfGenerator';
import { 
  Thermometer, 
  CheckCircle2, 
  XCircle, 
  TrendingDown, 
  Info, 
  ClipboardCheck, 
  GitFork,
  Download,
  FileText
} from 'lucide-react';

interface StabilityPageProps {
  onNavigateToRca: () => void;
}

export const StabilityPage: React.FC<StabilityPageProps> = ({ onNavigateToRca }) => {
  const [activeSubTab, setActiveSubTab] = useState<'results' | 'trial'>('results');
  const stabilityResults = MOCK_STABILITY_RESULTS;
  const hasFail = stabilityResults.some(r => !r.is_stable);

  const handleDownloadPdf = () => {
    exportStabilityPdf(stabilityResults);
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
            <Thermometer size={20} color="var(--cyan-neon)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Modul Stabilitas & Eksekusi Batch Trial
            </h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Kaidah Evaluasi: Emulsi dinyatakan stabil (✓) jika penurunan viskositas &lt;20% pada bulan ketiga. Dilengkapi eksekusi SOP trial tertutup.
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
            title="Download laporan resmi 8 uji stabilitas fisik (PDF)"
          >
            <Download size={14} /> Download Laporan PDF
          </button>
          
          <button
            onClick={() => alert("Format Word DOCX sedang dalam pengembangan")}
            className="btn-secondary"
            style={{
              fontSize: '0.78rem',
              padding: '7px 14px',
              color: '#2563eb',
              borderColor: '#bfdbfe',
              background: '#eff6ff',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Download laporan resmi dalam format Word"
          >
            <FileText size={14} /> Export Word DOCX
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
          onClick={() => setActiveSubTab('results')}
          className={activeSubTab === 'results' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '8px 14px' }}
        >
          <Thermometer size={14} /> 8 Hasil Uji Stabilitas Fisik
        </button>

        <button
          onClick={() => setActiveSubTab('trial')}
          className={activeSubTab === 'trial' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '8px 14px' }}
        >
          <ClipboardCheck size={14} /> Eksekusi Batch Trial & SOP (Target vs Actual)
        </button>
      </div>

      {/* Subtab 1: 8 Stability Results */}
      {activeSubTab === 'results' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '10px',
            padding: '14px 18px',
            fontSize: '0.82rem',
            color: '#1e3a8a',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Info size={20} color="#0284c7" style={{ flexShrink: 0 }} />
            <div>
              <strong>Kriteria Stabilitas rangkAI:</strong> Emulsi dinyatakan <span style={{ color: '#059669', fontWeight: 700 }}>STABIL (✓)</span> apabila penurunan viskositas <strong>kurang dari 20% (&lt;20%)</strong> pada bulan ke-3. Jika penurunan viskositas <span style={{ color: '#e11d48', fontWeight: 700 }}>≥20% (✗)</span>, AI otomatis memicu investigasi RCA dan CAPA.
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', overflowX: 'auto', background: '#ffffff' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ color: '#475569', background: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '10px 12px' }}>Jenis Uji Stabilitas</th>
                  <th style={{ padding: '10px 12px' }}>Kondisi Pengujian</th>
                  <th style={{ padding: '10px 12px', width: '110px' }}>Viskositas Awal</th>
                  <th style={{ padding: '10px 12px', width: '115px' }}>Viskositas Akhir</th>
                  <th style={{ padding: '10px 12px', width: '125px' }}>Perubahan (%)</th>
                  <th style={{ padding: '10px 12px', width: '135px' }}>Status Evaluasi</th>
                  <th style={{ padding: '10px 12px' }}>Keterangan & Temuan</th>
                </tr>
              </thead>
              <tbody>
                {stabilityResults.map(item => {
                  const isFail = !item.is_stable;
                  return (
                    <tr 
                      key={item.id}
                      style={{
                        borderBottom: '1px solid #f1f5f9',
                        background: isFail ? '#fff1f2' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '12px', fontWeight: 700 }}>
                        <div style={{ color: isFail ? '#e11d48' : '#002b5c' }}>
                          {item.test_name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          Sumber: {item.trial_dataset_source}
                        </div>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                        {item.condition}
                      </td>
                      <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>
                        {item.initial_viscosity_cps.toLocaleString()} cPs
                      </td>
                      <td style={{ padding: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#002b5c' }}>
                        {item.measured_viscosity_cps.toLocaleString()} cPs
                      </td>
                      <td style={{ padding: '12px', fontFamily: 'var(--font-mono)' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: isFail ? '#e11d48' : '#059669',
                          fontWeight: 700
                        }}>
                          {item.viscosity_drop_pct > 0 ? `-${item.viscosity_drop_pct}%` : `${item.viscosity_drop_pct}%`}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        {item.is_stable ? (
                          <span className="badge-pill badge-emerald">
                            <CheckCircle2 size={12} /> Stabil (&lt;20%)
                          </span>
                        ) : (
                          <span className="badge-pill badge-rose">
                            <XCircle size={12} /> Gagal (≥20%)
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px', color: isFail ? '#e11d48' : 'var(--text-secondary)', fontSize: '0.78rem' }}>
                        {item.notes}
                        {isFail && (
                          <div style={{ marginTop: '6px' }}>
                            <button
                              onClick={onNavigateToRca}
                              style={{
                                background: '#fff1f2',
                                border: '1px solid #fecdd3',
                                color: '#be123c',
                                borderRadius: '6px',
                                padding: '4px 10px',
                                fontSize: '0.72rem',
                                cursor: 'pointer',
                                fontWeight: 700
                              }}
                            >
                              Kirim ke RCA &gt;
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty Table for Real Data Entry */}
          <div className="glass-panel" style={{ padding: '20px', overflowX: 'auto', background: '#ffffff', marginTop: '8px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', color: '#0f172a' }}>
              Input Data Stabilitas Manual (Data Real Lab)
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ color: '#475569', background: '#f8fafc', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '10px 12px' }}>Parameter Uji</th>
                  <th style={{ padding: '10px 12px' }}>Minggu 1</th>
                  <th style={{ padding: '10px 12px' }}>Minggu 2</th>
                  <th style={{ padding: '10px 12px' }}>Minggu 4</th>
                  <th style={{ padding: '10px 12px' }}>Minggu 8</th>
                  <th style={{ padding: '10px 12px' }}>Minggu 12</th>
                  <th style={{ padding: '10px 12px' }}>Kesimpulan</th>
                </tr>
              </thead>
              <tbody>
                {['Viskositas (cPs)', 'pH', 'Warna/Bau', 'Pemisahan Fase'].map((param, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#002b5c' }}>{param}</td>
                    <td style={{ padding: '8px 12px' }}><input type="text" placeholder="-" style={{ width: '100%', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} /></td>
                    <td style={{ padding: '8px 12px' }}><input type="text" placeholder="-" style={{ width: '100%', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} /></td>
                    <td style={{ padding: '8px 12px' }}><input type="text" placeholder="-" style={{ width: '100%', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} /></td>
                    <td style={{ padding: '8px 12px' }}><input type="text" placeholder="-" style={{ width: '100%', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} /></td>
                    <td style={{ padding: '8px 12px' }}><input type="text" placeholder="-" style={{ width: '100%', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} /></td>
                    <td style={{ padding: '8px 12px' }}><input type="text" placeholder="-" style={{ width: '100%', padding: '4px', border: '1px solid #cbd5e1', borderRadius: '4px' }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subtab 2: Trial Batch SOP */}
      {activeSubTab === 'trial' && (
        <div style={{ marginTop: '-12px' }}>
          <TrialBatchPage onNavigateToRCA={onNavigateToRca} />
        </div>
      )}
    </div>
  );
};
