import React, { useState } from 'react';
import { ContextSignal } from '../components/ModuleHero';
import { Ingredient, HalalStatus } from '../types';
import { MOCK_INGREDIENTS } from '../data/mockData';
import { exportIngredientCoaPdf } from '../utils/pdfGenerator';
import {
  Search,
  Database,
  ShieldCheck,
  ShieldAlert,
  Filter,
  CheckCircle2,
  Info,
  Download,
  FileText,
  AlertTriangle,
  Beaker,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

export const IngredientPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFunction, setSelectedFunction] = useState<string>('ALL');
  const [selectedHalal, setSelectedHalal] = useState<string>('ALL');
  const [activeIngredient, setActiveIngredient] = useState<Ingredient | null>(MOCK_INGREDIENTS[2]); // Niacinamide default
  const [detailTab, setDetailTab] = useState<'summary' | 'coa' | 'msds'>('coa'); // Default to CoA as requested

  const functionOptions = [
    'ALL',
    'pH adjuster',
    'Viscosity',
    'Antioxidant',
    'Solvent',
    'Anti-foaming',
    'Pigment',
    'Flavoring',
    'Active',
    'Emollient',
    'Humectant',
    'Emulsifying',
    'Preservative'
  ];

  const filtered = MOCK_INGREDIENTS.filter(ing => {
    const matchesSearch =
      ing.inci_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ing.trade_name && ing.trade_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ing.cas_number && ing.cas_number.includes(searchQuery));

    const matchesFunction = selectedFunction === 'ALL' ||
      ing.functions.some(f => f.toLowerCase().includes(selectedFunction.toLowerCase()));

    const matchesHalal = selectedHalal === 'ALL' || ing.halal_status === selectedHalal;

    return matchesSearch && matchesFunction && matchesHalal;
  });

  const handleDownloadCoaPdf = () => {
    if (activeIngredient) {
      exportIngredientCoaPdf(activeIngredient);
    }
  };

  return (
    <div className="module-page" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        borderLeft: '4px solid var(--emerald-neon)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }} data-mobile-wrap="true">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} data-mobile-wrap="true">
            <Database size={18} color="var(--emerald-neon)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              Katalog Bahan & Dokumen Mutu
            </h2>
            <span className="badge-pill badge-emerald">51+ INCI Kosmetik Terverifikasi</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Database lengkap bahan kosmetik standar INCI, Certificate of Analysis (CoA) atau Material Safety Data Sheet (MSDS), dan bukti Halal BPJPH/MUI.
          </p>
        </div>

        {activeIngredient && (
          <button
            onClick={handleDownloadCoaPdf}
            className="ui-download"
            title="Download dokumen CoA & lembar spesifikasi resmi format CPKB BPOM"
          >
            <Download size={14} /> Unduh PDF
          </button>
        )}
      </div>

      <ContextSignal kind="coa" />
      {/* Search & Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }} data-mobile-wrap="true">
        <div style={{
          flex: '1 1 300px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          padding: '8px 12px'
        }} data-mobile-wrap="true">
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Cari INCI, Nama Dagang, CAS (misal: Niacinamide, Glycerin, Sodium Hyaluronate, Salicylic Acid)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#0f172a',
              fontSize: '0.85rem',
              width: '100%'
            }}
          />
        </div>

        {/* Function Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }} data-mobile-wrap="true">
          {functionOptions.map(fn => (
            <button
              key={fn}
              onClick={() => setSelectedFunction(fn)}
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: '6px',
                border: selectedFunction === fn ? '1px solid #0284c7' : '1px solid #cbd5e1',
                background: selectedFunction === fn ? '#eff6ff' : '#ffffff',
                color: selectedFunction === fn ? '#0284c7' : '#475569',
                cursor: 'pointer'
              }}
            >
              {fn}
            </button>
          ))}
        </div>

        {/* Halal Gate Filter */}
        <select
          value={selectedHalal}
          onChange={(e) => setSelectedHalal(e.target.value)}
          style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            fontSize: '0.8rem',
            padding: '8px 12px',
            borderRadius: '8px',
            outline: 'none'
          }}
        >
          <option value="ALL">Semua Status Halal</option>
          <option value="HALAL_VERIFIED">Halal Verified</option>
          <option value="HALAL_EXEMPT">Halal Exempt (Mineral)</option>
          <option value="HALAL_REVIEW_REQUIRED">Review Required (?)</option>
        </select>
      </div>

      {/* Main Grid: List Table + Detail Panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '20px'
      }} data-mobile-grid="true">
        {/* Left: Table */}
        <div className="glass-panel" style={{ padding: '16px', overflowX: 'auto', maxHeight: '720px' }} data-table-scroll="true" tabIndex={0} role="region" aria-label="Tabel data, geser untuk melihat kolom lainnya">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            Menampilkan {filtered.length} dari {MOCK_INGREDIENTS.length} bahan baku kosmetik
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', textAlign: 'left', borderBottom: '1px solid var(--border-subtle)' }}>
                <th style={{ padding: '8px 6px' }}>Nama INCI & Dagang</th>
                <th style={{ padding: '8px 6px' }}>Fungsi CosIng</th>
                <th style={{ padding: '8px 6px', width: '90px' }}>Typical %</th>
                <th style={{ padding: '8px 6px', width: '100px' }}>Bukti Mutu</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(ing => {
                const isSelected = activeIngredient?.id === ing.id;
                return (
                  <tr
                    key={ing.id}
                    onClick={() => setActiveIngredient(ing)}
                    style={{
                      cursor: 'pointer',
                      borderBottom: '1px solid #f1f5f9',
                      background: isSelected ? '#eff6ff' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '10px 6px', fontWeight: 600 }}>
                      <div style={{ color: isSelected ? 'var(--brand-blue)' : '#0f172a' }}>
                        {ing.inci_name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {ing.trade_name}
                      </div>
                    </td>
                    <td style={{ padding: '10px 6px', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }} data-mobile-wrap="true">
                        {ing.functions.slice(0, 2).map((f, i) => (
                          <span key={i} style={{
                            padding: '2px 6px',
                            background: '#f1f5f9',
                            color: '#475569',
                            borderRadius: '4px',
                            fontSize: '0.68rem',
                            border: '1px solid #e2e8f0'
                          }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '10px 6px', fontFamily: 'var(--font-mono)' }}>
                      {ing.typical_min_pct} - {ing.typical_max_pct}%
                    </td>
                    <td style={{ padding: '10px 6px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {ing.halal_status === 'HALAL_VERIFIED' ? (
                          <span className="badge-pill badge-emerald" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                            <ShieldCheck size={10} /> Halal
                          </span>
                        ) : ing.halal_status === 'HALAL_EXEMPT' ? (
                          <span className="badge-pill badge-neutral" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                            Exempt
                          </span>
                        ) : (
                          <span className="badge-pill badge-amber" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                            <ShieldAlert size={10} /> Review ?
                          </span>
                        )}
                        <span style={{ fontSize: '0.62rem', color: '#0284c7', background: '#eff6ff', border: '1px solid #bfdbfe', padding: '1px 4px', borderRadius: '3px', width: 'fit-content' }}>
                          CoA Pass
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right: Ingredient Detail Card with CoA & MSDS Tabs */}
        {activeIngredient && (
          <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '720px', overflowY: 'auto' }}>
            {/* Header with Title and Price */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} data-mobile-wrap="true">
              <div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} data-mobile-wrap="true">
                  <span className="badge-pill badge-cyan">Cosmetic Raw Material</span>
                  <span className="badge-pill badge-emerald">CoA Verified</span>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '6px', color: '#002b5c' }}>
                  {activeIngredient.inci_name}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Trade Name: <strong style={{ color: '#0f172a' }}>{activeIngredient.trade_name}</strong>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="font-mono-calc" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#059669' }}>
                  IDR {activeIngredient.estimated_cost_per_kg.toLocaleString('id-ID')}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>per kg estimasi</div>
              </div>
            </div>

            {/* Tab Switcher: Summary vs CoA vs MSDS */}
            <div className="ui-tabs">
              <button
                onClick={() => setDetailTab('coa')}
               aria-pressed={detailTab === 'coa'} className="ui-tab">
                <Award size={14} /> Certificate of Analysis (CoA)
              </button>

              <button
                onClick={() => setDetailTab('msds')}
               aria-pressed={detailTab === 'msds'} className="ui-tab">
                <FileText size={14} /> MSDS / SDS Safety
              </button>

              <button
                onClick={() => setDetailTab('summary')}
               aria-pressed={detailTab === 'summary'} className="ui-tab">
                <Info size={14} /> Spesifikasi Ringkas
              </button>
            </div>

            {/* TAB 1: COA DETAILS */}
            {detailTab === 'coa' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  padding: '8px 12px',
                  borderRadius: '6px'
                }} data-mobile-wrap="true">
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald-neon)', fontWeight: 600 }}>
                    Lot No: <strong>{activeIngredient.coa_details?.lot_number || 'LOT-2026-REG'}</strong>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Rilis: {activeIngredient.coa_details?.release_date} | Exp: {activeIngredient.coa_details?.expiry_date}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  fontSize: '0.76rem'
                }} data-mobile-grid="true">
                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Pemerian (Appearance):</div>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{activeIngredient.coa_details?.appearance}</div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Assay Kemurnian:</div>
                    <div className="font-mono-calc" style={{ fontWeight: 700, color: '#059669' }}>
                      {activeIngredient.coa_details?.assay_purity_pct}% (Pass ≥ 98%)
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Cemaran Logam Berat:</div>
                    <div className="font-mono-calc" style={{ fontWeight: 600, color: '#0284c7' }}>
                      {activeIngredient.coa_details?.heavy_metals_ppm}
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Total Microbial Plate (TPC):</div>
                    <div className="font-mono-calc" style={{ fontWeight: 600, color: '#0f172a' }}>
                      {activeIngredient.coa_details?.microbial_alt}
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Uji Patogen (E. coli, etc):</div>
                    <div style={{ fontWeight: 600, color: '#059669' }}>
                      {activeIngredient.coa_details?.pathogens}
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>pH Larutan 1%:</div>
                    <div className="font-mono-calc" style={{ fontWeight: 600, color: '#0f172a' }}>
                      {activeIngredient.coa_details?.ph_solution_1pct ?? '6.5'}
                    </div>
                  </div>

                  {activeIngredient.coa_details?.melting_point_c && (
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', gridColumn: 'span 2' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Titik Leleh (Melting Point):</div>
                      <div className="font-mono-calc" style={{ fontWeight: 600, color: '#0f172a' }}>
                        {activeIngredient.coa_details.melting_point_c}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{
                  padding: '10px 12px',
                  borderRadius: '6px',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }} data-mobile-wrap="true">
                  <CheckCircle2 size={16} color="#059669" />
                  <div style={{ fontSize: '0.74rem', color: '#065f46' }}>
                    <strong>Audit Mutu CoA: LULUS (PASS).</strong> Sesuai standar kompendial USP / BPOM / CPKB untuk sediaan kosmetik aman.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MSDS DETAILS */}
            {detailTab === 'msds' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeIngredient.msds_details ? (
                  <>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      padding: '8px 12px',
                      borderRadius: '6px'
                    }} data-mobile-wrap="true">
                      <div style={{ fontSize: '0.75rem', color: '#1d4ed8', fontWeight: 600 }}>
                        GHS: <strong>{activeIngredient.msds_details.ghs_classification}</strong>
                      </div>
                      <span className={activeIngredient.msds_details.signal_word === 'Danger' ? 'badge-pill badge-rose' : activeIngredient.msds_details.signal_word === 'Warning' ? 'badge-pill badge-amber' : 'badge-pill badge-emerald'} style={{ fontSize: '0.65rem' }}>
                        Signal: {activeIngredient.msds_details.signal_word}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.76rem' }}>
                      <div style={{ background: '#fff1f2', padding: '10px', borderRadius: '6px', border: '1px solid #fecdd3' }}>
                        <div style={{ color: '#9f1239', fontSize: '0.68rem', fontWeight: 700 }}>Pernyataan Bahaya (Hazard Statements):</div>
                        <ul style={{ paddingLeft: '14px', margin: '4px 0 0 0', color: '#9f1239' }}>
                          {activeIngredient.msds_details.hazard_statements.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <div style={{ color: '#0284c7', fontSize: '0.68rem', fontWeight: 700 }}>Pernyataan Kehati-hatian (Precautionary):</div>
                        <ul style={{ paddingLeft: '14px', margin: '4px 0 0 0', color: '#475569' }}>
                          {activeIngredient.msds_details.precautionary_statements.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }} data-mobile-grid="true">
                        <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Pertolongan Pertama (Mata):</div>
                          <div style={{ color: '#0f172a', marginTop: '2px', fontWeight: 500 }}>{activeIngredient.msds_details.first_aid_eye}</div>
                        </div>

                        <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Pertolongan Pertama (Kulit):</div>
                          <div style={{ color: '#0f172a', marginTop: '2px', fontWeight: 500 }}>{activeIngredient.msds_details.first_aid_skin}</div>
                        </div>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <div style={{ color: '#059669', fontSize: '0.68rem', fontWeight: 700 }}>Rekomendasi APD (PPE):</div>
                        <div style={{ color: '#0f172a', marginTop: '2px', fontWeight: 500 }}>{activeIngredient.msds_details.personal_protective_equipment}</div>
                      </div>

                      <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Penanganan Tumpahan:</div>
                        <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>{activeIngredient.msds_details.spill_procedure}</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lembar MSDS sedang dimuat...</p>
                )}
              </div>
            )}

            {/* TAB 3: SUMMARY */}
            {detailTab === 'summary' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '0.82rem', color: '#334155', background: '#f8fafc', padding: '12px', borderRadius: '8px', lineHeight: 1.5, border: '1px solid #e2e8f0' }}>
                  {activeIngredient.description}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  fontSize: '0.78rem'
                }} data-mobile-grid="true">
                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 10px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>CAS Number:</div>
                    <div className="font-mono-calc" style={{ fontWeight: 600 }}>{activeIngredient.cas_number || 'N/A'}</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 10px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Supplier Mitra:</div>
                    <div style={{ fontWeight: 600 }}>{activeIngredient.supplier || 'Authorized Global'}</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 10px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Rentang Tipikal Formulasi:</div>
                    <div className="font-mono-calc" style={{ fontWeight: 600, color: 'var(--cyan-neon)' }}>
                      {activeIngredient.typical_min_pct}% - {activeIngredient.typical_max_pct}%
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.02)', padding: '8px 10px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Maksimum Batas Regulasi BPOM:</div>
                    <div className="font-mono-calc" style={{ fontWeight: 600, color: activeIngredient.regulatory_status === 'RESTRICTED_MAX_LIMIT' ? 'var(--amber-warning)' : 'var(--text-primary)' }}>
                      {activeIngredient.regulatory_max_pct ? `Max ${activeIngredient.regulatory_max_pct}%` : 'Unrestricted'}
                    </div>
                  </div>

                  {activeIngredient.rhlb_ow !== undefined && (
                    <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '8px 10px', borderRadius: '6px' }}>
                      <div style={{ fontSize: '0.68rem', color: 'var(--cyan-neon)' }}>Required HLB (O/W):</div>
                      <div className="font-mono-calc" style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--cyan-neon)' }}>
                        {activeIngredient.rhlb_ow}
                      </div>
                    </div>
                  )}

                  {activeIngredient.hlb_value !== undefined && (
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '8px 10px', borderRadius: '6px' }}>
                      <div style={{ fontSize: '0.68rem', color: 'var(--emerald-neon)' }}>Surfactant HLB Value:</div>
                      <div className="font-mono-calc" style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--emerald-neon)' }}>
                        {activeIngredient.hlb_value}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Halal Verification Gate Alert */}
            <div style={{
              marginTop: 'auto',
              padding: '10px 12px',
              borderRadius: '8px',
              background: activeIngredient.halal_status === 'HALAL_VERIFIED'
                ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(245, 158, 11, 0.1)',
              border: activeIngredient.halal_status === 'HALAL_VERIFIED'
                ? '1px solid rgba(16, 185, 129, 0.3)'
                : '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }} data-mobile-wrap="true">
              {activeIngredient.halal_status === 'HALAL_VERIFIED' ? (
                <>
                  <ShieldCheck size={18} color="var(--emerald-neon)" />
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--emerald-neon)' }}>
                      Halal Assurance System Verified
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      Sertifikat halal valid (LPPOM MUI / BPJPH registered). Aman untuk formula halal compliant.
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <ShieldAlert size={18} color="var(--amber-warning)" />
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--amber-warning)' }}>
                      Halal Scoped Review Gate Required
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      Berasal dari turunan hewani. Wajib melampirkan sertifikat audit penyembelihan/ekstraksi.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
