import React, { useState } from 'react';
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
    setTimeout(() => setGenerationStep(2), 700);
    setTimeout(() => setGenerationStep(3), 1400);
    setTimeout(() => setGenerationStep(4), 2100);
    setTimeout(() => { setIsGenerating(false); onGenerateComplete(qtpp, selectedIngIds); }, 2800);
  };

  const generationSteps = [
    '',
    'Memindai batas regulasi BPOM & memverifikasi rantai sertifikasi Halal...',
    'Menghitung required HLB & mengoptimasi rasio dual-emulsifier...',
    'Menjalankan surrogate model GPR untuk prediksi viskositas, pH & stabilitas...',
    'Menyusun 5 kandidat formula dengan probabilitas tertinggi sesuai QTPP...',
  ];

  // ─── Shared style helpers ───
  const inputSt: React.CSSProperties = {
    width: '100%', background: '#fff',
    border: '1.5px solid #C8D2DE', borderRadius: '8px',
    color: '#0F1C2E', padding: '9px 12px', fontSize: '0.875rem',
    fontFamily: 'var(--font-body)', outline: 'none',
  };
  const numInputSt: React.CSSProperties = {
    ...inputSt, fontFamily: 'var(--font-data)', fontWeight: 500, fontSize: '0.875rem',
  };
  const labelSt: React.CSSProperties = {
    display: 'block', fontSize: '0.72rem', fontWeight: 600,
    color: '#64748B', marginBottom: '5px', letterSpacing: '0.03em',
  };

  // Card wrapper — each section
  const cardSt = (valid: boolean): React.CSSProperties => ({
    background: '#fff',
    borderRadius: '14px',
    border: valid ? '1.5px solid #A8DACC' : '1.5px solid #E4E8EF',
    boxShadow: '0 1px 3px rgba(15,28,46,0.05), 0 4px 16px rgba(15,28,46,0.04)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'border-color 0.25s',
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--surface-ground)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Sticky topbar for the onboarding view ── */}
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(255,255,255,0.94)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid #E4E8EF',
          height: '56px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px', gap: '16px',
        }}
      >
        {/* Logo + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src="/rangkai-logo.png" alt="rangkAI" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
          <div style={{ width: '1px', height: '22px', background: '#E4E8EF' }} />
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F1C2E', letterSpacing: '-0.01em' }}>
              Formulasi Baru
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '1px' }}>
              Siapkan QTPP, pilih bahan, unggah dokumen CoA & Halal
            </div>
          </div>
        </div>

        {/* Stepper — compact progress in header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {[
            { label: 'Target kualitas', valid: isSection1Valid },
            { label: 'Bahan baku', valid: isSection2Valid },
            { label: 'Dokumen', valid: isSection3Valid },
          ].map((step, i) => {
            const done = step.valid;
            const next = !done && i === completedCount;
            return (
              <React.Fragment key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div
                    style={{
                      width: '22px', height: '22px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', fontWeight: 700,
                      background: done ? '#1A6B5A' : next ? '#EAF4F2' : '#F5F6F9',
                      color: done ? '#fff' : next ? '#1A6B5A' : '#94A3B8',
                      border: done ? 'none' : next ? '1.5px solid #A8DACC' : '1.5px solid #E4E8EF',
                      transition: 'all 0.25s',
                      flexShrink: 0,
                    }}
                  >
                    {done ? <Check size={11} strokeWidth={2.5} /> : i + 1}
                  </div>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: done ? 600 : 400,
                    color: done ? '#1A6B5A' : next ? '#3D5166' : '#94A3B8',
                    whiteSpace: 'nowrap',
                  }}>
                    {step.label}
                  </span>
                </div>
                {i < 2 && (
                  <div style={{ width: '20px', height: '1.5px', background: step.valid ? '#A8DACC' : '#E4E8EF', borderRadius: '1px', transition: 'background 0.3s' }} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={handleResetAll}
            className="btn-ghost"
            style={{ fontSize: '0.75rem', padding: '5px 12px' }}
          >
            <RotateCcw size={13} /> Reset
          </button>
          <button
            onClick={handleApplyPreset}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '7px', fontSize: '0.75rem', fontWeight: 600,
              border: '1.5px solid #A8DACC', background: '#F0FAF7', color: '#1A6B5A',
              cursor: 'pointer', transition: 'background 0.12s',
            }}
          >
            <Sparkles size={13} /> Muat preset moisturizer
          </button>
        </div>
      </header>

      {/* ── Page body ── */}
      <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>

        {/* Section heading */}
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F1C2E', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Inisialisasi formulasi
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '5px' }}>
            Tiga langkah ini menjadi fondasi dari seluruh prediksi dan evaluasi rangkAI. Isi semua bagian sebelum menjalankan simulasi.
          </p>
        </div>

        {/* ── 3-col grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', alignItems: 'start' }}>

          {/* ─── CARD 1: QTPP ─── */}
          <div style={cardSt(isSection1Valid)}>
            {/* Accent bar encodes completion state */}
            <div style={{ height: '3px', background: isSection1Valid ? '#1A6B5A' : '#2A9D8F', opacity: isSection1Valid ? 1 : 0.35 }} />

            <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#EAF4F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FlaskConical size={17} style={{ color: '#1A6B5A' }} />
                  </div>
                  <div>
                    <div style={labelSt}>Langkah 1</div>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F1C2E', lineHeight: 1.3 }}>Target kualitas produk</h3>
                  </div>
                </div>
                <span className={`badge ${isSection1Valid ? 'badge-clear' : 'badge-pending'}`}>
                  {isSection1Valid ? <><CheckCircle2 size={10} /> Lengkap</> : <><CircleDashed size={10} /> Belum diisi</>}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '8px' }}>
                Quality Target Product Profile — parameter mutu akhir yang ingin dicapai.
              </p>
            </div>

            <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              <div>
                <label style={labelSt}>Nama produk <span style={{ color: '#C55242' }}>*</span></label>
                <input type="text" placeholder="Contoh: Barrier Restore Daily Hydro-Moisturizer"
                  value={qtpp.product_name}
                  onChange={e => setQtpp({ ...qtpp, product_name: e.target.value })}
                  style={inputSt}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelSt}>Target pH (min – maks)</label>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <input type="number" step="0.1" value={qtpp.target_ph_min}
                      onChange={e => setQtpp({ ...qtpp, target_ph_min: parseFloat(e.target.value) || 0 })}
                      style={{ ...numInputSt, width: '50%' }}
                    />
                    <span style={{ color: '#C8D2DE', fontSize: '0.875rem' }}>–</span>
                    <input type="number" step="0.1" value={qtpp.target_ph_max}
                      onChange={e => setQtpp({ ...qtpp, target_ph_max: parseFloat(e.target.value) || 0 })}
                      style={{ ...numInputSt, width: '50%' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelSt}>Viskositas cPs (min – maks)</label>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <input type="number" step="1000" value={qtpp.target_viscosity_min}
                      onChange={e => setQtpp({ ...qtpp, target_viscosity_min: parseFloat(e.target.value) || 0 })}
                      style={{ ...numInputSt, width: '50%' }}
                    />
                    <span style={{ color: '#C8D2DE', fontSize: '0.875rem' }}>–</span>
                    <input type="number" step="1000" value={qtpp.target_viscosity_max}
                      onChange={e => setQtpp({ ...qtpp, target_viscosity_max: parseFloat(e.target.value) || 0 })}
                      style={{ ...numInputSt, width: '50%' }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label style={labelSt}>Batas COGS bahan baku (IDR / kg)</label>
                <input type="number" step="5000" value={qtpp.target_cogs_max_idr}
                  onChange={e => setQtpp({ ...qtpp, target_cogs_max_idr: parseFloat(e.target.value) || 0 })}
                  style={numInputSt}
                />
              </div>

              <div>
                <label style={labelSt}>Target sensory & klaim <span style={{ color: '#C55242' }}>*</span></label>
                <textarea rows={3}
                  placeholder="Contoh: Non-comedogenic, penyerapan cepat, finish matte ringan, efek soothing"
                  value={qtpp.sensory_target}
                  onChange={e => setQtpp({ ...qtpp, sensory_target: e.target.value })}
                  style={{ ...inputSt, resize: 'none', lineHeight: 1.5 }}
                />
              </div>
            </div>
          </div>

          {/* ─── CARD 2: BAHAN ─── */}
          <div style={{ ...cardSt(isSection2Valid), minHeight: '500px' }}>
            <div style={{ height: '3px', background: isSection2Valid ? '#1A6B5A' : '#7B6FA0', opacity: isSection2Valid ? 1 : 0.35 }} />

            <div style={{ padding: '18px 20px 12px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#F3F0FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Layers size={17} style={{ color: '#7B6FA0' }} />
                  </div>
                  <div>
                    <div style={labelSt}>Langkah 2</div>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F1C2E', lineHeight: 1.3 }}>Pilih bahan baku</h3>
                  </div>
                </div>
                <span className={`badge ${isSection2Valid ? 'badge-clear' : 'badge-pending'}`}>
                  {isSection2Valid ? <><CheckCircle2 size={10} /> {selectedIngIds.length} bahan</> : <><CircleDashed size={10} /> Belum dipilih</>}
                </span>
              </div>

              {/* Search */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', border: '1.5px solid #E4E8EF', borderRadius: '8px', padding: '7px 11px' }}>
                <Search size={14} style={{ color: '#94A3B8', flexShrink: 0 }} />
                <input type="text" placeholder="Cari INCI, trade name, CAS number..."
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
            <div style={{ padding: '8px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {categoryOptions.map(cat => (
                <button key={cat.value} onClick={() => setSelectedCategory(cat.value)}
                  style={{
                    fontSize: '0.68rem', padding: '3px 9px', borderRadius: '5px',
                    border: selectedCategory === cat.value ? '1.5px solid #A8DACC' : '1.5px solid #E4E8EF',
                    background: selectedCategory === cat.value ? '#EAF4F2' : '#fff',
                    color: selectedCategory === cat.value ? '#1A6B5A' : '#64748B',
                    fontWeight: selectedCategory === cat.value ? 700 : 400,
                    cursor: 'pointer', transition: 'all 0.1s',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick action row */}
            <div style={{ padding: '6px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontFamily: 'var(--font-data)' }}>
                {filteredIngredients.length} tersedia  ·  {selectedIngIds.length} terpilih
              </span>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={() => setSelectedIngIds(prev => Array.from(new Set([...prev, ...filteredIngredients.map(i => i.id)])))}
                  style={{ fontSize: '0.68rem', padding: '3px 9px', borderRadius: '5px', background: '#EAF4F2', border: '1px solid #A8DACC', color: '#1A6B5A', fontWeight: 600, cursor: 'pointer' }}>
                  Pilih semua hasil filter
                </button>
                <button onClick={() => setSelectedIngIds([])}
                  style={{ fontSize: '0.68rem', padding: '3px 9px', borderRadius: '5px', background: '#F5F6F9', border: '1px solid #E4E8EF', color: '#64748B', cursor: 'pointer' }}>
                  Bersihkan
                </button>
              </div>
            </div>

            {/* Ingredient list */}
            <div style={{ flex: 1, overflowY: 'auto', maxHeight: '340px', padding: '8px 12px 12px' }}>
              {filteredIngredients.length === 0 ? (
                <div style={{ padding: '28px 16px', textAlign: 'center', color: '#94A3B8', fontSize: '0.8125rem' }}>
                  Tidak ada bahan yang cocok.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {filteredIngredients.map(ing => {
                    const sel = selectedIngIds.includes(ing.id);
                    const bpomOk = ing.regulatory_status === 'BPOM_COMPLIANT' || ing.regulatory_status === 'COSING_APPROVED';
                    return (
                      <div
                        key={ing.id}
                        onClick={() => toggleIngredient(ing.id)}
                        style={{
                          padding: '8px 10px', borderRadius: '9px', cursor: 'pointer',
                          border: sel ? '1.5px solid #A8DACC' : '1.5px solid transparent',
                          background: sel ? '#F0FAF7' : '#F8FAFC',
                          display: 'flex', alignItems: 'center', gap: '9px',
                          transition: 'background 0.1s, border-color 0.1s',
                        }}
                        onMouseEnter={e => { if (!sel) (e.currentTarget as HTMLElement).style.background = '#F1F5F9'; }}
                        onMouseLeave={e => { if (!sel) (e.currentTarget as HTMLElement).style.background = '#F8FAFC'; }}
                      >
                        {/* Checkbox */}
                        <div style={{
                          width: '17px', height: '17px', borderRadius: '4px', flexShrink: 0,
                          border: sel ? 'none' : '1.5px solid #C8D2DE',
                          background: sel ? '#1A6B5A' : '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.12s',
                        }}>
                          {sel && <Check size={10} color="#fff" strokeWidth={3} />}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.8125rem', fontWeight: sel ? 700 : 500, color: sel ? '#0F3D30' : '#1E293B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {ing.inci_name}
                          </div>
                          <div style={{ fontSize: '0.66rem', color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {ing.trade_name} · {ing.functions.slice(0, 2).join(', ')}
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                          <button
                            onClick={e => { e.stopPropagation(); setInspectedIng(ing); }}
                            style={{
                              padding: '2px 7px', background: '#fff', border: '1px solid #E4E8EF',
                              borderRadius: '5px', fontSize: '0.62rem', color: '#64748B',
                              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', fontWeight: 600,
                            }}
                          >
                            <Eye size={9} /> CoA
                          </button>
                          <span className={`badge ${bpomOk ? 'badge-clear' : 'badge-review'}`} style={{ fontSize: '0.6rem', padding: '1px 6px' }}>
                            {bpomOk ? 'BPOM ✓' : 'Limit'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* ─── CARD 3: DOKUMEN ─── */}
          <div style={cardSt(isSection3Valid)}>
            <div style={{ height: '3px', background: isSection3Valid ? '#1A6B5A' : '#E8A340', opacity: isSection3Valid ? 1 : 0.45 }} />

            <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#FEF9EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={17} style={{ color: '#D4860A' }} />
                  </div>
                  <div>
                    <div style={labelSt}>Langkah 3</div>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F1C2E', lineHeight: 1.3 }}>Verifikasi dokumen</h3>
                  </div>
                </div>
                <span className={`badge ${isSection3Valid ? 'badge-clear' : 'badge-pending'}`}>
                  {isSection3Valid ? <><CheckCircle2 size={10} /> Terverifikasi</> : <><CircleDashed size={10} /> Belum diunggah</>}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '8px' }}>
                rangkAI mengekstrak parameter CoA & memvalidasi rantai sertifikasi Halal secara otomatis.
              </p>
            </div>

            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* CoA dropzone */}
              <div style={{
                borderRadius: '10px', padding: '14px',
                background: coaUploaded ? '#F0FAF7' : '#FAFBFE',
                border: coaUploaded ? '1.5px solid #A8DACC' : '1.5px dashed #C8D2DE',
                transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F1C2E' }}>
                      CoA / MSDS bahan baku <span style={{ color: '#C55242' }}>*</span>
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '2px' }}>
                      Certificate of Analysis atau Material Safety Data Sheet
                    </div>
                  </div>
                  {coaUploaded && <span className="badge badge-clear" style={{ fontSize: '0.65rem' }}><CheckCircle2 size={9} /> Valid</span>}
                </div>

                {coaUploaded ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderRadius: '7px', padding: '7px 10px', border: '1px solid #A8DACC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', overflow: 'hidden' }}>
                      <FileText size={13} style={{ color: '#1A6B5A', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0F3D30', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{coaFileName}</span>
                    </div>
                    <button onClick={() => { setCoaUploaded(false); setCoaFileName(''); }}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px', display: 'flex', borderRadius: '4px', flexShrink: 0 }}>
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <label style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                    padding: '9px', background: '#fff', borderRadius: '7px',
                    fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', color: '#64748B', border: '1px solid #E4E8EF',
                  }}>
                    <UploadCloud size={14} style={{ color: '#94A3B8' }} /> Unggah CoA / MSDS
                    <input type="file" accept=".pdf,.doc,.docx" onChange={e => { if (e.target.files?.[0]) { setCoaFileName(e.target.files[0].name); setCoaUploaded(true); } }} style={{ display: 'none' }} />
                  </label>
                )}
              </div>

              {/* Halal dropzone */}
              <div style={{
                borderRadius: '10px', padding: '14px',
                background: halalUploaded ? '#F0FAF7' : '#FAFBFE',
                border: halalUploaded ? '1.5px solid #A8DACC' : '1.5px dashed #C8D2DE',
                transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F1C2E' }}>
                      Sertifikat Halal BPJPH / MUI <span style={{ color: '#C55242' }}>*</span>
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '2px' }}>
                      Sertifikasi resmi BPJPH atau LPPOM MUI
                    </div>
                  </div>
                  {halalUploaded && <span className="badge badge-clear" style={{ fontSize: '0.65rem' }}><CheckCircle2 size={9} /> Valid</span>}
                </div>

                {halalUploaded ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderRadius: '7px', padding: '7px 10px', border: '1px solid #A8DACC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', overflow: 'hidden' }}>
                      <FileText size={13} style={{ color: '#1A6B5A', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0F3D30', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{halalFileName}</span>
                    </div>
                    <button onClick={() => { setHalalUploaded(false); setHalalFileName(''); }}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px', display: 'flex', borderRadius: '4px', flexShrink: 0 }}>
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <label style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                    padding: '9px', background: '#fff', borderRadius: '7px',
                    fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', color: '#64748B', border: '1px solid #E4E8EF',
                  }}>
                    <UploadCloud size={14} style={{ color: '#94A3B8' }} /> Unggah Sertifikat Halal
                    <input type="file" accept=".pdf,.jpg,.png" onChange={e => { if (e.target.files?.[0]) { setHalalFileName(e.target.files[0].name); setHalalUploaded(true); } }} style={{ display: 'none' }} />
                  </label>
                )}
              </div>

              {/* AI Extraction panel — only when CoA uploaded */}
              {coaUploaded && (
                <div style={{ background: '#F5F8FF', border: '1px solid #D6E4F5', borderRadius: '10px', padding: '13px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2A6B9D', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '9px' }}>
                    <FileCheck2 size={13} /> Ekstraksi otomatis dari CoA:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', fontSize: '0.72rem' }}>
                    {[['Lot', 'LOT-NIA-20260810-USP'], ['Kemurnian', '99.6% (HPLC)'], ['Logam berat', '<10 ppm'], ['TPC mikroba', '<100 CFU/g'], ['GHS', 'Cat 2A Irritation'], ['Halal ID', 'ID00410000287190']].map(([k, v]) => (
                      <div key={k} style={{ color: '#3D5166' }}>{k}: <strong style={{ color: '#0F1C2E', fontFamily: 'var(--font-data)', fontSize: '0.68rem' }}>{v}</strong></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Generate action bar ── */}
        <div style={{
          background: '#fff',
          borderRadius: '14px',
          border: isFormValid ? '1.5px solid #A8DACC' : '1.5px solid #E4E8EF',
          boxShadow: isFormValid ? '0 4px 20px rgba(26,107,90,0.08), 0 1px 4px rgba(0,0,0,0.04)' : '0 1px 3px rgba(0,0,0,0.04)',
          padding: '20px 24px',
          display: 'flex', alignItems: 'center', gap: '28px',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}>
          {/* Progress info */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F1C2E' }}>Kesiapan simulasi</span>
              <span className={`badge ${isFormValid ? 'badge-clear' : 'badge-pending'}`}>
                {isFormValid ? <><CheckCircle2 size={10} /> Siap jalankan simulasi</> : <><CircleDashed size={10} /> {completedCount}/3 langkah selesai</>}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { label: 'Target kualitas', valid: isSection1Valid },
                { label: 'Bahan baku', valid: isSection2Valid },
                { label: 'CoA & Halal', valid: isSection3Valid },
              ].map((seg, i) => (
                <div key={i} style={{ flex: 1 }}>
                  <div style={{
                    height: '4px', borderRadius: '3px', marginBottom: '4px',
                    background: seg.valid ? '#1A6B5A' : '#E4E8EF',
                    transition: 'background 0.3s',
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {seg.valid && <Check size={10} style={{ color: '#1A6B5A', flexShrink: 0 }} />}
                    <span style={{ fontSize: '0.68rem', color: seg.valid ? '#1A6B5A' : '#94A3B8', fontWeight: seg.valid ? 600 : 400 }}>
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
              display: 'flex', alignItems: 'center', gap: '9px',
              padding: '14px 32px', borderRadius: '11px',
              fontSize: '0.9375rem', fontWeight: 700,
              letterSpacing: '-0.01em',
              background: isFormValid
                ? 'linear-gradient(135deg, #0F3D30 0%, #1A6B5A 60%, #2A9D8F 100%)'
                : '#F1F5F9',
              color: isFormValid ? '#ffffff' : '#94A3B8',
              border: isFormValid ? 'none' : '1.5px solid #E4E8EF',
              boxShadow: isFormValid
                ? '0 6px 20px rgba(26,107,90,0.28), 0 2px 6px rgba(15,61,48,0.12)'
                : 'none',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              transition: 'all 0.18s',
              minWidth: '260px', justifyContent: 'center',
            }}
          >
            {isFormValid ? <Sparkles size={17} style={{ opacity: 0.85 }} /> : <CircleDashed size={17} />}
            <span>Jalankan simulasi</span>
            {isFormValid && <ChevronRight size={17} style={{ opacity: 0.7 }} />}
          </button>
        </div>
      </div>

      {/* ── CoA Inspection Modal ── */}
      {inspectedIng && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1100,
          background: 'rgba(15,28,46,0.55)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
        }}>
          <div style={{
            background: '#fff', borderRadius: '16px', maxWidth: '560px', width: '100%',
            maxHeight: '88vh', overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(15,28,46,0.2)',
            border: '1px solid #E4E8EF',
          }}>
            <div style={{ padding: '22px 22px 14px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={labelSt}>CoA / MSDS — Tinjauan bahan</div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0F1C2E', marginTop: '3px', letterSpacing: '-0.02em' }}>
                    {inspectedIng.inci_name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                    {inspectedIng.trade_name} · CAS: {inspectedIng.cas_number || 'N/A'}
                  </p>
                </div>
                <button onClick={() => setInspectedIng(null)}
                  style={{ background: '#F5F6F9', border: 'none', color: '#64748B', borderRadius: '7px', padding: '8px', cursor: 'pointer', display: 'flex' }}>
                  <X size={15} />
                </button>
              </div>
            </div>

            <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: '#F5F6F9', borderRadius: '10px', padding: '14px', border: '1px solid #E4E8EF' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1A6B5A', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <FileCheck2 size={13} /> Parameter uji mutu (Lot: {inspectedIng.coa_details?.lot_number || 'REG-2026'})
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px', fontSize: '0.75rem' }}>
                  <div style={{ color: '#64748B' }}>Pemerian: <strong style={{ color: '#0F1C2E' }}>{inspectedIng.coa_details?.appearance}</strong></div>
                  <div style={{ color: '#64748B' }}>Kemurnian: <strong style={{ color: '#1A6B5A', fontFamily: 'var(--font-data)' }}>{inspectedIng.coa_details?.assay_purity_pct}%</strong></div>
                  <div style={{ color: '#64748B' }}>Logam berat: <strong style={{ color: '#2A6B9D', fontFamily: 'var(--font-data)' }}>{inspectedIng.coa_details?.heavy_metals_ppm}</strong></div>
                  <div style={{ color: '#64748B' }}>TPC mikroba: <strong style={{ color: '#0F1C2E', fontFamily: 'var(--font-data)' }}>{inspectedIng.coa_details?.microbial_alt}</strong></div>
                  <div style={{ color: '#64748B' }}>Patogen: <strong style={{ color: '#1A6B5A' }}>{inspectedIng.coa_details?.pathogens}</strong></div>
                  <div style={{ color: '#64748B' }}>pH 1%: <strong style={{ color: '#0F1C2E', fontFamily: 'var(--font-data)' }}>{inspectedIng.coa_details?.ph_solution_1pct ?? '6.5'}</strong></div>
                </div>
              </div>

              {inspectedIng.msds_details && (
                <div style={{ background: '#F5F8FF', borderRadius: '10px', padding: '14px', border: '1px solid #D6E4F5' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2A6B9D', marginBottom: '9px' }}>Keselamatan bahan (MSDS):</div>
                  <div style={{ fontSize: '0.75rem', color: '#3D5166', display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
                  width: '100%', padding: '12px', borderRadius: '10px',
                  fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', border: 'none',
                  background: selectedIngIds.includes(inspectedIng.id)
                    ? '#FDF3F1' : 'linear-gradient(135deg, #0F3D30 0%, #2A9D8F 100%)',
                  color: selectedIngIds.includes(inspectedIng.id) ? '#C55242' : '#ffffff',
                  boxShadow: selectedIngIds.includes(inspectedIng.id) ? 'none' : '0 3px 12px rgba(26,107,90,0.25)',
                }}
              >
                {selectedIngIds.includes(inspectedIng.id) ? 'Hapus dari formula' : 'Tambahkan ke formula'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Generation overlay ── */}
      {isGenerating && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(245,246,249,0.96)', backdropFilter: 'blur(14px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px',
        }}>
          <div style={{
            background: '#fff', borderRadius: '20px', padding: '44px 52px', maxWidth: '480px', width: '100%',
            textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '22px',
            boxShadow: '0 20px 60px rgba(15,28,46,0.14)', border: '1px solid #E4E8EF',
          }}>
            <img src="/rangkai-logo.png" alt="rangkAI" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F1C2E', letterSpacing: '-0.02em' }}>
                Simulasi sedang berjalan
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#2A9D8F', marginTop: '9px', lineHeight: 1.6, fontWeight: 500, minHeight: '40px' }}>
                {generationSteps[generationStep]}
              </p>
            </div>
            {/* Progress bar — width encodes step completion, not decoration */}
            <div style={{ width: '100%', height: '5px', background: '#E4E8EF', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '3px',
                width: `${(generationStep / 4) * 100}%`,
                background: 'linear-gradient(90deg, #0F3D30 0%, #2A9D8F 100%)',
                transition: 'width 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
              }} />
            </div>
            <p style={{ fontSize: '0.7rem', color: '#94A3B8', maxWidth: '320px', lineHeight: 1.6 }}>
              Memproses 30.175 katalog INCI, 100 korpus stabilitas ilmiah, dan kalkulasi aljabar HLB Croda.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
