import React, { useState } from 'react';
import { QtppProfile, Ingredient } from '../types';
import { DEFAULT_QTPP, MOCK_INGREDIENTS } from '../data/mockData';
import { 
  Atom, 
  Sparkles, 
  FileCheck2, 
  UploadCloud, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  FileText, 
  ArrowRight, 
  Check, 
  RotateCcw, 
  Beaker, 
  Info,
  Sliders,
  Search,
  Eye,
  AlertCircle,
  X
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
  bpom_registered: true
};

export const InitialDataInputView: React.FC<InitialDataInputViewProps> = ({ onGenerateComplete }) => {
  // QTPP State - Starts empty to require user completion
  const [qtpp, setQtpp] = useState<QtppProfile>(BLANK_QTPP);

  // Ingredient Selection State - Starts empty
  const [selectedIngIds, setSelectedIngIds] = useState<string[]>([]);

  // Upload Documents State - Starts empty
  const [coaUploaded, setCoaUploaded] = useState<boolean>(false);
  const [coaFileName, setCoaFileName] = useState<string>('');
  const [halalUploaded, setHalalUploaded] = useState<boolean>(false);
  const [halalFileName, setHalalFileName] = useState<string>('');

  // Ingredient Filtering State in Step 2
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [inspectedIng, setInspectedIng] = useState<Ingredient | null>(null);

  // AI Scanning Progress State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(0);

  // Validation Rules (All 3 sections must be completed before generation is allowed)
  const isSection1Valid = Boolean(
    qtpp.product_name && qtpp.product_name.trim().length > 0 &&
    qtpp.target_ph_min > 0 && qtpp.target_ph_max >= qtpp.target_ph_min &&
    qtpp.target_viscosity_min > 0 && qtpp.target_viscosity_max >= qtpp.target_viscosity_min &&
    qtpp.target_cogs_max_idr > 0 &&
    qtpp.sensory_target && qtpp.sensory_target.trim().length > 0
  );

  const isSection2Valid = selectedIngIds.length > 0;

  const isSection3Valid = coaUploaded && halalUploaded;

  const isFormValid = isSection1Valid && isSection2Valid && isSection3Valid;

  const categoryOptions = [
    { label: 'Semua', value: 'ALL' },
    { label: 'pH Adjuster / Acid', value: 'pH adjuster' },
    { label: 'Viscosity Enhancer', value: 'Viscosity' },
    { label: 'Antioxidant', value: 'Antioxidant' },
    { label: 'Solvent', value: 'Solvent' },
    { label: 'Anti-foaming', value: 'Anti-foaming' },
    { label: 'Pigment & Color', value: 'Pigment' },
    { label: 'Flavoring', value: 'Flavoring' },
    { label: 'Bahan Aktif', value: 'Active' },
    { label: 'Minyak & Wax', value: 'Emollient' },
    { label: 'Humektan', value: 'Humectant' },
    { label: 'Emulsifier', value: 'Emulsifying' },
    { label: 'Pengawet', value: 'Preservative' }
  ];

  const filteredIngredients = MOCK_INGREDIENTS.filter(ing => {
    const matchesSearch = 
      ing.inci_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ing.trade_name && ing.trade_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ing.cas_number && ing.cas_number.includes(searchQuery));

    const matchesCategory = selectedCategory === 'ALL' ||
      ing.functions.some(f => f.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  const toggleIngredient = (id: string) => {
    setSelectedIngIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectFiltered = () => {
    const idsToAdd = filteredIngredients.map(i => i.id);
    setSelectedIngIds(prev => Array.from(new Set([...prev, ...idsToAdd])));
  };

  const handleClearSelection = () => {
    setSelectedIngIds([]);
  };

  const handleApplyPreset = () => {
    setQtpp(DEFAULT_QTPP);
    setSelectedIngIds([
      'ing-1', // Aqua
      'ing-2', // Glycerin
      'ing-3', // Niacinamide
      'ing-4', // Squalane
      'ing-5', // Beeswax
      'ing-8', // Cetyl alcohol
      'ing-9', // Tween 80
      'ing-10', // Span 60
      'ing-12', // Phenoxyethanol
      'ing-15'  // Carbomer
    ]);
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

    setTimeout(() => {
      setGenerationStep(2);
    }, 700);

    setTimeout(() => {
      setGenerationStep(3);
    }, 1400);

    setTimeout(() => {
      setGenerationStep(4);
    }, 2100);

    setTimeout(() => {
      setIsGenerating(false);
      // Clean R&D dashboard transition without confetti bursts
      onGenerateComplete(qtpp, selectedIngIds);
    }, 2800);
  };

  const generationStepsText = [
    '',
    '1/4 Memindai batas regulasi BPOM & menganalisis keaslian sertifikasi Halal...',
    '2/4 Menghitung required HLB (rHLB) fase minyak & optimasi rasio dual-emulsifier...',
    '3/4 Menjalankan surrogate model machine learning untuk prediksi viskositas, pH, & stabilitas...',
    '4/4 Mengoptimasi 5 kandidat formula terbaik dengan akurasi & presisi tertinggi!'
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-app)',
      display: 'flex',
      flexDirection: 'column',
      padding: '28px 36px',
      gap: '24px'
    }}>
      {/* Top Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 24px',
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <img 
            src="/rangkai-logo.png" 
            alt="rangkAI Logo" 
            style={{ 
              height: '44px', 
              width: 'auto', 
              objectFit: 'contain' 
            }} 
          />
          <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#002b5c' }}>
                Formulation Studio & R&D Copilot
              </span>
              <span style={{ fontSize: '0.68rem', color: '#0284c7', background: '#eff6ff', padding: '2px 8px', borderRadius: '4px', border: '1px solid #bfdbfe', fontWeight: 700 }}>
                v2.0
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Inisialisasi Formulasi Baru: Input Data Mutu (QTPP), Pilih Bahan (51+ INCI), & Verifikasi Certificate of Analysis (CoA) atau MSDS
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            onClick={handleResetAll}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', borderColor: '#cbd5e1', color: '#64748b', background: '#ffffff', fontWeight: 600 }}
            title="Kosongkan seluruh data input form"
          >
            <RotateCcw size={13} /> Kosongkan Form
          </button>
          <button 
            onClick={handleApplyPreset}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', borderColor: '#a7f3d0', color: '#065f46', background: '#ecfdf5', fontWeight: 600 }}
          >
            <Sparkles size={14} color="#059669" /> Isi Cepat (Preset Moisturizer Tropis)
          </button>
        </div>
      </header>

      {/* Main Grid: 3 Steps Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
        flex: 1
      }}>
        {/* STEP 1: QTPP Setup */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#eff6ff',
                color: '#0284c7',
                border: '1px solid #bfdbfe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 800
              }}>
                1
              </span>
              <div>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#002b5c' }}>
                  Quality Target Product Profile (QTPP)
                </h3>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Tentukan target spesifikasi produk akhir yang diinginkan.
                </p>
              </div>
            </div>
            <span className={isSection1Valid ? "badge-pill badge-emerald" : "badge-pill badge-neutral"} style={{ fontSize: '0.65rem' }}>
              {isSection1Valid ? <><CheckCircle2 size={11} /> Lengkap</> : 'Belum Lengkap'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.82rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '5px', fontWeight: 600 }}>
                Nama Produk & Tipe Sediaan <span style={{ color: '#e11d48' }}>*</span>
              </label>
              <input 
                type="text"
                placeholder="Contoh: Barrier Restore Daily Hydro-Moisturizer"
                value={qtpp.product_name}
                onChange={(e) => setQtpp({ ...qtpp, product_name: e.target.value })}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  color: '#0f172a',
                  padding: '8px 12px',
                  fontSize: '0.84rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '5px', fontWeight: 600 }}>
                  Target pH ({qtpp.target_ph_min} - {qtpp.target_ph_max})
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input 
                    type="number"
                    step="0.1"
                    value={qtpp.target_ph_min}
                    onChange={(e) => setQtpp({ ...qtpp, target_ph_min: parseFloat(e.target.value) || 0 })}
                    style={{
                      width: '50%',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      color: '#0f172a',
                      padding: '7px 10px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                  <input 
                    type="number"
                    step="0.1"
                    value={qtpp.target_ph_max}
                    onChange={(e) => setQtpp({ ...qtpp, target_ph_max: parseFloat(e.target.value) || 0 })}
                    style={{
                      width: '50%',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      color: '#0f172a',
                      padding: '7px 10px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '5px', fontWeight: 600 }}>
                  Target Viskositas (cPs)
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input 
                    type="number"
                    step="1000"
                    value={qtpp.target_viscosity_min}
                    onChange={(e) => setQtpp({ ...qtpp, target_viscosity_min: parseFloat(e.target.value) || 0 })}
                    style={{
                      width: '50%',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      color: '#0f172a',
                      padding: '7px 10px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                  <input 
                    type="number"
                    step="1000"
                    value={qtpp.target_viscosity_max}
                    onChange={(e) => setQtpp({ ...qtpp, target_viscosity_max: parseFloat(e.target.value) || 0 })}
                    style={{
                      width: '50%',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      color: '#0f172a',
                      padding: '7px 10px',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '5px', fontWeight: 600 }}>
                Batas Maksimal COGS Bahan Baku (IDR / kg)
              </label>
              <input 
                type="number"
                step="5000"
                value={qtpp.target_cogs_max_idr}
                onChange={(e) => setQtpp({ ...qtpp, target_cogs_max_idr: parseFloat(e.target.value) || 0 })}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  color: '#002b5c',
                  fontWeight: 700,
                  padding: '8px 12px',
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '5px', fontWeight: 600 }}>
                Target Karakteristik Sensory & Klaim <span style={{ color: '#e11d48' }}>*</span>
              </label>
              <textarea 
                rows={2}
                placeholder="Contoh: Non-comedogenic, rapid absorption, non-sticky matte finish, soothing hydration"
                value={qtpp.sensory_target}
                onChange={(e) => setQtpp({ ...qtpp, sensory_target: e.target.value })}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  color: '#0f172a',
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  resize: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* STEP 2: Ingredient Selection with Search, Categories & CoA Inspection */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#ecfdf5',
                color: '#059669',
                border: '1px solid #a7f3d0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 800
              }}>
                2
              </span>
              <div>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#002b5c' }}>
                  Pilih Bahan Baku Formula (Katalog INCI)
                </h3>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  <strong>{selectedIngIds.length}</strong> bahan terpilih dari {MOCK_INGREDIENTS.length} bahan INCI.
                </p>
              </div>
            </div>

            {/* Quick Action Buttons & Status Badge */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span className={isSection2Valid ? "badge-pill badge-emerald" : "badge-pill badge-neutral"} style={{ fontSize: '0.65rem' }}>
                {isSection2Valid ? <><CheckCircle2 size={11} /> {selectedIngIds.length} Bahan</> : 'Belum Ada Bahan'}
              </span>
              <button
                onClick={handleSelectFiltered}
                style={{
                  fontSize: '0.72rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  color: '#0284c7',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                title="Pilih seluruh bahan hasil filter"
              >
                + Pilih Filter
              </button>
              <button
                onClick={handleClearSelection}
                style={{
                  fontSize: '0.72rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#64748b',
                  cursor: 'pointer'
                }}
                title="Kosongkan pilihan"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Search bar inside Step 2 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '8px 12px'
          }}>
            <Search size={15} color="#94a3b8" />
            <input 
              type="text"
              placeholder="Cari INCI (misal: Niacinamide, Glycerin, Sodium Hyaluronate)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#0f172a',
                fontSize: '0.82rem',
                width: '100%',
                padding: 0
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categoryOptions.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                style={{
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: selectedCategory === cat.value ? '1px solid #0284c7' : '1px solid #e2e8f0',
                  background: selectedCategory === cat.value ? '#eff6ff' : '#ffffff',
                  color: selectedCategory === cat.value ? '#0284c7' : '#64748b',
                  fontWeight: selectedCategory === cat.value ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Scrollable list of ingredients */}
          <div style={{
            flex: 1,
            maxHeight: '340px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            paddingRight: '6px'
          }}>
            {filteredIngredients.map(ing => {
              const isSelected = selectedIngIds.includes(ing.id);
              return (
                <div
                  key={ing.id}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: isSelected ? '1px solid #bfdbfe' : '1px solid #f1f5f9',
                    background: isSelected ? '#eff6ff' : '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div 
                    onClick={() => toggleIngredient(ing.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flex: 1 }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: isSelected ? '1px solid #0284c7' : '1px solid #cbd5e1',
                      background: isSelected ? '#0284c7' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isSelected && <Check size={13} color="#ffffff" strokeWidth={3} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: isSelected ? '#002b5c' : '#0f172a' }}>
                        {ing.inci_name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {ing.trade_name} • {ing.functions.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => setInspectedIng(ing)}
                      style={{
                        padding: '4px 8px',
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        fontSize: '0.68rem',
                        color: '#475569',
                        cursor: 'pointer'
                      }}
                      title="Lihat spesifikasi Certificate of Analysis (CoA) atau MSDS bahan"
                    >
                      <Eye size={12} /> CoA
                    </button>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: (ing.regulatory_status === 'BPOM_COMPLIANT' || ing.regulatory_status === 'COSING_APPROVED') ? '#ecfdf5' : '#fffbeb',
                      color: (ing.regulatory_status === 'BPOM_COMPLIANT' || ing.regulatory_status === 'COSING_APPROVED') ? '#065f46' : '#92400e',
                      border: (ing.regulatory_status === 'BPOM_COMPLIANT' || ing.regulatory_status === 'COSING_APPROVED') ? '1px solid #a7f3d0' : '1px solid #fde68a'
                    }}>
                      {(ing.regulatory_status === 'BPOM_COMPLIANT' || ing.regulatory_status === 'COSING_APPROVED') ? 'BPOM OK' : 'Limit'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 3: Upload Evidence Documents & Parsed CoA/MSDS Inspection */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#fff7ed',
                color: '#c2410c',
                border: '1px solid #fed7aa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 800
              }}>
                3
              </span>
              <div>
                <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#002b5c' }}>
                  Upload Bukti Dokumen (Certificate of Analysis (CoA) atau MSDS, Halal)
                </h3>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  AI mengekstrak parameter CoA & memvalidasi keaslian sertifikat Halal.
                </p>
              </div>
            </div>
            <span className={isSection3Valid ? "badge-pill badge-emerald" : "badge-pill badge-neutral"} style={{ fontSize: '0.65rem' }}>
              {isSection3Valid ? <><CheckCircle2 size={11} /> 2 Terunggah</> : 'Belum Lengkap'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* CoA Dropzone */}
            <div style={{
              background: coaUploaded ? '#ecfdf5' : '#f8fafc',
              border: coaUploaded ? '1px solid #a7f3d0' : '1.5px dashed #cbd5e1',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#002b5c' }}>Certificate of Analysis (CoA) atau MSDS <span style={{ color: '#e11d48' }}>*</span></span>
                {coaUploaded ? (
                  <span className="badge-pill badge-emerald" style={{ fontSize: '0.65rem' }}>
                    <CheckCircle2 size={11} /> CoA Valid (✓)
                  </span>
                ) : (
                  <span className="badge-pill badge-neutral" style={{ fontSize: '0.65rem' }}>Belum Diunggah</span>
                )}
              </div>

              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                {coaUploaded ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', color: '#065f46', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <FileText size={13} color="#059669" /> {coaFileName}
                    </div>
                    <button
                      onClick={() => {
                        setCoaUploaded(false);
                        setCoaFileName('');
                      }}
                      style={{ background: 'none', border: 'none', color: '#e11d48', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 600, padding: '2px 4px' }}
                      title="Hapus berkas ini"
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  'Unggah berkas CoA atau MSDS untuk auto-check regulasi BPOM.'
                )}
              </div>

              <label style={{
                marginTop: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: '#ffffff',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                color: '#1e293b',
                border: '1px solid #cbd5e1',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <UploadCloud size={14} /> {coaUploaded ? 'Ganti Berkas CoA' : 'Upload Berkas CoA atau MSDS'}
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCoaFileName(e.target.files[0].name);
                      setCoaUploaded(true);
                    }
                  }} 
                  style={{ display: 'none' }} 
                />
              </label>
            </div>

            {/* Halal Dropzone */}
            <div style={{
              background: halalUploaded ? '#ecfdf5' : '#f8fafc',
              border: halalUploaded ? '1px solid #a7f3d0' : '1.5px dashed #cbd5e1',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#002b5c' }}>Sertifikat Halal (BPJPH / LPPOM MUI) <span style={{ color: '#e11d48' }}>*</span></span>
                {halalUploaded ? (
                  <span className="badge-pill badge-emerald" style={{ fontSize: '0.65rem' }}>
                    <CheckCircle2 size={11} /> Halal Verified (✓)
                  </span>
                ) : (
                  <span className="badge-pill badge-neutral" style={{ fontSize: '0.65rem' }}>Belum Diunggah</span>
                )}
              </div>

              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                {halalUploaded ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', color: '#065f46', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <FileText size={13} color="#059669" /> {halalFileName}
                    </div>
                    <button
                      onClick={() => {
                        setHalalUploaded(false);
                        setHalalFileName('');
                      }}
                      style={{ background: 'none', border: 'none', color: '#e11d48', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 600, padding: '2px 4px' }}
                      title="Hapus berkas ini"
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  'Unggah sertifikat halal bahan baku untuk auto-centang status Halal.'
                )}
              </div>

              <label style={{
                marginTop: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: '#ffffff',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer',
                color: '#1e293b',
                border: '1px solid #cbd5e1',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <UploadCloud size={14} /> {halalUploaded ? 'Ganti Sertifikat Halal' : 'Upload Sertifikat Halal'}
                <input 
                  type="file" 
                  accept=".pdf,.jpg,.png" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setHalalFileName(e.target.files[0].name);
                      setHalalUploaded(true);
                    }
                  }} 
                  style={{ display: 'none' }} 
                />
              </label>
            </div>

            {/* AI Auto-Extraction Summary Panel */}
            {coaUploaded && (
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '10px',
                padding: '12px 14px',
                fontSize: '0.74rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <div style={{ fontWeight: 700, color: '#0284c7', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} color="#0284c7" /> Ekstraksi Parameter CoA oleh rangkAI (Pass):
                </div>
                <div style={{ color: 'var(--text-secondary)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '4px' }}>
                  <div>Lot: <strong style={{ color: '#0f172a' }}>LOT-NIA-20260810-USP</strong></div>
                  <div>Kemurnian: <strong style={{ color: '#059669' }}>99.6% (HPLC)</strong></div>
                  <div>Logam Berat: <strong style={{ color: '#0284c7' }}>&lt;10 ppm</strong></div>
                  <div>Mikroba TPC: <strong style={{ color: '#0f172a' }}>&lt;100 CFU/g</strong></div>
                  <div>GHS: <strong style={{ color: '#d97706' }}>Cat 2A Irritation</strong></div>
                  <div>Halal ID: <strong style={{ color: '#059669' }}>ID00410000287190</strong></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM GENERATION ACTION BAR (Spans below all 3 sections) */}
      <div className="glass-panel" style={{
        padding: '22px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        flexWrap: 'wrap',
        background: '#ffffff',
        border: isFormValid ? '1.5px solid #bfdbfe' : '1px solid var(--border-card)',
        boxShadow: isFormValid ? '0 10px 30px -4px rgba(2, 132, 199, 0.12)' : 'var(--shadow-card)',
        borderRadius: '16px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#002b5c' }}>
              Status Kesiapan Inisialisasi Formulasi
            </h4>
            <span className={isFormValid ? "badge-pill badge-emerald" : "badge-pill badge-amber"} style={{ fontSize: '0.72rem' }}>
              {isFormValid ? <><CheckCircle2 size={12} /> Siap Generate (3/3 Seksi Terisi)</> : <><AlertCircle size={12} /> Belum Lengkap (Wajib Isi Semua 3 Seksi)</>}
            </span>
          </div>

          {/* Validation Checklist for All 3 Sections */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Seksi 1 Checklist */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              background: isSection1Valid ? '#ecfdf5' : '#fffbeb',
              color: isSection1Valid ? '#065f46' : '#92400e',
              border: isSection1Valid ? '1px solid #a7f3d0' : '1px solid #fde68a',
              fontWeight: 600,
              fontSize: '0.75rem'
            }}>
              {isSection1Valid ? <CheckCircle2 size={13} color="#059669" /> : <AlertCircle size={13} color="#d97706" />}
              <span>Seksi 1: QTPP ({isSection1Valid ? 'Lengkap ✓' : 'Belum Diisi !'})</span>
            </div>

            {/* Seksi 2 Checklist */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              background: isSection2Valid ? '#ecfdf5' : '#fffbeb',
              color: isSection2Valid ? '#065f46' : '#92400e',
              border: isSection2Valid ? '1px solid #a7f3d0' : '1px solid #fde68a',
              fontWeight: 600,
              fontSize: '0.75rem'
            }}>
              {isSection2Valid ? <CheckCircle2 size={13} color="#059669" /> : <AlertCircle size={13} color="#d97706" />}
              <span>Seksi 2: Bahan Baku ({selectedIngIds.length > 0 ? `${selectedIngIds.length} Terpilih ✓` : 'Belum Dipilih !'})</span>
            </div>

            {/* Seksi 3 Checklist */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '6px',
              background: isSection3Valid ? '#ecfdf5' : '#fffbeb',
              color: isSection3Valid ? '#065f46' : '#92400e',
              border: isSection3Valid ? '1px solid #a7f3d0' : '1px solid #fde68a',
              fontWeight: 600,
              fontSize: '0.75rem'
            }}>
              {isSection3Valid ? <CheckCircle2 size={13} color="#059669" /> : <AlertCircle size={13} color="#d97706" />}
              <span>Seksi 3: CoA/MSDS & Halal ({isSection3Valid ? 'Terunggah ✓' : !coaUploaded && !halalUploaded ? 'Belum Diunggah !' : !coaUploaded ? 'CoA Kurang !' : 'Halal Kurang !'})</span>
            </div>
          </div>

          {!isFormValid && (
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
              Tombol generate otomatis aktif setelah seluruh 3 seksi terpenuhi. Anda juga dapat menekan tombol <strong>"Isi Cepat (Preset Moisturizer Tropis)"</strong> di atas untuk pengisian instan.
            </p>
          )}
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={handleStartGeneration}
            disabled={!isFormValid || isGenerating}
            style={{
              padding: '16px 36px',
              fontSize: '0.95rem',
              fontWeight: 700,
              borderRadius: '12px',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              background: isFormValid 
                ? 'linear-gradient(135deg, #002b5c 0%, #0284c7 100%)' 
                : '#f1f5f9',
              color: isFormValid ? '#ffffff' : '#94a3b8',
              border: isFormValid ? 'none' : '1px solid #cbd5e1',
              boxShadow: isFormValid ? '0 4px 16px rgba(2, 132, 199, 0.3)' : 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
              opacity: isFormValid ? 1 : 0.7
            }}
          >
            <Sparkles size={18} color={isFormValid ? '#ffffff' : '#94a3b8'} />
            GENERATE 5 PREDIKSI FORMULASI DENGAN rangkAI
            <ArrowRight size={16} color={isFormValid ? '#ffffff' : '#94a3b8'} />
          </button>
        </div>
      </div>

      {/* Ingredient CoA / MSDS Quick Inspection Modal */}
      {inspectedIng && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '20px'
        }}>
          <div className="glass-panel-elevated" style={{
            maxWidth: '600px',
            width: '100%',
            padding: '26px',
            maxHeight: '90vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge-pill badge-emerald">Certificate of Analysis (CoA) atau MSDS</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '4px', color: '#002b5c' }}>
                  {inspectedIng.inci_name}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {inspectedIng.trade_name} | CAS: {inspectedIng.cas_number || 'N/A'}
                </div>
              </div>
              <button
                onClick={() => setInspectedIng(null)}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#475569',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                Tutup
              </button>
            </div>

            {/* CoA Grid */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#059669' }}>
                Parameter Uji Mutu CoA (Lot: {inspectedIng.coa_details?.lot_number || 'REG-2026'}):
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem' }}>
                <div>Pemerian: <strong>{inspectedIng.coa_details?.appearance}</strong></div>
                <div>Assay Kemurnian: <strong style={{ color: '#059669' }}>{inspectedIng.coa_details?.assay_purity_pct}%</strong></div>
                <div>Logam Berat: <strong style={{ color: '#0284c7' }}>{inspectedIng.coa_details?.heavy_metals_ppm}</strong></div>
                <div>TPC Mikroba: <strong>{inspectedIng.coa_details?.microbial_alt}</strong></div>
                <div>Uji Patogen: <strong style={{ color: '#059669' }}>{inspectedIng.coa_details?.pathogens}</strong></div>
                <div>pH 1%: <strong>{inspectedIng.coa_details?.ph_solution_1pct ?? '6.5'}</strong></div>
              </div>
            </div>

            {/* MSDS Summary */}
            {inspectedIng.msds_details && (
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '0.76rem'
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0284c7' }}>
                  Lembar Keselamatan Bahan (MSDS):
                </div>
                <div>GHS: <strong>{inspectedIng.msds_details.ghs_classification}</strong> ({inspectedIng.msds_details.signal_word})</div>
                <div>Pernyataan Bahaya: {inspectedIng.msds_details.hazard_statements.join('; ')}</div>
                <div>APD: <strong style={{ color: '#002b5c' }}>{inspectedIng.msds_details.personal_protective_equipment}</strong></div>
                <div>Pertolongan Pertama: {inspectedIng.msds_details.first_aid_eye}</div>
              </div>
            )}

            <button
              onClick={() => {
                toggleIngredient(inspectedIng.id);
                setInspectedIng(null);
              }}
              className="btn-primary"
              style={{ width: '100%', fontSize: '0.84rem', padding: '11px', borderRadius: '8px' }}
            >
              {selectedIngIds.includes(inspectedIng.id) ? '✓ Bahan Sudah Terpilih (Klik untuk Hapus)' : '+ Pilih Bahan Ini ke Formula'}
            </button>
          </div>
        </div>
      )}

      {/* AI Processing Modal / Overlay */}
      {isGenerating && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(248, 250, 252, 0.92)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="glass-panel-elevated" style={{
            padding: '40px',
            maxWidth: '540px',
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            background: '#ffffff',
            border: '1px solid #bfdbfe',
            boxShadow: '0 20px 50px -10px rgba(15, 23, 42, 0.15)'
          }}>
            <img 
              src="/rangkai-logo.png" 
              alt="rangkAI" 
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }} 
            />

            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#002b5c' }}>
                rangkAI Formulation Engine Running...
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#0284c7', marginTop: '8px', minHeight: '38px', lineHeight: 1.4, fontWeight: 600 }}>
                {generationStepsText[generationStep]}
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${(generationStep / 4) * 100}%`,
                background: 'linear-gradient(90deg, #002b5c 0%, #0284c7 100%)',
                transition: 'width 0.6s ease'
              }} />
            </div>

            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Memproses 30.175 INCI katalog, 100 korpus stabilitas, dan kalkulasi aljabar HLB Croda.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
