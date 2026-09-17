import React, { useState } from 'react';
import { OilPhaseComponent } from '../types';
import { MOCK_OIL_COMPONENTS, calculateOilPhaseRHLB, calculateDualEmulsifierRatio } from '../data/mockData';
import { Calculator, Plus, Trash2, CheckCircle2, AlertCircle, RefreshCw, Sliders } from 'lucide-react';

export const HlbCalculator: React.FC = () => {
  const [components, setComponents] = useState<OilPhaseComponent[]>(MOCK_OIL_COMPONENTS);
  
  // Dual-emulsifier state
  const [emulsifierAName, setEmulsifierAName] = useState('Tween 80 (Polysorbate 80)');
  const [emulsifierAHLB, setEmulsifierAHLB] = useState<number>(15.0);
  const [emulsifierBName, setEmulsifierBName] = useState('Span 60 (Sorbitan Stearate)');
  const [emulsifierBHLB, setEmulsifierBHLB] = useState<number>(4.7);
  
  const oilCalc = calculateOilPhaseRHLB(components);
  const [targetHLB, setTargetHLB] = useState<number>(oilCalc.calculated_rhlb || 10.6);
  const [totalEmulsifierMass, setTotalEmulsifierMass] = useState<number>(10.0);

  const blendCalc = calculateDualEmulsifierRatio(
    emulsifierAHLB,
    emulsifierBHLB,
    targetHLB,
    totalEmulsifierMass
  );

  const handleUpdateMass = (id: string, mass: number) => {
    setComponents(prev => prev.map(c => c.id === id ? { ...c, mass_grams: Math.max(0, mass) } : c));
  };

  const handleUpdateRhlb = (id: string, rhlb: number) => {
    setComponents(prev => prev.map(c => c.id === id ? { ...c, rhlb_ow: Math.max(0, rhlb) } : c));
  };

  const handleRemove = (id: string) => {
    setComponents(prev => prev.filter(c => c.id !== id));
  };

  const handleAddOil = () => {
    const newId = `oil-${Date.now()}`;
    setComponents(prev => [
      ...prev,
      { id: newId, name: 'New Botanical Oil / Ester', mass_grams: 10.0, rhlb_ow: 11.0 }
    ]);
  };

  const handleSyncTargetFromOil = () => {
    setTargetHLB(oilCalc.calculated_rhlb);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="glass-panel module-header" style={{
        padding: '20px',
        borderLeft: '4px solid var(--cyan-neon)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calculator size={20} color="var(--cyan-neon)" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              Deterministic HLB Arithmetic & Emulsifier Optimizer
            </h2>
            <span className="badge-pill badge-cyan">ISO / Croda Standard</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Perhitungan presisi kebutuhan HLB fase minyak ($rHLB_{'{mix}'}$) dan rasio fraksi pasangan emulsifier amfifilik O/W.
          </p>
        </div>
        <button 
          onClick={handleSyncTargetFromOil}
          className="btn-secondary"
          style={{ fontSize: '0.8rem', padding: '6px 12px' }}
        >
          <RefreshCw size={14} /> Sinkron Target ke rHLB ({oilCalc.calculated_rhlb})
        </button>
      </div>

      {/* Grid: 2 Columns for Oil Phase & Dual Emulsifier Blend */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '24px'
      }}>
        {/* COLUMN 1: Oil Phase Components */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                1. Fase Minyak & Required HLB ($rHLB_i$)
              </h3>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Bobot dihitung dari total massa fase minyak saja (bukan seluruh batch).
              </span>
            </div>
            <button 
              onClick={handleAddOil}
              className="btn-secondary"
              style={{ padding: '5px 10px', fontSize: '0.75rem' }}
            >
              <Plus size={14} /> Tambah Bahan Minyak
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                  <th style={{ padding: '8px 4px' }}>Bahan Minyak</th>
                  <th style={{ padding: '8px 4px', width: '85px' }}>Massa (g)</th>
                  <th style={{ padding: '8px 4px', width: '80px' }}>rHLB (O/W)</th>
                  <th style={{ padding: '8px 4px', width: '85px' }}>Kontribusi</th>
                  <th style={{ padding: '8px 4px', width: '36px' }}></th>
                </tr>
              </thead>
              <tbody>
                {oilCalc.breakdown.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '8px 4px', fontWeight: 600 }}>
                      {item.name}
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {item.percentage_of_oil.toFixed(1)}% dari fase minyak
                      </div>
                    </td>
                    <td style={{ padding: '8px 4px' }}>
                      <input 
                        type="number"
                        step="0.5"
                        min="0"
                        value={item.mass}
                        onChange={(e) => handleUpdateMass(components[idx].id, parseFloat(e.target.value) || 0)}
                        style={{
                          width: '100%',
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          color: '#0f172a',
                          padding: '4px 6px',
                          fontSize: '0.82rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                      />
                    </td>
                    <td style={{ padding: '8px 4px' }}>
                      <input 
                        type="number"
                        step="0.1"
                        min="0"
                        max="20"
                        value={components[idx]?.rhlb_ow || 0}
                        onChange={(e) => handleUpdateRhlb(components[idx].id, parseFloat(e.target.value) || 0)}
                        style={{
                          width: '100%',
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          color: '#0f172a',
                          padding: '4px 6px',
                          fontSize: '0.82rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                      />
                    </td>
                    <td style={{ padding: '8px 4px', fontFamily: 'var(--font-mono)', color: 'var(--brand-blue)', fontWeight: 600 }}>
                      {item.contribution.toFixed(2)}
                    </td>
                    <td style={{ padding: '8px 4px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleRemove(components[idx].id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                        title="Hapus komponen"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Result Card */}
          <div style={{
            marginTop: 'auto',
            padding: '16px',
            background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
            border: '1px solid #bfdbfe',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-blue)', fontWeight: 700 }}>
                Total rHLB Campuran Minyak ($rHLB_{'{mix}'}$)
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Total Massa Minyak: <strong className="font-mono-calc" style={{ color: '#002b5c' }}>{oilCalc.total_oil_mass.toFixed(1)} g</strong>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="font-mono-calc" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--brand-blue)' }}>
                {oilCalc.calculated_rhlb.toFixed(2)}
              </div>
              <span className="badge-pill badge-cyan">O/W Target</span>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Dual Emulsifier Solver */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              2. Pasangan Dual-Emulsifier (Hydrophilic + Lipophilic)
            </h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Menghitung fraksi aljabar $f_A$ & $f_B$ agar tercapai target HLB emulsi yang stabil.
            </span>
          </div>

          {/* Emulsifier A */}
          <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0f172a' }}>Emulsifier A (Hydrophilic High HLB)</label>
              <span className="font-mono-calc" style={{ fontSize: '0.8rem', color: 'var(--emerald-neon)' }}>HLB: {emulsifierAHLB}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                value={emulsifierAName}
                onChange={(e) => {
                  const val = e.target.value;
                  setEmulsifierAName(val);
                  if (val === 'Polysorbate 80 (Tween 80)') setEmulsifierAHLB(15.0);
                  if (val === 'Polysorbate 20 (Tween 20)') setEmulsifierAHLB(16.7);
                  if (val === 'PEG-40 Hydrogenated Castor Oil') setEmulsifierAHLB(15.0);
                  if (val === 'Ceteareth-20') setEmulsifierAHLB(15.2);
                }}
                style={{
                  flex: 1,
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  color: '#0f172a',
                  padding: '6px 8px',
                  fontSize: '0.8rem'
                }}
              >
                <option value="Polysorbate 80 (Tween 80)">Polysorbate 80 (Tween 80)</option>
                <option value="Polysorbate 20 (Tween 20)">Polysorbate 20 (Tween 20)</option>
                <option value="PEG-40 Hydrogenated Castor Oil">PEG-40 Hydrogenated Castor Oil</option>
                <option value="Ceteareth-20">Ceteareth-20</option>
              </select>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="40"
                value={emulsifierAHLB}
                readOnly
                style={{
                  width: '75px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  color: '#64748b',
                  padding: '6px 8px',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'not-allowed'
                }}
              />
            </div>
          </div>

          {/* Emulsifier B */}
          <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0f172a' }}>Emulsifier B (Lipophilic Low HLB)</label>
              <span className="font-mono-calc" style={{ fontSize: '0.8rem', color: 'var(--amber-warning)' }}>HLB: {emulsifierBHLB}</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                value={emulsifierBName}
                onChange={(e) => {
                  const val = e.target.value;
                  setEmulsifierBName(val);
                  if (val === 'Sorbitan Stearate (Span 60)') setEmulsifierBHLB(4.7);
                  if (val === 'Sorbitan Oleate (Span 80)') setEmulsifierBHLB(4.3);
                  if (val === 'Glyceryl Stearate') setEmulsifierBHLB(3.8);
                }}
                style={{
                  flex: 1,
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  color: '#0f172a',
                  padding: '6px 8px',
                  fontSize: '0.8rem'
                }}
              >
                <option value="Sorbitan Stearate (Span 60)">Sorbitan Stearate (Span 60)</option>
                <option value="Sorbitan Oleate (Span 80)">Sorbitan Oleate (Span 80)</option>
                <option value="Glyceryl Stearate">Glyceryl Stearate</option>
              </select>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="40"
                value={emulsifierBHLB}
                readOnly
                style={{
                  width: '75px',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  color: '#64748b',
                  padding: '6px 8px',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'not-allowed'
                }}
              />
            </div>
          </div>

          {/* Target & Total Dose Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Target HLB ({targetHLB})
              </label>
              <input 
                type="range"
                min={Math.min(emulsifierAHLB, emulsifierBHLB)}
                max={Math.max(emulsifierAHLB, emulsifierBHLB)}
                step="0.1"
                value={targetHLB}
                onChange={(e) => setTargetHLB(parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Total Emulsifier (g)
              </label>
              <input 
                type="number"
                step="0.5"
                min="1"
                value={totalEmulsifierMass}
                onChange={(e) => setTotalEmulsifierMass(parseFloat(e.target.value) || 0)}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  color: '#0f172a',
                  padding: '5px 8px',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>
          </div>

          {/* Calculated Output */}
          {blendCalc.feasible ? (
            <div style={{
              marginTop: 'auto',
              padding: '16px',
              background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 100%)',
              border: '1px solid #a7f3d0',
              borderRadius: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#065f46', fontSize: '0.8rem', fontWeight: 700, marginBottom: '10px' }}>
                <CheckCircle2 size={16} /> Solusi Feasible: Rasio Emulsifier Optimal
              </div>

              {/* Progress bar visual */}
              <div style={{ height: '10px', width: '100%', borderRadius: '5px', overflow: 'hidden', display: 'flex', marginBottom: '12px' }}>
                <div style={{ width: `${blendCalc.fractionA * 100}%`, background: 'var(--emerald-neon)' }} title={`${emulsifierAName}: ${(blendCalc.fractionA * 100).toFixed(1)}%`} />
                <div style={{ width: `${blendCalc.fractionB * 100}%`, background: 'var(--amber-warning)' }} title={`${emulsifierBName}: ${(blendCalc.fractionB * 100).toFixed(1)}%`} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem' }}>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Massa Emulsifier A:</div>
                  <div className="font-mono-calc" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--emerald-neon)' }}>
                    {blendCalc.massAGrams} g
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {(blendCalc.fractionA * 100).toFixed(2)}% dari total emulsifier
                  </div>
                </div>

                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Massa Emulsifier B:</div>
                  <div className="font-mono-calc" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--amber-warning)' }}>
                    {blendCalc.massBGrams} g
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {(blendCalc.fractionB * 100).toFixed(2)}% dari total emulsifier
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              marginTop: 'auto',
              padding: '14px',
              background: 'rgba(244, 63, 94, 0.1)',
              border: '1px solid rgba(244, 63, 94, 0.3)',
              borderRadius: '8px',
              color: 'var(--rose-danger)',
              fontSize: '0.82rem',
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <div>{blendCalc.errorMessage}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
