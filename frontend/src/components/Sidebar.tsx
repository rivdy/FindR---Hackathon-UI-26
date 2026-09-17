import React from 'react';
import { FlaskConical, Thermometer, Activity, Layers, ChevronLeft, ChevronRight, Award } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

// Module status encodes actual data state — not decoration
type ModuleStatus = 'clear' | 'review' | 'violation' | 'pending';

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  desc: string;
  icon: React.ElementType;
  status: ModuleStatus;
  statusLabel: string;
  metaValue?: string;
}

const statusConfig: Record<ModuleStatus, { color: string; bg: string; dot: string }> = {
  clear:     { color: '#22D3EE', bg: 'rgba(34,211,238,0.12)', dot: '#22D3EE' },
  review:    { color: '#E8A340', bg: 'rgba(232,163,64,0.12)',  dot: '#E8A340' },
  violation: { color: '#C55242', bg: 'rgba(197,82,66,0.12)',   dot: '#C55242' },
  pending:   { color: '#8BA3BE', bg: 'rgba(139,163,190,0.12)', dot: '#8BA3BE' },
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'formulasi',
      label: 'Formulasi',
      shortLabel: 'Form.',
      desc: '5 kandidat formula & kalkulasi HLB',
      icon: FlaskConical,
      status: 'clear',
      statusLabel: 'BPOM & Halal lolos',
      metaValue: '94.8%',
    },
    {
      id: 'stabilitas',
      label: 'Stabilitas',
      shortLabel: 'Stab.',
      desc: '8 uji fisik & eksekusi SOP batch',
      icon: Thermometer,
      status: 'review',
      statusLabel: 'Batch B perlu evaluasi',
      metaValue: '2 flag',
    },
    {
      id: 'cpp',
      label: 'Proses Kritis',
      shortLabel: 'CPP',
      desc: 'Median, simpangan ±3σ & RCA',
      icon: Activity,
      status: 'clear',
      statusLabel: 'Semua parameter dalam kendali',
      metaValue: 'σ ±2.1',
    },
    {
      id: 'cma',
      label: 'Material Kritis',
      shortLabel: 'CMA',
      desc: 'Spesifikasi bahan & CAPA knowledge hub',
      icon: Layers,
      status: 'pending',
      statusLabel: 'Belum ada data batch aktif',
      metaValue: '—',
    },
  ];

  return (
    <aside
      style={{
        width: collapsed ? '60px' : '248px',
        flexShrink: 0,
        background: '#0F1C2E',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 200,
        transition: 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* ── Logo area ── */}
      <div
        style={{
          padding: collapsed ? '18px 0' : '18px 18px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          minHeight: '68px',
          flexShrink: 0,
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            opacity: collapsed ? 0 : 1,
            transition: 'opacity 0.15s',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <img
            src="/rangkai-logo.png"
            alt="rangkAI"
            style={{ height: '36px', width: 'auto', objectFit: 'contain', flexShrink: 0 }}
          />
        </div>

        {/* Collapsed: show icon-only logo */}
        {collapsed && (
          <img
            src="/rangkai-logo.png"
            alt="rangkAI"
            style={{
              height: '32px',
              width: '32px',
              objectFit: 'contain',
              objectPosition: 'left center',
            }}
          />
        )}

        {/* Toggle button */}
        <button
          onClick={onToggleCollapse}
          title={collapsed ? 'Perluas panel navigasi' : 'Ciutkan panel navigasi'}
          style={{
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.07)',
            border: 'none',
            borderRadius: '7px',
            color: '#8BA3BE',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.12s, color 0.12s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
            (e.currentTarget as HTMLElement).style.color = '#E8F0F8';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
            (e.currentTarget as HTMLElement).style.color = '#8BA3BE';
          }}
        >
          {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>
      </div>

      {/* ── Nav items ── */}
      <nav
        style={{
          flex: 1,
          padding: '12px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          const sc = statusConfig[item.status];

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              title={collapsed ? `${item.label} — ${item.statusLabel}` : undefined}
              style={{
                display: 'flex',
                alignItems: collapsed ? 'center' : 'flex-start',
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '12px 0' : '10px 12px',
                borderRadius: '9px',
                border: 'none',
                background: isActive ? 'rgba(34,211,238,0.10)' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'background 0.12s',
                position: 'relative',
                gap: collapsed ? '0' : '12px',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {/* Active indicator line */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '25%',
                    bottom: '25%',
                    width: '2.5px',
                    borderRadius: '0 2px 2px 0',
                    background: '#22D3EE',
                  }}
                />
              )}

              {/* Icon with status dot */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Icon
                  size={20}
                  style={{
                    color: isActive ? '#22D3EE' : '#8BA3BE',
                    transition: 'color 0.12s',
                    display: 'block',
                  }}
                />
                {/* Status dot — encodes module health in collapsed mode */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-3px',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: sc.dot,
                    border: '1.5px solid #0F1C2E',
                  }}
                />
              </div>

              {/* Label + status (only in expanded mode) */}
              {!collapsed && (
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#E8F0F8' : '#8BA3BE',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: 1.3,
                      transition: 'color 0.12s, font-weight 0.12s',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      color: isActive ? '#6BAEC5' : '#3D5166',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginTop: '1px',
                      transition: 'color 0.12s',
                    }}
                  >
                    {item.desc}
                  </div>
                  {/* Status line — encodes real operational state */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      marginTop: '5px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        background: sc.bg,
                        color: sc.color,
                      }}
                    >
                      {item.statusLabel}
                    </span>
                    {item.metaValue && (
                      <span
                        style={{
                          fontFamily: 'var(--font-data)',
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          color: '#3D5166',
                        }}
                      >
                        {item.metaValue}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: collapsed ? '12px 0' : '14px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <Award size={16} style={{ color: '#3D5166', flexShrink: 0 }} />
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#3D5166',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              rangkAI — FindR UI 26
            </div>
            <div style={{ fontSize: '0.65rem', color: '#27394F' }}>
              Cosmetics R&D Track
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
