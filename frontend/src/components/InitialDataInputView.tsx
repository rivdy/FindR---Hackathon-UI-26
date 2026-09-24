import React, { useState } from 'react';
import { LaboratoryIntro } from './ModuleHero';
import { ModuleVisual } from './ModuleVisual';
import { MotionControl } from './MotionControl';
import { QtppProfile, Ingredient } from '../types';
import { DEFAULT_QTPP, MOCK_INGREDIENTS } from '../data/mockData';
import {
  Sparkles,
  FileCheck2,
  UploadCloud,
  CheckCircle2,
  FileText,
  Check,
  RotateCcw,
  Search,
  Eye,
  CircleDashed,
  X,
  FlaskConical,
  ShieldCheck,
  Layers,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface InitialDataInputViewProps {
  onGenerateComplete: (qtpp: QtppProfile, selectedIngredients: string[]) => void;
}

const BLANK_QTPP: QtppProfile = {
  product_name: '',
  product_category: 'Moisturizer Cream / Gel-Cream (O/W Emulsion)',
  target_market: 'Indonesia / ASEAN Tropical Climate',
  target_ph_min: 5.5,
  target_ph_max: 6.0,
  target_viscosity_min: 18000,
  target_viscosity_max: 24000,
  sensory_target: '',
  target_cogs_max_idr: 85000,
  shelf_life_months: 24,
  halal_required: true,
  bpom_registered: true,
};

export const InitialDataInputView: React.FC<InitialDataInputViewProps> = ({ onGenerateComplete }) => {
  const [qtpp, setQtpp] = useState<QtppProfile>(BLANK_QTPP);
  const [selectedIngIds, setSelectedIngIds] = useState<string[]>([]);
  const [coaUploaded, setCoaUploaded] = useState(false);
  const [coaFileName, setCoaFileName] = useState('');
  const [halalUploaded, setHalalUploaded] = useState(false);
  const [halalFileName, setHalalFileName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [inspectedIng, setInspectedIng] = useState<Ingredient | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const isSection1Valid = Boolean(
    qtpp.product_name?.trim() &&
    qtpp.target_ph_min > 0 && qtpp.target_ph_max >= qtpp.target_ph_min &&
    qtpp.target_viscosity_min > 0 && qtpp.target_viscosity_max >= qtpp.target_viscosity_min &&
    qtpp.target_cogs_max_idr > 0 &&
    qtpp.sensory_target?.trim()
  );
  const isSection2Valid = selectedIngIds.length > 0;
  const isSection3Valid = coaUploaded && halalUploaded;
  const isFormValid = isSection1Valid && isSection2Valid && isSection3Valid;
  const completedCount = (isSection1Valid ? 1 : 0) + (isSection2Valid ? 1 : 0) + (isSection3Valid ? 1 : 0);

  const categoryOptions = [
    { label: 'Semua', value: 'ALL' },
    { label: 'pH Adjuster', value: 'pH adjuster' },
    { label: 'Viscosity', value: 'Viscosity' },
    { label: 'Antioxidant', value: 'Antioxidant' },
    { label: 'Solvent', value: 'Solvent' },
    { label: 'Anti-foaming', value: 'Anti-foaming' },
    { label: 'Pigment & Color', value: 'Pigment' },
    { label: 'Flavoring', value: 'Flavoring' },
    { label: 'Bahan Aktif', value: 'Active' },
    { label: 'Emollient', value: 'Emollient' },
    { label: 'Humektan', value: 'Humectant' },
    { label: 'Emulsifier', value: 'Emulsifying' },
    { label: 'Pengawet', value: 'Preservative' },
  ];

  const filteredIngredients = MOCK_INGREDIENTS.filter(ing => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q ||
      ing.inci_name.toLowerCase().includes(q) ||
      (ing.trade_name?.toLowerCase().includes(q)) ||
      (ing.cas_number?.includes(q));
    const matchCat = selectedCategory === 'ALL' ||
      ing.functions.some(f => f.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchSearch && matchCat;
  });

  const toggleIngredient = (id: string) =>
    setSelectedIngIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleApplyPreset = () => {
    setQtpp(DEFAULT_QTPP);
    setSelectedIngIds(['ing-1', 'ing-2', 'ing-3', 'ing-4', 'ing-5', 'ing-8', 'ing-9', 'ing-10', 'ing-12', 'ing-15']);
    setCoaUploaded(true);
    setCoaFileName('CoA_Niacinamide_PC_USP_Lot2026.pdf');
    setHalalUploaded(true);
    setHalalFileName('Sertifikat_Halal_BPJPH_MUI_2026.pdf');
  };

  const handleResetAll = () => {
    setQtpp(BLANK_QTPP);
    setSelectedIngIds([]);
    setCoaUploaded(false);
    setCoaFileName('');
    setHalalUploaded(false);
    setHalalFileName('');
  };

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setGenerationStep(1);
    setTimeout(() => setGenerationStep(2), 800);
    setTimeout(() => setGenerationStep(3), 1600);
    setTimeout(() => setGenerationStep(4), 2400);
    setTimeout(() => { setIsGenerating(false); onGenerateComplete(qtpp, selectedIngIds); }, 3200);
  };

  const generationSteps = [
    '',
    'Memindai batas regulasi BPOM & memverifikasi rantai sertifikasi Halal...',
    'Menghitung required HLB & mengoptimasi rasio dual-emulsifier...',
    'Menjalankan surrogate model GPR untuk prediksi viskositas, pH & stabilitas...',
    'Menyusun 5 kandidat formula dengan probabilitas tertinggi sesuai QTPP...',
  ];

  const inputSt: React.CSSProperties = {
    width: '100%', background: '#FAFBFE',
    border: '1px solid #E4E8EF', borderRadius: '10px',
    color: '#0F1C2E', padding: '10px 14px', fontSize: '0.8125rem',
    fontFamily: 'var(--font-body)', outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  };
  const numInputSt: React.CSSProperties = {
    ...inputSt, fontFamily: 'var(--font-data)', fontWeight: 500,
  };
  const labelSt: React.CSSProperties = {
    display: 'block', fontSize: '0.6875rem', fontWeight: 600,
    color: '#64748B', marginBottom: '6px', letterSpacing: '0.02em',
  };

  const cardSt = (valid: boolean): React.CSSProperties => ({
    background: '#FFFFFF',
    borderRadius: '16px',
    border: valid ? '1px solid #BDE4FF' : '1px solid #EDF0F4',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  });

  return (
    <div
      className="initial-input-page"
      style={{
        minHeight: '100vh',
        background: '#F7F8FA',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Sticky topbar */}
      <header
        className="initial-input-header"
        style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid #EDF0F4',
          height: '56px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 36px', gap: '16px',
        }}
      >
        {/* Logo + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }} data-mobile-wrap="true">
          <img src="/rangkai-logo.png" alt="rangkAI" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
          <div style={{ width: '1px', height: '20px', background: '#EDF0F4' }} />
          <div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F1C2E', letterSpacing: '-0.01em' }}>
              Formulasi Baru
            </div>
            <div style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '1px' }}>
              Siapkan QTPP, pilih bahan, unggah dokumen
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} data-mobile-wrap="true">
          <MotionControl />
          <button
            onClick={handleResetAll}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500,
              border: '1px solid #E4E8EF', background: '#FFFFFF', color: '#64748B',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            <RotateCcw size={12} /> Reset
          </button>
          <button
            onClick={handleApplyPreset}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
              border: '1px solid #BDE4FF', background: '#E5F6FF', color: '#144272',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            <Zap size={12} /> Isi cepat (demo)
          </button>
        </div>
      </header>

      {/* Page body */}
      <div className="initial-input-body" style={{ padding: '24px 36px 32px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
        <LaboratoryIntro />

        {/* Readiness bar - at top */}
        <div className="input-readiness" style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          border: isFormValid ? '1px solid #BDE4FF' : '1px solid #EDF0F4',
          padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: '20px',
          transition: 'border-color 0.2s',
        }} data-mobile-wrap="true">
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }} data-mobile-wrap="true">
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F1C2E' }}>Kesiapan simulasi</span>
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  padding: '2px 8px', borderRadius: '6px', fontSize: '0.6875rem', fontWeight: 500,
                  background: isFormValid ? '#E5F6FF' : '#F8F9FB',
                  color: isFormValid ? '#144272' : '#94A3B8',
                  border: isFormValid ? '1px solid #BDE4FF' : '1px solid #EDF0F4',
                }}
              >
                {isFormValid ? <><CheckCircle2 size={10} /> Siap</> : <><CircleDashed size={10} /> {completedCount}/3</>}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }} data-mobile-wrap="true">
              {[
                { label: 'Target kualitas', valid: isSection1Valid },
                { label: 'Bahan baku', valid: isSection2Valid },
                { label: 'Dokumen', valid: isSection3Valid },
              ].map((seg, i) => (
                <div key={i} style={{ flex: 1 }}>
                  <div style={{
                    height: '3px', borderRadius: '2px', marginBottom: '5px',
                    background: seg.valid ? '#144272' : '#EDF0F4',
                    transition: 'background 0.3s',
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} data-mobile-wrap="true">
                    {seg.valid && <Check size={10} style={{ color: '#144272', flexShrink: 0 }} />}
                    <span style={{ fontSize: '0.6875rem', color: seg.valid ? '#144272' : '#94A3B8', fontWeight: seg.valid ? 500 : 400 }}>
                      {seg.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Generate CTA */}
          <button
            onClick={handleStartGeneration}
            disabled={!isFormValid || isGenerating}
            style={{
              flexShrink: 0,
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '12px 28px', borderRadius: '12px',
              fontSize: '0.875rem', fontWeight: 600,
              background: isFormValid ? '#144272' : '#F0F2F5',
              color: isFormValid ? '#FFFFFF' : '#B0BCCB',
              border: 'none',
              boxShadow: isFormValid ? '0 2px 8px rgba(20, 66, 114, 0.25)' : 'none',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            {isFormValid ? <Sparkles size={15} /> : <CircleDashed size={15} />}
            Jalankan simulasi
            {isFormValid && <ChevronRight size={15} style={{ opacity: 0.7 }} />}
          </button>
        </div>

        {/* Section heading */}
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0F1C2E', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Inisialisasi formulasi
          </h2>
          <p style={{ fontSize: '0.8125rem', color: '#94A3B8', marginTop: '4px' }}>
            Lengkapi ketiga bagian di bawah ini sebelum menjalankan simulasi.
          </p>
        </div>

        {/* 3-col grid */}
        <div className="setup-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignItems: 'start' }} data-mobile-grid="true">

          {/* CARD 1: QTPP */}
          <div style={cardSt(isSection1Valid)}>
            <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid #F5F6F9' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} data-mobile-wrap="true">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} data-mobile-wrap="true">
                  <FlaskConical size={18} style={{ color: isSection1Valid ? '#144272' : '#94A3B8', flexShrink: 0, transition: 'color 0.2s' }} />
                  <div>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1C2E', lineHeight: 1.3 }}>Target kualitas produk</h3>
                    <p style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '2px' }}>Quality Target Product Profile (QTPP)</p>
                  </div>
                </div>
                <span
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    padding: '2px 8px', borderRadius: '6px', fontSize: '0.625rem', fontWeight: 500,
                    background: isSection1Valid ? '#E5F6FF' : '#F8F9FB',
                    color: isSection1Valid ? '#144272' : '#94A3B8',
                  }}
                >
                  {isSection1Valid ? <><CheckCircle2 size={9} /> Lengkap</> : <><CircleDashed size={9} /> Belum diisi</>}
                </span>
              </div>
            </div>

            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              <div>
                <label style={labelSt}>Nama produk <span style={{ color: '#E5534B' }}>*</span></label>
                <input type="text" placeholder="Contoh: Barrier Restore Daily Hydro-Moisturizer"
                  value={qtpp.product_name}
                  onChange={e => setQtpp({ ...qtpp, product_name: e.target.value })}
                  style={inputSt}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} data-mobile-grid="true">
                <div>
                  <label style={labelSt}>Target pH (min / maks)</label>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} data-mobile-wrap="true">
                    <input type="number" step="0.1" value={qtpp.target_ph_min}
                      onChange={e => setQtpp({ ...qtpp, target_ph_min: parseFloat(e.target.value) || 0 })}
                      style={{ ...numInputSt, width: '50%' }}
                    />
                    <span style={{ color: '#CBD5E1', fontSize: '0.75rem' }}>/</span>
                    <input type="number" step="0.1" value={qtpp.target_ph_max}
                      onChange={e => setQtpp({ ...qtpp, target_ph_max: parseFloat(e.target.value) || 0 })}
                      style={{ ...numInputSt, width: '50%' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelSt}>Viskositas cPs (min / maks)</label>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} data-mobile-wrap="true">
                    <input type="number" step="1000" value={qtpp.target_viscosity_min}
                      onChange={e => setQtpp({ ...qtpp, target_viscosity_min: parseFloat(e.target.value) || 0 })}
                      style={{ ...numInputSt, width: '50%' }}
                    />
                    <span style={{ color: '#CBD5E1', fontSize: '0.75rem' }}>/</span>
                    <input type="number" step="1000" value={qtpp.target_viscosity_max}
                      onChange={e => setQtpp({ ...qtpp, target_viscosity_max: parseFloat(e.target.value) || 0 })}
                      style={{ ...numInputSt, width: '50%' }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={labelSt}>Batas COGS bahan baku (IDR/kg)</label>
                <input type="number" step="5000" value={qtpp.target_cogs_max_idr}
                  onChange={e => setQtpp({ ...qtpp, target_cogs_max_idr: parseFloat(e.target.value) || 0 })}
                  style={numInputSt}
                />
              </div>

              <div>
                <label style={labelSt}>Target sensory & klaim <span style={{ color: '#E5534B' }}>*</span></label>
                <textarea rows={3}
                  placeholder="Contoh: Non-comedogenic, penyerapan cepat, finish matte ringan, efek soothing"
                  value={qtpp.sensory_target}
                  onChange={e => setQtpp({ ...qtpp, sensory_target: e.target.value })}
                  style={{ ...inputSt, resize: 'none', lineHeight: 1.5 }}
                />
              </div>
            </div>
          </div>

          {/* CARD 2: BAHAN */}
          <div style={{ ...cardSt(isSection2Valid), minHeight: '500px' }}>
            <div style={{ padding: '20px 20px 12px', borderBottom: '1px solid #F5F6F9' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }} data-mobile-wrap="true">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} data-mobile-wrap="true">
                  <Layers size={18} style={{ color: isSection2Valid ? '#144272' : '#94A3B8', flexShrink: 0, transition: 'color 0.2s' }} />
                  <div>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1C2E', lineHeight: 1.3 }}>Pilih bahan baku</h3>
                    <p style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '2px' }}>Katalog INCI dengan data CoA</p>
                  </div>
                </div>
                <span
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    padding: '2px 8px', borderRadius: '6px', fontSize: '0.625rem', fontWeight: 500,
                    background: isSection2Valid ? '#E5F6FF' : '#F8F9FB',
                    color: isSection2Valid ? '#144272' : '#94A3B8',
                  }}
                >
                  {isSection2Valid ? <><CheckCircle2 size={9} /> {selectedIngIds.length} bahan</> : <><CircleDashed size={9} /> Belum dipilih</>}
                </span>
              </div>

              {/* Search */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: '#FAFBFE', border: '1px solid #EDF0F4', borderRadius: '10px', padding: '8px 12px',
              }} data-mobile-wrap="true">
                <Search size={14} style={{ color: '#CBD5E1', flexShrink: 0 }} />
                <input type="text" placeholder="Cari INCI, trade name, CAS..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ background: 'transparent', border: 'none', outline: 'none', color: '#0F1C2E', fontSize: '0.8125rem', width: '100%', fontFamily: 'var(--font-body)' }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0, display: 'flex' }}>
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Category pills */}
            <div style={{ padding: '8px 16px', borderBottom: '1px solid #F5F6F9', display: 'flex', gap: '4px', flexWrap: 'wrap' }} data-mobile-wrap="true">
              {categoryOptions.map(cat => (
                <button key={cat.value} onClick={() => setSelectedCategory(cat.value)}
                  style={{
                    fontSize: '0.6875rem', padding: '3px 10px', borderRadius: '6px',
                    border: selectedCategory === cat.value ? '1px solid #BDE4FF' : '1px solid transparent',
                    background: selectedCategory === cat.value ? '#E5F6FF' : 'transparent',
                    color: selectedCategory === cat.value ? '#144272' : '#94A3B8',
                    fontWeight: selectedCategory === cat.value ? 600 : 400,
                    cursor: 'pointer', transition: 'all 0.12s',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick action row */}
            <div style={{ padding: '6px 16px', borderBottom: '1px solid #F5F6F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} data-mobile-wrap="true">
              <span style={{ fontSize: '0.6875rem', color: '#B0BCCB', fontFamily: 'var(--font-data)' }}>
                {filteredIngredients.length} tersedia · {selectedIngIds.length} terpilih
              </span>
              <div style={{ display: 'flex', gap: '4px' }} data-mobile-wrap="true">
                <button onClick={() => setSelectedIngIds(prev => Array.from(new Set([...prev, ...filteredIngredients.map(i => i.id)])))}
                  style={{
                    fontSize: '0.6875rem', padding: '3px 10px', borderRadius: '6px',
                    background: '#E5F6FF', border: '1px solid #BDE4FF', color: '#144272', fontWeight: 500, cursor: 'pointer',
                  }}>
                  Pilih semua
                </button>
                <button onClick={() => setSelectedIngIds([])}
                  style={{
                    fontSize: '0.6875rem', padding: '3px 10px', borderRadius: '6px',
                    background: '#FFFFFF', border: '1px solid #EDF0F4', color: '#94A3B8', cursor: 'pointer',
                  }}>
                  Bersihkan
                </button>
              </div>
            </div>

            {/* Ingredient list */}
            <div style={{ flex: 1, overflowY: 'auto', maxHeight: '340px', padding: '6px 10px 10px' }}>
              {filteredIngredients.length === 0 ? (
                <div style={{ padding: '28px 16px', textAlign: 'center', color: '#B0BCCB', fontSize: '0.8125rem' }}>
                  Tidak ada bahan yang cocok.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {filteredIngredients.map(ing => {
                    const sel = selectedIngIds.includes(ing.id);
                    const bpomOk = ing.regulatory_status === 'BPOM_COMPLIANT' || ing.regulatory_status === 'COSING_APPROVED';
                    return (
                      <div
                        key={ing.id}
                        onClick={() => toggleIngredient(ing.id)}
                        style={{
                          padding: '8px 10px', borderRadius: '10px', cursor: 'pointer',
                          border: sel ? '1px solid #BDE4FF' : '1px solid transparent',
                          background: sel ? '#F7FBF9' : 'transparent',
                          display: 'flex', alignItems: 'center', gap: '9px',
                          transition: 'all 0.12s',
                        }}
                        onMouseEnter={e => { if (!sel) (e.currentTarget as HTMLElement).style.background = '#FAFBFE'; }}
                        onMouseLeave={e => { if (!sel) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                       data-mobile-wrap="true">
                        <div style={{
                          width: '16px', height: '16px', borderRadius: '5px', flexShrink: 0,
                          border: sel ? 'none' : '1.5px solid #CBD5E1',
                          background: sel ? '#144272' : '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.12s',
                        }}>
                          {sel && <Check size={9} color="#fff" strokeWidth={3} />}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.8125rem', fontWeight: sel ? 600 : 500, color: sel ? '#0F1C2E' : '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {ing.inci_name}
                          </div>
                          <div style={{ fontSize: '0.6875rem', color: '#B0BCCB', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {ing.trade_name} · {ing.functions.slice(0, 2).join(', ')}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }} data-mobile-wrap="true">
                          <button
                            onClick={e => { e.stopPropagation(); setInspectedIng(ing); }}
                            style={{
                              padding: '2px 8px', background: '#FAFBFE', border: '1px solid #EDF0F4',
                              borderRadius: '6px', fontSize: '0.625rem', color: '#64748B',
                              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 500,
                            }}
                          >
                            <Eye size={9} /> CoA
                          </button>
                          <span className={bpomOk ? 'badge-pill badge-clear' : 'badge-pill badge-review'}>
                            {bpomOk ? 'BPOM ' : 'Limit'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* CARD 3: DOKUMEN */}
          <div style={cardSt(isSection3Valid)}>
            <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid #F5F6F9' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }} data-mobile-wrap="true">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} data-mobile-wrap="true">
                  <ShieldCheck size={18} style={{ color: isSection3Valid ? '#144272' : '#94A3B8', flexShrink: 0, transition: 'color 0.2s' }} />
                  <div>
                    <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1C2E', lineHeight: 1.3 }}>Verifikasi dokumen</h3>
                    <p style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '2px' }}>Unggah CoA & sertifikat Halal</p>
                  </div>
                </div>
                <span
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    padding: '2px 8px', borderRadius: '6px', fontSize: '0.625rem', fontWeight: 500,
                    background: isSection3Valid ? '#E5F6FF' : '#F8F9FB',
                    color: isSection3Valid ? '#144272' : '#94A3B8',
                  }}
                >
                  {isSection3Valid ? <><CheckCircle2 size={9} /> Terverifikasi</> : <><CircleDashed size={9} /> Belum diunggah</>}
                </span>
              </div>
            </div>

            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* CoA dropzone */}
              <div style={{
                borderRadius: '12px', padding: '14px',
                background: coaUploaded ? '#F7FBF9' : '#FAFBFE',
                border: coaUploaded ? '1px solid #BDE4FF' : '1px dashed #D8DEE8',
                transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }} data-mobile-wrap="true">
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F1C2E' }}>
                      CoA / MSDS bahan baku <span style={{ color: '#E5534B' }}>*</span>
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '2px' }}>
                      Certificate of Analysis atau Material Safety Data Sheet
                    </div>
                  </div>
                  {coaUploaded && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '3px',
                      fontSize: '0.625rem', fontWeight: 500, color: '#144272',
                    }}>
                      <CheckCircle2 size={9} /> Valid
                    </span>
                  )}
                </div>

                {coaUploaded ? (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#fff', borderRadius: '8px', padding: '8px 12px', border: '1px solid #E8ECF1',
                  }} data-mobile-wrap="true">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', overflow: 'hidden' }} data-mobile-wrap="true">
                      <FileText size={13} style={{ color: '#144272', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{coaFileName}</span>
                    </div>
                    <button onClick={() => { setCoaUploaded(false); setCoaFileName(''); }}
                      style={{ background: 'none', border: 'none', color: '#B0BCCB', cursor: 'pointer', padding: '2px', display: 'flex', borderRadius: '4px', flexShrink: 0 }}>
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <label style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                    padding: '10px', background: '#fff', borderRadius: '8px',
                    fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', color: '#64748B', border: '1px solid #EDF0F4',
                    transition: 'border-color 0.15s',
                  }}>
                    <UploadCloud size={14} style={{ color: '#B0BCCB' }} /> Unggah CoA / MSDS
                    <input type="file" accept=".pdf,.doc,.docx" onChange={e => { if (e.target.files?.[0]) { setCoaFileName(e.target.files[0].name); setCoaUploaded(true); } }} style={{ display: 'none' }} />
                  </label>
                )}
              </div>

              {/* Halal dropzone */}
              <div style={{
                borderRadius: '12px', padding: '14px',
                background: halalUploaded ? '#F7FBF9' : '#FAFBFE',
                border: halalUploaded ? '1px solid #BDE4FF' : '1px dashed #D8DEE8',
                transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }} data-mobile-wrap="true">
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0F1C2E' }}>
                      Sertifikat Halal BPJPH / MUI <span style={{ color: '#E5534B' }}>*</span>
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#94A3B8', marginTop: '2px' }}>
                      Sertifikasi resmi BPJPH atau LPPOM MUI
                    </div>
                  </div>
                  {halalUploaded && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '3px',
                      fontSize: '0.625rem', fontWeight: 500, color: '#144272',
                    }}>
                      <CheckCircle2 size={9} /> Valid
                    </span>
                  )}
                </div>

                {halalUploaded ? (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#fff', borderRadius: '8px', padding: '8px 12px', border: '1px solid #E8ECF1',
                  }} data-mobile-wrap="true">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', overflow: 'hidden' }} data-mobile-wrap="true">
                      <FileText size={13} style={{ color: '#144272', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{halalFileName}</span>
                    </div>
                    <button onClick={() => { setHalalUploaded(false); setHalalFileName(''); }}
                      style={{ background: 'none', border: 'none', color: '#B0BCCB', cursor: 'pointer', padding: '2px', display: 'flex', borderRadius: '4px', flexShrink: 0 }}>
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <label style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                    padding: '10px', background: '#fff', borderRadius: '8px',
                    fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', color: '#64748B', border: '1px solid #EDF0F4',
                    transition: 'border-color 0.15s',
                  }}>
                    <UploadCloud size={14} style={{ color: '#B0BCCB' }} /> Unggah Sertifikat Halal
                    <input type="file" accept=".pdf,.jpg,.png" onChange={e => { if (e.target.files?.[0]) { setHalalFileName(e.target.files[0].name); setHalalUploaded(true); } }} style={{ display: 'none' }} />
                  </label>
                )}
              </div>

              {/* AI Extraction panel */}
              {coaUploaded && (
                <div style={{ background: '#F8FAFF', border: '1px solid #E4ECF7', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3B6FA0', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }} data-mobile-wrap="true">
                    <FileCheck2 size={13} /> Ekstraksi otomatis dari CoA
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', fontSize: '0.6875rem' }} data-mobile-grid="true">
                    {[['Lot', 'LOT-NIA-20260810-USP'], ['Kemurnian', '99.6% (HPLC)'], ['Logam berat', '<10 ppm'], ['TPC mikroba', '<100 CFU/g'], ['GHS', 'Cat 2A Irritation'], ['Halal ID', 'ID00410000287190']].map(([k, v]) => (
                      <div key={k} style={{ color: '#64748B' }}>{k}: <strong style={{ color: '#0F1C2E', fontFamily: 'var(--font-data)', fontSize: '0.65rem' }}>{v}</strong></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CoA Inspection Modal */}
      {inspectedIng && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1100,
          background: 'rgba(15,28,46,0.4)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
        }}>
          <div style={{
            background: '#fff', borderRadius: '20px', maxWidth: '520px', width: '100%',
            maxHeight: '85vh', overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            border: '1px solid #EDF0F4',
          }}>
            <div style={{ padding: '22px 24px 14px', borderBottom: '1px solid #F5F6F9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} data-mobile-wrap="true">
                <div>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 500, color: '#94A3B8' }}>CoA / MSDS</div>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#0F1C2E', marginTop: '2px', letterSpacing: '-0.01em' }}>
                    {inspectedIng.inci_name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
                    {inspectedIng.trade_name} · CAS: {inspectedIng.cas_number || 'N/A'}
                  </p>
                </div>
                <button onClick={() => setInspectedIng(null)}
                  style={{ background: '#F5F6F9', border: 'none', color: '#94A3B8', borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex' }}>
                  <X size={14} />
                </button>
              </div>
            </div>

            <div style={{ padding: '18px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#F8F9FB', borderRadius: '12px', padding: '14px', border: '1px solid #EDF0F4' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#144272', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }} data-mobile-wrap="true">
                  <FileCheck2 size={13} /> Parameter uji mutu (Lot: {inspectedIng.coa_details?.lot_number || 'REG-2026'})
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px', fontSize: '0.75rem' }} data-mobile-grid="true">
                  <div style={{ color: '#64748B' }}>Pemerian: <strong style={{ color: '#0F1C2E' }}>{inspectedIng.coa_details?.appearance}</strong></div>
                  <div style={{ color: '#64748B' }}>Kemurnian: <strong style={{ color: '#144272', fontFamily: 'var(--font-data)' }}>{inspectedIng.coa_details?.assay_purity_pct}%</strong></div>
                  <div style={{ color: '#64748B' }}>Logam berat: <strong style={{ color: '#3B6FA0', fontFamily: 'var(--font-data)' }}>{inspectedIng.coa_details?.heavy_metals_ppm}</strong></div>
                  <div style={{ color: '#64748B' }}>TPC mikroba: <strong style={{ color: '#0F1C2E', fontFamily: 'var(--font-data)' }}>{inspectedIng.coa_details?.microbial_alt}</strong></div>
                  <div style={{ color: '#64748B' }}>Patogen: <strong style={{ color: '#144272' }}>{inspectedIng.coa_details?.pathogens}</strong></div>
                  <div style={{ color: '#64748B' }}>pH 1%: <strong style={{ color: '#0F1C2E', fontFamily: 'var(--font-data)' }}>{inspectedIng.coa_details?.ph_solution_1pct ?? '6.5'}</strong></div>
                </div>
              </div>

              {inspectedIng.msds_details && (
                <div style={{ background: '#F8FAFF', borderRadius: '12px', padding: '14px', border: '1px solid #E4ECF7' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3B6FA0', marginBottom: '9px' }}>Keselamatan bahan (MSDS)</div>
                  <div style={{ fontSize: '0.75rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div>GHS: <strong>{inspectedIng.msds_details.ghs_classification}</strong> ({inspectedIng.msds_details.signal_word})</div>
                    <div>Bahaya: {inspectedIng.msds_details.hazard_statements.join('; ')}</div>
                    <div>APD: <strong style={{ color: '#0F1C2E' }}>{inspectedIng.msds_details.personal_protective_equipment}</strong></div>
                    <div>P3K: {inspectedIng.msds_details.first_aid_eye}</div>
                  </div>
                </div>
              )}

              <button
                onClick={() => { toggleIngredient(inspectedIng.id); setInspectedIng(null); }}
                style={{
                  width: '100%', padding: '12px', borderRadius: '12px',
                  fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', border: 'none',
                  background: selectedIngIds.includes(inspectedIng.id)
                    ? '#FEF2F0' : '#144272',
                  color: selectedIngIds.includes(inspectedIng.id) ? '#E5534B' : '#ffffff',
                  boxShadow: selectedIngIds.includes(inspectedIng.id) ? 'none' : '0 2px 8px rgba(26,107,90,0.2)',
                  transition: 'all 0.15s',
                }}
              >
                {selectedIngIds.includes(inspectedIng.id) ? 'Hapus dari formula' : 'Tambahkan ke formula'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generation overlay - modern AI shimmer */}
      {isGenerating && (
        <div className="generation-overlay" role="dialog" aria-modal="true" aria-labelledby="generation-title" aria-busy="true" style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px',
        }}>
          <div style={{
            maxWidth: '440px', width: '100%',
            textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px',
          }}>
            <ModuleVisual kind={generationStep === 1 ? 'regulation' : generationStep === 3 ? 'cpp' : 'formulasi'} />

            {/* Shimmer title */}
            <div>
              <h3 id="generation-title" className="gen-shimmer-text" style={{
                fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}>
                Memproses Simulasi
              </h3>
            </div>

            {/* Step description with slide-up animation */}
            <div style={{ minHeight: '48px', overflow: 'hidden', position: 'relative', maxWidth: '360px' }}>
              <p
                key={generationStep}
                className="gen-slide-up" role="status" aria-live="polite"
                style={{
                  fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.6,
                }}
              >
                {generationSteps[generationStep]}
              </p>
            </div>

            {/* Step indicators */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} data-mobile-wrap="true">
              {[1, 2, 3, 4].map(step => (
                <div key={step} style={{
                  width: step <= generationStep ? '28px' : '8px',
                  height: '4px',
                  borderRadius: '2px',
                  background: step <= generationStep ? '#144272' : '#E4E8EF',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }} />
              ))}
            </div>

            <p style={{ fontSize: '0.6875rem', color: '#CBD5E1', maxWidth: '300px', lineHeight: 1.5 }}>
              Memproses 30.175 katalog INCI, 100 korpus stabilitas ilmiah, dan kalkulasi aljabar HLB.
            </p>
          </div>

          <style>{`
            @keyframes shimmer {
              0% { background-position: -200% center; }
              100% { background-position: 200% center; }
            }
            .gen-shimmer-text {
              background: linear-gradient(
                90deg,
                #0F1C2E 0%,
                #0F1C2E 35%,
                #144272 50%,
                #0F1C2E 65%,
                #0F1C2E 100%
              );
              background-size: 200% 100%;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              animation: shimmer 2s ease-in-out infinite;
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(16px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .gen-slide-up {
              animation: slideUp 0.4s ease-out both;
            }
            @keyframes pulseRing {
              0% { transform: scale(0.85); opacity: 0.6; }
              50% { transform: scale(1); opacity: 0.2; }
              100% { transform: scale(0.85); opacity: 0.6; }
            }
            .gen-pulse-ring {
              position: absolute;
              inset: 0;
              border-radius: 22px;
              border: 2px solid #144272;
              animation: pulseRing 2s ease-in-out infinite;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};
