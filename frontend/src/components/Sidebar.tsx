import React from 'react';
import { 
  FlaskConical, 
  Thermometer, 
  Activity, 
  Layers, 
  Award
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  // STRICTLY 4 REQUESTED TABS
  const navItems = [
    {
      id: 'formulasi',
      label: 'Formulasi',
      subtitle: '5 Prediksi, HLB, Resep & COGS',
      icon: FlaskConical,
      badge: '5 Prediksi'
    },
    {
      id: 'stabilitas',
      label: 'Stabilitas',
      subtitle: '8 Uji Fisik & Eksekusi SOP',
      icon: Thermometer,
      badge: '<20% Drop',
      badgeColor: '#0284c7'
    },
    {
      id: 'cpp',
      label: 'CPP (Proses Kritis)',
      subtitle: 'Median, Simpangan ±3 & RCA',
      icon: Activity,
      badge: 'Median ±3'
    },
    {
      id: 'cma',
      label: 'CMA (Material Kritis)',
      subtitle: 'Spesifikasi Bahan & CAPA',
      icon: Layers,
      badge: 'Material QA'
    }
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header with Official rangkAI Logo */}
      <div style={{
        padding: '20px 20px 18px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img 
            src="/rangkai-logo.png" 
            alt="rangkAI Logo" 
            style={{ 
              height: '38px', 
              width: 'auto', 
              maxWidth: '170px',
              objectFit: 'contain' 
            }} 
          />
          <span style={{
            fontSize: '0.65rem',
            color: '#0284c7',
            background: '#eff6ff',
            padding: '2px 7px',
            borderRadius: '6px',
            border: '1px solid #bfdbfe',
            fontWeight: 700
          }}>
            v2.0
          </span>
        </div>
        <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 500 }}>
          Cosmetics AI Formulation Studio
        </p>
      </div>

      {/* Navigation List - 4 Core Tabs */}
      <nav style={{ padding: '18px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#94a3b8',
          padding: '4px 10px 4px'
        }}>
          Menu Utama R&D
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '10px',
                border: isActive 
                  ? '1px solid #bfdbfe' 
                  : '1px solid transparent',
                background: isActive 
                  ? 'linear-gradient(90deg, #eff6ff 0%, #f0fdf4 100%)' 
                  : 'transparent',
                color: isActive ? '#002b5c' : '#475569',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                boxShadow: isActive ? '0 2px 6px rgba(2, 132, 199, 0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.color = '#0f172a';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#475569';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  color: isActive ? '#0284c7' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: isActive ? 700 : 600 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.70rem', color: '#64748b' }}>
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  padding: '2px 7px',
                  borderRadius: '6px',
                  background: isActive ? '#dbeafe' : '#f1f5f9',
                  color: isActive ? '#1e40af' : '#64748b',
                  border: isActive ? '1px solid #bfdbfe' : '1px solid #e2e8f0'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info / Hackathon Track */}
      <div style={{
        padding: '16px',
        borderTop: '1px solid var(--border-subtle)',
        background: '#f8fafc'
      }}>
        <div style={{
          padding: '10px 12px',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <Award size={18} color="#059669" />
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#002b5c' }}>
              rangkAI — FindR UI 26
            </div>
            <div style={{ fontSize: '0.67rem', color: '#64748b' }}>
              Cosmetics R&D Track
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
