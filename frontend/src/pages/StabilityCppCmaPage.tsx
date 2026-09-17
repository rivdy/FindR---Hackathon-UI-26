import React, { useState } from 'react';
import {
  MOCK_STABILITY_RESULTS,
  MOCK_CPP_PARAMETERS,
  MOCK_CMA_ATTRIBUTES
} from '../data/mockData';
import {
  Thermometer,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  GitFork,
  Activity,
  FlaskConical,
  Layers,
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';

interface StabilityCppCmaPageProps {
  onNavigateToRca: () => void;
}

export const StabilityCppCmaPage: React.FC<StabilityCppCmaPageProps> = ({ onNavigateToRca }) => {
  const [subTab, setSubTab] = useState<'stability' | 'cpp' | 'cma'>('stability');

  const stabilityResults = MOCK_STABILITY_RESULTS;
  const cppParameters = MOCK_CPP_PARAMETERS;
  const cmaAttributes = MOCK_CMA_ATTRIBUTES;

  const hasStabilityFailure = stabilityResults.some(r => !r.is_stable);

  return (
    <div className="module-page" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
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
            <Activity size={20} color="var(--cyan-neon)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Evaluasi Stabilitas, CPP (Proses Kritis) & CMA (Material Kritis)
            </h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Aturan Mutu: Stabilitas valid jika penurunan viskositas &lt;20% pada bulan ketiga. Parameter CPP menggunakan nilai Median dengan simpangan replikasi ±3.
          </p>
        </div>

        {hasStabilityFailure && (
          <button
            onClick={onNavigateToRca}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
              fontSize: '0.82rem',
              boxShadow: '0 0 15px rgba(244, 63, 94, 0.4)'
            }}
          >
            <GitFork size={15} /> Investigasi Kegagalan di RCA & CAPA
          </button>
        )}
      </div>

      {/* Sub Tabs Navigation */}
      <div className="ui-tabs">
        <button
          onClick={() => setSubTab('stability')}
          className="ui-tab"
         aria-pressed={subTab === 'stability'}>
          <Thermometer size={15} /> 8 Uji Stabilitas Fisik
        </button>

        <button
          onClick={() => setSubTab('cpp')}
          className="ui-tab"
         aria-pressed={subTab === 'cpp'}>
          <Activity size={15} /> CPP (Critical Process Parameters)
        </button>

        <button
          onClick={() => setSubTab('cma')}
          className="ui-tab"
         aria-pressed={subTab === 'cma'}>
          <FlaskConical size={15} /> CMA (Critical Material Attributes)
        </button>
      </div>

      {/* SUBTAB 1: 8 STABILITY RESULTS */}
      {subTab === 'stability' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Rule callout */}
          <div style={{
            background: 'rgba(6, 182, 212, 0.08)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Info size={18} color="var(--cyan-neon)" style={{ flexShrink: 0 }} />
            <div>
              <strong>Kriteria Stabilitas rangkAI:</strong> Emulsi dinyatakan <span style={{ color: 'var(--emerald-neon)', fontWeight: 700 }}>STABIL</span> apabila penurunan viskositas <strong>kurang dari 20% (&lt;20%)</strong> pada bulan ke-3. Jika penurunan viskositas <span style={{ color: 'var(--rose-danger)', fontWeight: 700 }}>≥20%</span>, AI otomatis memicu investigasi RCA dan CAPA.
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ color: 'var(--text-muted)', textAlign: 'left', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '10px 8px' }}>Jenis Uji Stabilitas</th>
                  <th style={{ padding: '10px 8px' }}>Kondisi Pengujian</th>
                  <th style={{ padding: '10px 8px', width: '100px' }}>Viskositas Awal</th>
                  <th style={{ padding: '10px 8px', width: '110px' }}>Viskositas Akhir</th>
                  <th style={{ padding: '10px 8px', width: '120px' }}>Perubahan (%)</th>
                  <th style={{ padding: '10px 8px', width: '130px' }}>Status Evaluasi</th>
                  <th style={{ padding: '10px 8px' }}>Keterangan & Temuan</th>
                </tr>
              </thead>
              <tbody>
                {stabilityResults.map(item => {
                  const isFail = !item.is_stable;
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                        background: isFail ? 'rgba(244, 63, 94, 0.08)' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '12px 8px', fontWeight: 700 }}>
                        <div style={{ color: isFail ? 'var(--rose-danger)' : 'var(--text-primary)' }}>
                          {item.test_name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          Sumber: {item.trial_dataset_source}
                        </div>
                      </td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>
                        {item.condition}
                      </td>
                      <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)' }}>
                        {item.initial_viscosity_cps.toLocaleString()} cPs
                      </td>
                      <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {item.measured_viscosity_cps.toLocaleString()} cPs
                      </td>
                      <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: isFail ? 'var(--rose-danger)' : 'var(--emerald-neon)',
                          fontWeight: 700
                        }}>
                          <TrendingDown size={13} /> {item.viscosity_drop_pct.toFixed(1)}%
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
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
                      <td style={{ padding: '12px 8px', color: isFail ? 'var(--rose-danger)' : 'var(--text-secondary)', fontSize: '0.76rem' }}>
                        {item.notes}
                        {isFail && (
                          <div style={{ marginTop: '4px' }}>
                            <button
                              onClick={onNavigateToRca}
                              style={{
                                background: 'rgba(244, 63, 94, 0.2)',
                                border: '1px solid rgba(244, 63, 94, 0.4)',
                                color: '#fff',
                                borderRadius: '4px',
                                padding: '2px 8px',
                                fontSize: '0.68rem',
                                cursor: 'pointer',
                                fontWeight: 700
                              }}
                            >
                              Kirim ke RCA Fishbone &gt;
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
        </div>
      )}

      {/* SUBTAB 2: CPP (CRITICAL PROCESS PARAMETERS) */}
      {subTab === 'cpp' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Info size={18} color="var(--emerald-neon)" style={{ flexShrink: 0 }} />
            <div>
              <strong>Kaidah Perhitungan CPP:</strong> Nilai proses dihitung berdasarkan <strong>Median</strong> dari data replikasi (Run 1, Run 2, Run 3) dengan rentang toleransi simpangan yang terkontrol rapat (<strong>±3 satuan</strong>).
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ color: 'var(--text-muted)', textAlign: 'left', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '10px 8px' }}>Parameter Proses Kritis</th>
                  <th style={{ padding: '10px 8px' }}>Tahap Proses</th>
                  <th style={{ padding: '10px 8px', width: '80px' }}>Target</th>
                  <th style={{ padding: '10px 8px', width: '75px' }}>Run 1</th>
                  <th style={{ padding: '10px 8px', width: '75px' }}>Run 2</th>
                  <th style={{ padding: '10px 8px', width: '75px' }}>Run 3</th>
                  <th style={{ padding: '10px 8px', width: '100px' }}>Nilai Median</th>
                  <th style={{ padding: '10px 8px', width: '110px' }}>Simpangan</th>
                  <th style={{ padding: '10px 8px' }}>Dampak Mutu (CQA)</th>
                </tr>
              </thead>
              <tbody>
                {cppParameters.map(cpp => (
                  <tr key={cpp.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 700 }}>
                      {cpp.name}
                    </td>
                    <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>
                      {cpp.phase}
                    </td>
                    <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)' }}>
                      {cpp.target_val} {cpp.unit}
                    </td>
                    <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      {cpp.run_1}
                    </td>
                    <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      {cpp.run_2}
                    </td>
                    <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      {cpp.run_3}
                    </td>
                    <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--cyan-neon)' }}>
                      {cpp.median} {cpp.unit}
                    </td>
                    <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)' }}>
                      <span className="badge-pill badge-neutral">
                        ±{cpp.deviation_range} {cpp.unit}
                      </span>
                    </td>
                    <td style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontSize: '0.76rem' }}>
                      {cpp.impact}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: CMA (CRITICAL MATERIAL ATTRIBUTES) */}
      {subTab === 'cma' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Info size={18} color="#a5b4fc" style={{ flexShrink: 0 }} />
            <div>
              <strong>Atribut Kritis Material (CMA):</strong> Spesifikasi fisiko-kimia bahan baku yang mempengaruhi langsung *Critical Quality Attributes* (CQA) kestabilan emulsi dan kepatuhan registrasi.
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ color: 'var(--text-muted)', textAlign: 'left', borderBottom: '1px solid var(--border-subtle)' }}>
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
                  <tr key={cma.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 700 }}>
                      {cma.material_name}
                    </td>
                    <td style={{ padding: '12px 8px', color: 'var(--text-primary)' }}>
                      {cma.attribute_name}
                    </td>
                    <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)' }}>
                      {cma.target_spec}
                    </td>
                    <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--cyan-neon)' }}>
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
    </div>
  );
};
