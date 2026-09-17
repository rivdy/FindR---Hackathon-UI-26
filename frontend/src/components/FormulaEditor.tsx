import React, { useState } from 'react';
import { FormulaCandidate, FormulaLineItem, PhaseCategory } from '../types';
import { MOCK_CANDIDATES } from '../data/mockData';
import { Layers, AlertTriangle, CheckCircle2, ShieldCheck, ShieldAlert, Plus, Trash2 } from 'lucide-react';

interface FormulaEditorProps {
  candidate?: FormulaCandidate;
}

export const FormulaEditor: React.FC<FormulaEditorProps> = ({ candidate = MOCK_CANDIDATES[0] }) => {
  const [items, setItems] = useState<FormulaLineItem[]>(candidate.items);
  const [batchMassKg, setBatchMassKg] = useState<number>(5.0);

  const totalPercentage = items.reduce((sum, item) => sum + (Number(item.percentage) || 0), 0);
  const isHundredPercent = Math.abs(totalPercentage - 100.0) < 0.001;

  const totalCostPerKg = items.reduce((sum, item) => {
    const fraction = (Number(item.percentage) || 0) / 100;
    return sum + (fraction * (item.cost_per_kg || 0));
  }, 0);

  const phases: PhaseCategory[] = [
    'Phase A (Water Phase)',
    'Phase B (Oil Phase)',
    'Phase C (Actives, Stabilizer & Preservative)'
  ];

  const handlePercentageChange = (id: string, newPct: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          percentage: newPct,
          calculated_mass_g: Number(((newPct / 100) * batchMassKg * 1000).toFixed(2))
        };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner with Total Mass Check & COGS */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        borderLeft: isHundredPercent ? '4px solid var(--emerald-neon)' : '4px solid var(--rose-danger)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--emerald-neon)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              Formulation Sheet: {candidate.name} ({candidate.code})
            </h3>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Aturan validasi master brief: total massa formula wajib tepat 100.00% sebelum dapat dirilis ke batch compounding.
          </p>
        </div>

        {/* Meters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Ukuran Batch:</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input 
                type="number"
                step="0.5"
                min="0.5"
                value={batchMassKg}
                onChange={(e) => setBatchMassKg(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                style={{
                  width: '70px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  color: '#0f172a',
                  padding: '4px 8px',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)'
                }}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>kg</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>COGS Bahan Baku:</div>
            <div className="font-mono-calc" style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-blue)' }}>
              IDR {Math.round(totalCostPerKg).toLocaleString('id-ID')} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>/kg</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Persentase:</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="font-mono-calc" style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                color: isHundredPercent ? 'var(--emerald-neon)' : 'var(--rose-danger)'
              }}>
                {totalPercentage.toFixed(2)}%
              </span>
              {isHundredPercent ? (
                <span className="badge-pill badge-emerald">
                  <CheckCircle2 size={12} /> Valid 100%
                </span>
              ) : (
                <span className="badge-pill badge-rose">
                  <AlertTriangle size={12} /> {(100 - totalPercentage).toFixed(2)}% Delta
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grouped Formulation Tables by Phase */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {phases.map((phase) => {
          const phaseItems = items.filter(item => item.phase === phase);
          const phaseTotalPct = phaseItems.reduce((s, i) => s + (Number(i.percentage) || 0), 0);

          return (
            <div key={phase} className="glass-panel" style={{ padding: '16px 20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '10px',
                borderBottom: '1px solid var(--border-subtle)',
                marginBottom: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: phase.includes('Phase A') ? 'var(--cyan-neon)' : phase.includes('Phase B') ? 'var(--amber-warning)' : 'var(--emerald-neon)'
                  }} />
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                    {phase}
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    ({phaseItems.length} bahan)
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Subtotal: <strong className="font-mono-calc" style={{ color: '#002b5c' }}>{phaseTotalPct.toFixed(2)}%</strong>
                </div>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ color: 'var(--text-muted)', textAlign: 'left', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                      <th style={{ padding: '8px 10px' }}>Nama INCI</th>
                      <th style={{ padding: '8px 10px' }}>Fungsi / Peran</th>
                      <th style={{ padding: '8px 10px', width: '100px' }}>Dosis (%)</th>
                      <th style={{ padding: '8px 10px', width: '110px' }}>Berat ({batchMassKg}kg)</th>
                      <th style={{ padding: '8px 10px', width: '120px' }}>Harga / kg</th>
                      <th style={{ padding: '8px 10px', width: '120px' }}>Status Halal</th>
                      <th style={{ padding: '8px 10px', width: '120px' }}>Status BPOM</th>
                      <th style={{ padding: '8px 10px', width: '32px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {phaseItems.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 10px', fontWeight: 600 }}>
                          <div style={{ color: '#0f172a' }}>{item.inci_name}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.trade_name}</div>
                        </td>
                        <td style={{ padding: '10px 10px', color: 'var(--text-secondary)' }}>
                          {item.function}
                        </td>
                        <td style={{ padding: '10px 10px' }}>
                          <input 
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            value={item.percentage}
                            onChange={(e) => handlePercentageChange(item.id, parseFloat(e.target.value) || 0)}
                            style={{
                              width: '75px',
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              color: '#0f172a',
                              padding: '4px 8px',
                              fontSize: '0.82rem',
                              fontFamily: 'var(--font-mono)'
                            }}
                          />
                        </td>
                        <td style={{ padding: '8px 4px', fontFamily: 'var(--font-mono)', color: 'var(--cyan-neon)' }}>
                          {((item.percentage / 100) * batchMassKg * 1000).toFixed(1)} g
                        </td>
                        <td style={{ padding: '8px 4px', fontFamily: 'var(--font-mono)' }}>
                          IDR {item.cost_per_kg.toLocaleString('id-ID')}
                        </td>
                        <td style={{ padding: '8px 4px' }}>
                          {item.halal_status === 'HALAL_VERIFIED' ? (
                            <span className="badge-pill badge-emerald" style={{ fontSize: '0.65rem' }}>
                              <ShieldCheck size={10} /> Verified
                            </span>
                          ) : item.halal_status === 'HALAL_EXEMPT' ? (
                            <span className="badge-pill badge-neutral" style={{ fontSize: '0.65rem' }}>
                              Exempt
                            </span>
                          ) : item.halal_status === 'HIGH_RISK_HARAM' ? (
                            <span className="badge-pill badge-rose" style={{ fontSize: '0.65rem' }}>
                              <ShieldAlert size={10} /> Haram
                            </span>
                          ) : (
                            <span className="badge-pill badge-amber" style={{ fontSize: '0.65rem' }}>
                              Review Req
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '8px 4px' }}>
                          {!item.function.includes('BPOM VIOLATION') ? (
                            <span className="badge-pill badge-emerald" style={{ fontSize: '0.65rem' }}>
                              <ShieldCheck size={10} /> Lolos
                            </span>
                          ) : (
                            <span className="badge-pill badge-rose" style={{ fontSize: '0.65rem' }}>
                              <ShieldAlert size={10} /> Violation
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '8px 4px', textAlign: 'center' }}>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '3px' }}
                            title="Hapus baris"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
