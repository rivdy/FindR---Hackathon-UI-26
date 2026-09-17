import React, { useState } from 'react';
import { MOCK_CANDIDATES } from '../data/mockData';
import { TrendingUp, ShoppingCart, AlertTriangle, CheckCircle2, Package, Truck, Layers } from 'lucide-react';

interface SkuInventoryItem {
  id: string;
  name: string;
  percentage: number;
  on_hand_kg: number;
  moq_kg: number;
  order_multiple_kg: number;
  unit_price_idr: number;
  lead_time_days: number;
  supplier: string;
}

export const SupplyChainPage: React.FC = () => {
  const [batchScaleKg, setBatchScaleKg] = useState<number>(50.0); // 50kg semi-commercial pilot
  const candidate = MOCK_CANDIDATES[0]; // Candidate A

  // Sample inventory snapshot (now editable)
  const [inventory, setInventory] = useState<SkuInventoryItem[]>([
    { id: 'sku-1', name: 'Aqua (Demin Water)', percentage: 76.5, on_hand_kg: 500.0, moq_kg: 100, order_multiple_kg: 50, unit_price_idr: 2500, lead_time_days: 2, supplier: 'PT Dipa Pharmalab' },
    { id: 'sku-2', name: 'Glycerin 99.7% USP', percentage: 5.0, on_hand_kg: 15.0, moq_kg: 25, order_multiple_kg: 25, unit_price_idr: 32000, lead_time_days: 5, supplier: 'Wilmar Oleochemicals' },
    { id: 'sku-3', name: 'Carbopol Ultrez 21', percentage: 0.3, on_hand_kg: 2.0, moq_kg: 5, order_multiple_kg: 5, unit_price_idr: 210000, lead_time_days: 14, supplier: 'Lubrizol Advanced Materials' },
    { id: 'sku-4', name: 'Niacinamide PC', percentage: 4.0, on_hand_kg: 1.2, moq_kg: 10, order_multiple_kg: 5, unit_price_idr: 380000, lead_time_days: 10, supplier: 'DSM Nutritional Products' },
    { id: 'sku-5', name: 'Neossance Squalane', percentage: 6.0, on_hand_kg: 4.5, moq_kg: 10, order_multiple_kg: 5, unit_price_idr: 680000, lead_time_days: 18, supplier: 'Amyris / Clariant' },
    { id: 'sku-6', name: 'Kalcol 6098 (Cetyl alcohol)', percentage: 2.5, on_hand_kg: 20.0, moq_kg: 25, order_multiple_kg: 25, unit_price_idr: 48000, lead_time_days: 7, supplier: 'Kao Chemicals' },
    { id: 'sku-7', name: 'Tween 80 (Polysorbate 80)', percentage: 2.8, on_hand_kg: 8.0, moq_kg: 20, order_multiple_kg: 10, unit_price_idr: 92000, lead_time_days: 7, supplier: 'Croda International' },
    { id: 'sku-8', name: 'Span 60 (Sorbitan Stearate)', percentage: 1.9, on_hand_kg: 6.0, moq_kg: 20, order_multiple_kg: 10, unit_price_idr: 86000, lead_time_days: 7, supplier: 'Croda International' },
    { id: 'sku-9', name: 'Euxyl PE 9010 Preservative', percentage: 1.0, on_hand_kg: 0.2, moq_kg: 5, order_multiple_kg: 5, unit_price_idr: 145000, lead_time_days: 5, supplier: 'Schülke & Mayr' }
  ]);

  // Compute needs, shortage, and purchasing rule
  const evaluatedItems = inventory.map(item => {
    const neededKg = (item.percentage / 100) * batchScaleKg;
    const shortageKg = Math.max(0, neededKg - item.on_hand_kg);
    
    // Purchasing quantity: must be at least MOQ, and a multiple of order_multiple
    let orderQuantityKg = 0;
    if (shortageKg > 0) {
      const minRequired = Math.max(shortageKg, item.moq_kg);
      const multiplesCount = Math.ceil(minRequired / item.order_multiple_kg);
      orderQuantityKg = multiplesCount * item.order_multiple_kg;
    }

    const orderCostIdr = orderQuantityKg * item.unit_price_idr;

    return {
      ...item,
      neededKg: Number(neededKg.toFixed(2)),
      shortageKg: Number(shortageKg.toFixed(2)),
      orderQuantityKg,
      orderCostIdr
    };
  });

  const totalProcurementCost = evaluatedItems.reduce((s, i) => s + i.orderCostIdr, 0);
  const itemsWithShortageCount = evaluatedItems.filter(i => i.shortageKg > 0).length;
  const maxLeadTimeDays = Math.max(...evaluatedItems.filter(i => i.shortageKg > 0).map(i => i.lead_time_days), 0);

  const handleUpdateOnHand = (id: string, newVal: number) => {
    setInventory(prev => prev.map(item => item.id === id ? { ...item, on_hand_kg: newVal } : item));
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        borderLeft: '4px solid var(--emerald-neon)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color="var(--emerald-neon)" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              Supply Chain, Procurement MOQ & COGS Scaling
            </h2>
            <span className="badge-pill badge-emerald">Real-Time Inventory Gate</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Kalkulasi kebutuhan bahan baku riil vs stok gudang, penegakan batas MOQ supplier, dan estimasi waktu tunggu (lead time).
          </p>
          <div style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.8)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.72rem', color: '#0f172a', border: '1px solid #cbd5e1' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--emerald-neon)' }}></span>
            Terhubung sinkron secara real-time dengan Oracle ERP Perusahaan
          </div>
        </div>
      </div>

      {/* Batch Scaler Control & KPI Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        {/* Scaler Input */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Skala Batch Target:</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="number"
              step="5"
              min="1"
              max="5000"
              value={batchScaleKg}
              onChange={(e) => setBatchScaleKg(Math.max(1, parseFloat(e.target.value) || 1))}
              style={{
                width: '100px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                color: '#0f172a',
                padding: '6px 10px',
                fontSize: '1.2rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700
              }}
            />
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--emerald-neon)' }}>kg</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            Formula: {candidate.name}
          </div>
        </div>

        {/* Shortage items alert */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bahan Perlu PO (Shortage):</div>
          <div className="font-mono-calc" style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            color: itemsWithShortageCount > 0 ? 'var(--amber-warning)' : 'var(--emerald-neon)'
          }}>
            {itemsWithShortageCount} SKU
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            {itemsWithShortageCount > 0 ? 'Stok gudang tidak cukup' : 'Stok on-hand mencukupi'}
          </div>
        </div>

        {/* Procurement PO Cost */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimasi Belanja Baru (MOQ Compliant):</div>
          <div className="font-mono-calc" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--brand-blue)' }}>
            IDR {totalProcurementCost.toLocaleString('id-ID')}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            Mengikuti aturan order multiple & MOQ
          </div>
        </div>

        {/* Lead Time */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Critical Path Lead Time:</div>
          <div className="font-mono-calc" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#002b5c' }}>
            {maxLeadTimeDays} Hari
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            Waktu tunggu bahan baku terlama
          </div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="glass-panel" style={{ padding: '16px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ color: 'var(--text-muted)', textAlign: 'left', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={{ padding: '8px 6px' }}>Nama Bahan / SKU</th>
              <th style={{ padding: '8px 6px', width: '90px' }}>Kebutuhan ({batchScaleKg}kg)</th>
              <th style={{ padding: '8px 6px', width: '90px' }}>Stok On-Hand</th>
              <th style={{ padding: '8px 6px', width: '90px' }}>Shortage</th>
              <th style={{ padding: '8px 6px', width: '90px' }}>Order PO (MOQ)</th>
              <th style={{ padding: '8px 6px', width: '120px' }}>Biaya PO</th>
              <th style={{ padding: '8px 6px', width: '90px' }}>Lead Time</th>
              <th style={{ padding: '8px 6px' }}>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {evaluatedItems.map(item => {
              const hasShortage = item.shortageKg > 0;
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 6px', fontWeight: 600 }}>
                    <div style={{ color: '#0f172a' }}>{item.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Dosis: {item.percentage}%
                    </div>
                  </td>
                  <td style={{ padding: '10px 6px', fontFamily: 'var(--font-mono)' }}>
                    {item.neededKg} kg
                  </td>
                  <td style={{ padding: '10px 6px', fontFamily: 'var(--font-mono)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input 
                        type="number" 
                        step="1"
                        min="0"
                        value={item.on_hand_kg}
                        onChange={(e) => handleUpdateOnHand(item.id, parseFloat(e.target.value) || 0)}
                        style={{
                          width: '70px',
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          color: '#0f172a',
                          padding: '4px 6px',
                          fontSize: '0.82rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                      />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>kg</span>
                    </div>
                  </td>
                  <td style={{ padding: '10px 6px', fontFamily: 'var(--font-mono)' }}>
                    {hasShortage ? (
                      <span style={{ color: 'var(--rose-danger)', fontWeight: 700 }}>
                        {item.shortageKg} kg
                      </span>
                    ) : (
                      <span style={{ color: 'var(--emerald-neon)' }}>0 kg</span>
                    )}
                  </td>
                  <td style={{ padding: '10px 6px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: hasShortage ? 'var(--brand-blue)' : 'var(--text-muted)' }}>
                    {item.orderQuantityKg > 0 ? `${item.orderQuantityKg} kg` : '-'}
                  </td>
                  <td style={{ padding: '10px 6px', fontFamily: 'var(--font-mono)' }}>
                    {item.orderCostIdr > 0 ? `IDR ${item.orderCostIdr.toLocaleString('id-ID')}` : '-'}
                  </td>
                  <td style={{ padding: '10px 6px' }}>
                    {hasShortage ? `${item.lead_time_days} hari` : 'Ready'}
                  </td>
                  <td style={{ padding: '10px 6px', color: 'var(--text-secondary)' }}>
                    {item.supplier}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
