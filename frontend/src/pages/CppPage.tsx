import React, { useState } from 'react';
import { 
  MOCK_CPP_PARAMETERS, 
  MOCK_CPP_TARGET_STEPS, 
  MOCK_CPP_ACTUAL_STEPS, 
  MOCK_CPP_FINAL_OBSERVATIONS,
  MOCK_CPP_DEVIATION_ACTUAL_STEPS,
  MOCK_CPP_DEVIATION_FINAL_OBSERVATIONS,
  BLANK_CPP_ACTUAL_STEPS,
  BLANK_CPP_FINAL_OBSERVATIONS
} from '../data/mockData';
import { CppActualStep, CppFinalObservation } from '../types';
import { exportCppPdf } from '../utils/pdfGenerator';
import { exportCppDocs } from '../utils/docGenerator';
import { 
  Activity, 
  Info, 
  GitFork, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Gauge,
  Thermometer,
  Sliders,
  Download,
  FileSpreadsheet,
  FileText,
  Layers,
  Sparkles,
  RotateCcw,
  FlaskConical,
  Edit3
} from 'lucide-react';

interface CppPageProps {
  onNavigateToCapa: () => void;
}

export const CppPage: React.FC<CppPageProps> = ({ onNavigateToCapa }) => {
  const [activeSubTab, setActiveSubTab] = useState<'protocol' | 'median_runs'>('protocol');
  const [batchStatus, setBatchStatus] = useState<'blank' | 'optimized' | 'deviation'>('blank');
  
  // Interactive research execution states (Blank by default per CPKB SOP!)
  const [actualSteps, setActualSteps] = useState<CppActualStep[]>(BLANK_CPP_ACTUAL_STEPS);
  const [finalObs, setFinalObs] = useState<CppFinalObservation[]>(BLANK_CPP_FINAL_OBSERVATIONS);

  const cppParameters = MOCK_CPP_PARAMETERS;
  const currentLotNumber = batchStatus === 'deviation' ? 'LOT-MOIST-26-04A' : 'LOT-MOIST-26-04B';

  // Handlers for lab simulations and manual editing
  const handleLoadOptimized = () => {
    setActualSteps(MOCK_CPP_ACTUAL_STEPS);
    setFinalObs(MOCK_CPP_FINAL_OBSERVATIONS);
    setBatchStatus('optimized');
  };

  const handleLoadDeviation = () => {
    setActualSteps(MOCK_CPP_DEVIATION_ACTUAL_STEPS);
    setFinalObs(MOCK_CPP_DEVIATION_FINAL_OBSERVATIONS);
    setBatchStatus('deviation');
  };

  const handleResetBlank = () => {
    setActualSteps(BLANK_CPP_ACTUAL_STEPS);
    setFinalObs(BLANK_CPP_FINAL_OBSERVATIONS);
    setBatchStatus('blank');
  };

  const handleUpdateStep = (index: number, field: keyof CppActualStep, value: string) => {
    const updated = [...actualSteps];
    updated[index] = { ...updated[index], [field]: value };
    setActualSteps(updated);
    if (batchStatus === 'blank') setBatchStatus('optimized');
  };

  const handleUpdateObs = (index: number, field: keyof CppFinalObservation, value: string) => {
    const updated = [...finalObs];
    updated[index] = { ...updated[index], [field]: value };
    setFinalObs(updated);
    if (batchStatus === 'blank') setBatchStatus('optimized');
  };

  const handleDownloadPdf = () => {
    exportCppPdf(batchStatus, actualSteps, finalObs);
  };

  const handleDownloadDocs = () => {
    exportCppDocs(batchStatus, actualSteps, finalObs);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{
        padding: '18px 22px',
        borderLeft: `4px solid ${
          batchStatus === 'deviation' 
            ? 'var(--rose-warning)' 
            : batchStatus === 'optimized' 
              ? 'var(--emerald-neon)' 
              : 'var(--cyan-neon)'
        }`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Activity size={20} color={batchStatus === 'deviation' ? 'var(--rose-warning)' : 'var(--cyan-neon)'} />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              CPP (Critical Process Parameters) & Lembar Protokol Batch
            </h2>
            <span className={`badge-pill ${
              batchStatus === 'deviation' 
                ? 'badge-rose' 
                : batchStatus === 'optimized' 
                  ? 'badge-emerald' 
                  : 'badge-cyan'
            }`}>
              {currentLotNumber}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              ({batchStatus === 'blank' 
                ? '⏳ Lembar Kerja Kosong - Menunggu Penelitian Lab' 
                : batchStatus === 'optimized' 
                  ? '✓ Batch Faktual Teroptimasi' 
                  : '⚠️ Trial Deviasi Pilot'})
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Format Standar Dokumen CPKB: Target Parameter Proses (C) ditetapkan oleh R&D, sedangkan Data Aktual Trial (D) dan Data Pengamatan Akhir (E) diisi langsung saat/setelah eksperimen lab berlangsung.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Download Options: PDF or DOCS */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '3px',
            gap: '4px',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, paddingLeft: '8px', paddingRight: '4px' }}>
              Unduh:
            </span>
            <button
              onClick={handleDownloadPdf}
              className="btn-secondary"
              style={{
                fontSize: '0.75rem',
                padding: '5px 12px',
                color: '#0369a1',
                borderColor: '#bfdbfe',
                background: '#eff6ff',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                borderRadius: '6px'
              }}
              title={batchStatus === 'blank' ? 'Download lembar kerja batch kosong untuk cetak langsung (PDF)' : `Download laporan lengkap hasil trial CPP (${currentLotNumber}.pdf)`}
            >
              <Download size={13} /> PDF
            </button>
            <button
              onClick={handleDownloadDocs}
              className="btn-secondary"
              style={{
                fontSize: '0.75rem',
                padding: '5px 12px',
                color: '#1e40af',
                borderColor: '#bfdbfe',
                background: '#eff6ff',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                borderRadius: '6px'
              }}
              title={batchStatus === 'blank' ? 'Download lembar kerja batch kosong format DOCS (Word / Google Docs) untuk disunting' : `Download laporan CPP format Word / Google Docs (${currentLotNumber}.doc)`}
            >
              <FileText size={13} /> DOCS (Word)
            </button>
          </div>

        </div>
      </div>

      {/* Sub navigation bar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '12px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveSubTab('protocol')}
          className={activeSubTab === 'protocol' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '8px 14px' }}
        >
          <FileSpreadsheet size={14} /> Protokol Batch: Target vs Aktual vs Pengamatan Akhir
        </button>

        <button
          onClick={() => setActiveSubTab('median_runs')}
          className={activeSubTab === 'median_runs' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '8px 14px' }}
        >
          <Activity size={14} /> Analisis Replikasi (Median ±3)
        </button>

      </div>

      {/* SUBTAB 1: PROTOCOL BATCH (SECTION C, D, E MATCHING USER SPECIFICATION) */}
      {activeSubTab === 'protocol' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* SECTION C: TARGET PARAMETER PROSES */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', background: '#ffffff' }}>
            <div style={{
              background: 'linear-gradient(90deg, #002b5c 0%, #0284c7 100%)',
              color: '#ffffff',
              padding: '10px 16px',
              borderRadius: '8px',
              fontSize: '0.92rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.2)'
            }}>
              <span>C. Target Parameter Proses</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.9, fontWeight: 500 }}>Standar R&D Pilot Compounding</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 12px', width: '40px' }}>No</th>
                    <th style={{ padding: '10px 12px' }}>Tahap Target</th>
                    <th style={{ padding: '10px 12px', width: '70px' }}>Fase</th>
                    <th style={{ padding: '10px 12px', width: '105px' }}>Suhu Target</th>
                    <th style={{ padding: '10px 12px', width: '110px' }}>Waktu Target</th>
                    <th style={{ padding: '10px 12px', width: '135px' }}>Speed Target</th>
                    <th style={{ padding: '10px 12px' }}>Output/Observasi Target</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CPP_TARGET_STEPS.map((t, idx) => (
                    <tr 
                      key={t.no} 
                      style={{ 
                        background: idx % 2 === 1 ? '#f8fafc' : '#ffffff',
                        borderBottom: '1px solid #f1f5f9'
                      }}
                    >
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-muted)' }}>{t.no}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: '#002b5c' }}>{t.stage_name}</td>
                      <td style={{ padding: '10px 12px', color: '#0284c7', fontWeight: 700 }}>{t.phase}</td>
                      <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)' }}>{t.temp_target}</td>
                      <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)' }}>{t.time_target}</td>
                      <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: '#059669', fontWeight: 700 }}>{t.speed_target}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{t.output_target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION D: DATA AKTUAL TRIAL BATCH */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', background: '#ffffff' }}>
            <div style={{
              background: 'linear-gradient(90deg, #002b5c 0%, #0284c7 100%)',
              color: '#ffffff',
              padding: '12px 18px',
              borderRadius: '8px',
              fontSize: '0.92rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>D. Data Aktual Trial Batch</span>
                <span style={{ 
                  fontSize: '0.72rem', 
                  padding: '3px 10px', 
                  borderRadius: '6px',
                  background: batchStatus === 'blank' ? 'rgba(255,255,255,0.2)' : batchStatus === 'deviation' ? '#f43f5e' : '#10b981',
                  color: '#ffffff',
                  fontWeight: 700 
                }}>
                  {batchStatus === 'blank' ? 'LEMBAR KOSONG (Siap Diisi Tim Peneliti)' : `Batch No: ${currentLotNumber}`}
                </span>
              </div>

              {/* Research Controls Toolbar */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={handleLoadOptimized}
                  style={{
                    background: batchStatus === 'optimized' ? '#10b981' : 'rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  title="Isi otomatis dengan data trial aktual dari eksperimen pilot plant"
                >
                  <Sparkles size={13} /> ⚡ Isi Data Trial Lab
                </button>

                <button
                  onClick={handleLoadDeviation}
                  style={{
                    background: batchStatus === 'deviation' ? '#f43f5e' : 'rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  title="Simulasikan deviasi proses (overshoot 82°C) untuk menguji modul 6M RCA"
                >
                  <AlertCircle size={13} /> ⚠️ Simulasi Deviasi
                </button>

                <button
                  onClick={handleResetBlank}
                  style={{
                    background: batchStatus === 'blank' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  title="Kosongkan kembali seluruh tabel untuk persiapan batch penelitian baru"
                >
                  <RotateCcw size={13} /> 🔄 Kosongkan
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 12px', width: '40px' }}>No</th>
                    <th style={{ padding: '10px 12px', width: '220px' }}>Tahap Aktual</th>
                    <th style={{ padding: '10px 12px', width: '65px' }}>Fase</th>
                    <th style={{ padding: '10px 12px', width: '115px' }}>Suhu Aktual</th>
                    <th style={{ padding: '10px 12px', width: '110px' }}>Waktu Aktual</th>
                    <th style={{ padding: '10px 12px', width: '125px' }}>Speed Aktual</th>
                    <th style={{ padding: '10px 12px' }}>Observasi Lapangan (Catatan Nyata)</th>
                  </tr>
                </thead>
                <tbody>
                  {actualSteps.map((a, idx) => {
                    const isOvershoot = a.temp_actual.includes('82°C') || a.speed_actual.includes('3200 rpm');
                    return (
                      <tr 
                        key={a.no} 
                        style={{ 
                          background: isOvershoot 
                            ? '#fff1f2' 
                            : idx % 2 === 1 ? '#f8fafc' : '#ffffff',
                          borderBottom: '1px solid #f1f5f9'
                        }}
                      >
                        <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-muted)' }}>{a.no}</td>
                        <td style={{ padding: '10px 12px', fontWeight: 600, color: '#002b5c' }}>{a.stage_name}</td>
                        <td style={{ padding: '10px 12px', color: '#0284c7', fontWeight: 700 }}>{a.phase}</td>
                        <td style={{ padding: '8px 10px' }}>
                          <input
                            type="text"
                            value={a.temp_actual}
                            onChange={(e) => handleUpdateStep(idx, 'temp_actual', e.target.value)}
                            placeholder="e.g. 73°C"
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              fontSize: '0.8rem',
                              fontFamily: 'var(--font-mono)',
                              background: '#ffffff',
                              border: isOvershoot ? '1px solid #f43f5e' : '1px solid #cbd5e1',
                              borderRadius: '6px',
                              color: isOvershoot ? 'var(--rose-warning)' : '#002b5c',
                              fontWeight: 700
                            }}
                          />
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <input
                            type="text"
                            value={a.time_actual}
                            onChange={(e) => handleUpdateStep(idx, 'time_actual', e.target.value)}
                            placeholder="e.g. 15 mnt"
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              fontSize: '0.8rem',
                              fontFamily: 'var(--font-mono)',
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              color: '#0f172a'
                            }}
                          />
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <input
                            type="text"
                            value={a.speed_actual}
                            onChange={(e) => handleUpdateStep(idx, 'speed_actual', e.target.value)}
                            placeholder="e.g. 550 rpm"
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              fontSize: '0.8rem',
                              fontFamily: 'var(--font-mono)',
                              background: '#ffffff',
                              border: isOvershoot ? '1px solid #f43f5e' : '1px solid #cbd5e1',
                              borderRadius: '6px',
                              color: isOvershoot ? 'var(--rose-warning)' : '#059669',
                              fontWeight: 700
                            }}
                          />
                        </td>
                        <td style={{ padding: '8px 10px' }}>
                          <input
                            type="text"
                            value={a.observation_actual}
                            onChange={(e) => handleUpdateStep(idx, 'observation_actual', e.target.value)}
                            placeholder="Tuliskan hasil pengamatan fisik aktual..."
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              fontSize: '0.8rem',
                              background: '#ffffff',
                              border: isOvershoot ? '1px solid #f43f5e' : '1px solid #cbd5e1',
                              borderRadius: '6px',
                              color: '#0f172a'
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION E: DATA PENGAMATAN AKHIR (PH & VISKOSITAS) */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', background: '#ffffff' }}>
            <div style={{
              background: 'linear-gradient(90deg, #002b5c 0%, #0284c7 100%)',
              color: '#ffffff',
              padding: '12px 18px',
              borderRadius: '8px',
              fontSize: '0.92rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.2)'
            }}>
              <span>E. Data Pengamatan Akhir (Target vs Hasil T0 vs Hasil 24 Jam)</span>
              <span style={{ fontSize: '0.74rem', opacity: 0.9, fontWeight: 500 }}>
                {batchStatus === 'blank' ? 'Menunggu Pengujian Lab' : `Evaluasi CQA (${currentLotNumber})`}
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#475569', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                    <th style={{ padding: '10px 12px', width: '150px' }}>Parameter</th>
                    <th style={{ padding: '10px 12px', width: '200px' }}>Target</th>
                    <th style={{ padding: '10px 12px', width: '130px' }}>Hasil T0</th>
                    <th style={{ padding: '10px 12px', width: '130px' }}>Hasil 24 Jam</th>
                    <th style={{ padding: '10px 12px', width: '140px' }}>Status Mutu</th>
                    <th style={{ padding: '10px 12px' }}>Catatan Evaluasi Tim Lab</th>
                  </tr>
                </thead>
                <tbody>
                  {finalObs.map((o, idx) => (
                    <tr 
                      key={o.parameter} 
                      style={{ 
                        background: idx % 2 === 1 ? '#f8fafc' : '#ffffff',
                        borderBottom: '1px solid #f1f5f9'
                      }}
                    >
                      <td style={{ padding: '10px 12px', fontWeight: 800, color: '#002b5c' }}>{o.parameter}</td>
                      <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: '#0284c7', fontWeight: 700 }}>{o.target}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <input
                          type="text"
                          value={o.result_t0}
                          onChange={(e) => handleUpdateObs(idx, 'result_t0', e.target.value)}
                          placeholder="Hasil T0..."
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            fontSize: '0.8rem',
                            fontFamily: 'var(--font-mono)',
                            background: '#ffffff',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            color: '#002b5c',
                            fontWeight: 700
                          }}
                        />
                      </td>
                      <td style={{ padding: '8px 10px' }}>
                        <input
                          type="text"
                          value={o.result_t24}
                          onChange={(e) => handleUpdateObs(idx, 'result_t24', e.target.value)}
                          placeholder="Hasil 24 jam..."
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            fontSize: '0.8rem',
                            fontFamily: 'var(--font-mono)',
                            background: '#ffffff',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            color: o.status === 'OK' ? '#059669' : '#d97706',
                            fontWeight: 700
                          }}
                        />
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {!o.result_t0 && !o.result_t24 ? (
                          <span className="badge-pill badge-neutral" style={{ fontSize: '0.68rem' }}>
                            <Clock size={11} /> Belum Diuji
                          </span>
                        ) : o.status === 'OK' ? (
                          <span className="badge-pill badge-emerald" style={{ fontSize: '0.68rem' }}>
                            <CheckCircle2 size={11} /> OK
                          </span>
                        ) : (
                          <span className="badge-pill badge-amber" style={{ fontSize: '0.68rem' }}>
                            <AlertCircle size={11} /> Perlu Perhatian
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '8px 10px' }}>
                        <input
                          type="text"
                          value={o.evaluation_note || ''}
                          onChange={(e) => handleUpdateObs(idx, 'evaluation_note', e.target.value)}
                          placeholder="Ketik catatan evaluasi hasil uji..."
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            fontSize: '0.8rem',
                            background: '#ffffff',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px',
                            color: '#0f172a'
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Batch Status & Instructions Callout */}
            {batchStatus === 'blank' ? (
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '10px',
                padding: '14px 18px',
                fontSize: '0.8rem',
                color: '#1e3a8a',
                lineHeight: 1.5,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <FlaskConical size={20} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#002b5c' }}>📋 Lembar Kerja Kosong Siap Diisi:</strong> Sesuai SOP CPKB industri kosmetik, tabel <strong>Data Aktual Trial (D)</strong> dan <strong>Data Pengamatan Akhir (E)</strong> disiapkan kosong sebelum proses compounding dimulai.
                  <ul style={{ margin: '6px 0 0 16px', padding: 0 }}>
                    <li>Peneliti atau operator compounding dapat <strong>mengetik langsung</strong> nilai suhu aktual, waktu, kecepatan, serta hasil pH dan viskositas di kolom atas.</li>
                    <li>Atau klik tombol <strong>'⚡ Isi Data Trial Lab'</strong> di atas untuk memuat simulasi data riil batch teroptimasi secara instan.</li>
                    <li>Tombol <strong>'PDF'</strong> atau <strong>'DOCS (Word)'</strong> di kanan atas dapat digunakan untuk mencetak formulir SOP resmi atau mengunduh berkas Word/Docs yang dapat disunting langsung.</li>
                  </ul>
                </div>
              </div>
            ) : batchStatus === 'deviation' ? (
              <div style={{
                background: '#fff1f2',
                border: '1px solid #fecdd3',
                borderRadius: '10px',
                padding: '14px 18px',
                fontSize: '0.8rem',
                color: '#9f1239',
                lineHeight: 1.5
              }}>
                <strong>⚠️ Temuan Deviasi Proses (Batch LOT-MOIST-26-04A):</strong> Suhu pemanasan fase A overshoot (82°C vs target 70-75°C) dan kecepatan homogenizer 3200 rpm memicu timbulnya gelembung mikro dan viskositas awal rendah (16.500 cPs). Silakan klik tombol <strong>'Buka 6M Fishbone RCA'</strong> di kanan atas untuk menganalisis akar masalah dan menyusun tindakan korektif (CAPA).
              </div>
            ) : (
              <div style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '10px',
                padding: '14px 18px',
                fontSize: '0.8rem',
                color: '#065f46',
                lineHeight: 1.5
              }}>
                <strong>✓ Batch Faktual Teroptimasi (Batch LOT-MOIST-26-04B):</strong> Seluruh tahapan compounding (suhu, waktu, kecepatan rotasi) mematuhi batas kritis target R&D. Nilai pH 5.74 stabil di rentang fisiologis (5.5-6.0), viskositas 21.500 cPs sesuai target, dan 3x replikasi membuktikan reprodusibilitas proses formula siap scale-up.
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 2: MEDIAN & REPLICATE RUNS (RUN 1-3 WITH +/- 3 SIMPANGAN) */}
      {activeSubTab === 'median_runs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                  <th style={{ padding: '10px 8px', width: '90px' }}>Target AI</th>
                  <th style={{ padding: '10px 8px', width: '75px' }}>Run 1</th>
                  <th style={{ padding: '10px 8px', width: '75px' }}>Run 2</th>
                  <th style={{ padding: '10px 8px', width: '75px' }}>Run 3</th>
                  <th style={{ padding: '10px 8px', width: '105px' }}>Nilai Median</th>
                  <th style={{ padding: '10px 8px', width: '115px' }}>Simpangan</th>
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
                    <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)', color: 'var(--emerald-neon)', fontWeight: 700 }}>
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

    </div>
  );
};
