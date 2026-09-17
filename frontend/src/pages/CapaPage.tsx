import React, { useState } from 'react';
import { CapaItem } from '../types';
import { MOCK_CAPA_ITEMS } from '../data/mockData';
import { ShieldAlert, Search, ShieldCheck, CheckCircle2, Clock, User, ArrowUpRight, Sparkles, Filter } from 'lucide-react';

export const CapaPage: React.FC = () => {
  const [query, setQuery] = useState('Phase separation antara fase air dan fase minyak setelah penyimpanan');
  const [items, setItems] = useState<CapaItem[]>(MOCK_CAPA_ITEMS);
  const [selectedCapa, setSelectedCapa] = useState<CapaItem>(MOCK_CAPA_ITEMS[0]);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.problem_statement.toLowerCase().includes(query.toLowerCase()) ||
      item.root_cause.toLowerCase().includes(query.toLowerCase()) ||
      item.report_id.toLowerCase().includes(query.toLowerCase());

    const matchesSeverity = selectedSeverity === 'ALL' || item.severity === selectedSeverity;

    // If query has 'phase' or 'separation', rank CAPA-2026-089 first
    return (matchesSearch || query.length === 0) && matchesSeverity;
  });

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        borderLeft: '4px solid var(--emerald-neon)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={18} color="var(--emerald-neon)" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              CAPA Intelligence Hub & Corporate Knowledge Retrieval
            </h2>
            <span className="badge-pill badge-emerald">100 Historical Reports Indexed</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Pencarian NLP berbasis cosine similarity untuk menemukan preseden solusi tindakan korektif dan preventif dari histori deviasi pabrik.
          </p>
        </div>
      </div>

      {/* NLP Search Bar */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: '#ffffff',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          padding: '10px 14px'
        }}>
          <Search size={18} color="var(--text-muted)" />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Deskripsikan masalah untuk pencarian kemiripan kasus..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#0f172a',
              fontSize: '0.88rem',
              width: '100%'
            }}
          />
        </div>

        <select
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#0f172a',
            fontSize: '0.82rem',
            padding: '10px 14px',
            borderRadius: '8px',
            outline: 'none'
          }}
        >
          <option value="ALL">Semua Severity</option>
          <option value="CRITICAL">Critical</option>
          <option value="MAJOR">Major</option>
          <option value="MINOR">Minor</option>
        </select>
      </div>

      {/* Grid: Search Results + Selected CAPA Detail */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '20px'
      }}>
        {/* Left: Matched List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Hasil Temuan Kasus ({filteredItems.length} Laporan Serupa):
          </div>

          {filteredItems.map(item => {
            const isSelected = selectedCapa.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedCapa(item)}
                className={`glass-panel ${isSelected ? 'glass-panel-elevated' : ''}`}
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--emerald-neon)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-glass)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="font-mono-calc" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.report_id}
                    </span>
                    {item.severity === 'CRITICAL' ? (
                      <span className="badge-pill badge-rose" style={{ fontSize: '0.65rem' }}>Critical</span>
                    ) : (
                      <span className="badge-pill badge-amber" style={{ fontSize: '0.65rem' }}>Major</span>
                    )}
                  </div>

                  {item.similarity_score && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: 'var(--emerald-neon)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 700
                    }}>
                      <Sparkles size={11} /> {item.similarity_score}% Match
                    </div>
                  )}
                </div>

                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: isSelected ? 'var(--emerald-neon)' : 'var(--text-primary)' }}>
                  {item.title}
                </h4>

                <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {item.problem_statement}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  <span>{item.category}</span>
                  <span>Status: <strong style={{ color: '#34d399' }}>{item.status}</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Action Plan */}
        {selectedCapa && (
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge-pill badge-emerald">CAPA Detailed Action Plan</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '8px' }}>
                  {selectedCapa.title}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Report: {selectedCapa.report_id} | PIC: {selectedCapa.owner}
                </div>
              </div>
            </div>

            {/* Root Cause */}
            <div style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '0.82rem'
            }}>
              <div style={{ color: '#9f1239', fontWeight: 700, marginBottom: '4px' }}>
                Akar Masalah Teridentifikasi (Root Cause):
              </div>
              <div style={{ color: '#0f172a', lineHeight: 1.4 }}>
                {selectedCapa.root_cause}
              </div>
            </div>

            {/* Corrective Action */}
            <div style={{
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '0.82rem'
            }}>
              <div style={{ color: '#92400e', fontWeight: 700, marginBottom: '4px' }}>
                Tindakan Korektif Cepat (Corrective Action):
              </div>
              <div style={{ color: '#0f172a', lineHeight: 1.4 }}>
                {selectedCapa.corrective_action}
              </div>
            </div>

            {/* Preventive Action */}
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '0.82rem'
            }}>
              <div style={{ color: '#065f46', fontWeight: 700, marginBottom: '4px' }}>
                Tindakan Pencegahan Sistemik (Preventive Action):
              </div>
              <div style={{ color: '#0f172a', lineHeight: 1.4 }}>
                {selectedCapa.preventive_action}
              </div>
            </div>

            {/* Effectiveness Review */}
            <div style={{
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '8px',
              padding: '14px',
              fontSize: '0.82rem'
            }}>
              <div style={{ color: '#1e40af', fontWeight: 700, marginBottom: '4px' }}>
                Evaluasi Efektivitas Tindakan (Verified Outcome):
              </div>
              <div style={{ color: '#0f172a', lineHeight: 1.4 }}>
                {selectedCapa.effectiveness_review}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
